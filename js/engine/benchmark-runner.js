/**
 * @fileoverview Benchmark Runner — Comparative field dynamics analysis.
 *
 * Runs 4 scalar field models on the same grid (64×64, 30 channels)
 * with identical initial conditions and compares:
 *   - Convergence (r_rms to ±E0)
 *   - Energy conservation (Hamiltonian drift)
 *   - Dimensional stability (how many channels converge)
 *   - Coherence (Invisible Code ω·ε₋ = −1)
 *   - Shannon entropy
 *
 * @module engine/benchmark-runner
 */

import { DMSEngine, DEFAULT_PARAMS, residualR, laplacian2d, computeMetrics, computeHamiltonianEnergy } from './orange-core.js';
import { pdeStepKleinGordon, pdeStepPhi4, pdeStepString, shannonEntropy, MODEL_INFO } from './field-models.js';
import { CoherenceAnalyzer } from './coherence.js';

/**
 * Internal state for a non-Orange model simulation.
 * Mimics DMSEState but without the adaptive κ or coupling.
 */
class SimpleFieldState {
  constructor(params) {
    const [Ny, Nx] = params.grid;
    const C = params.n_channels;
    const N = Ny * Nx;

    this.Ny = Ny;
    this.Nx = Nx;
    this.C = C;
    this.N = N;

    this.E = Array.from({ length: C }, () => new Float32Array(N));
    this.E_prev = Array.from({ length: C }, () => new Float32Array(N));
    this.E_lap = Array.from({ length: C }, () => new Float32Array(N));
    this.kappa = new Float64Array(C).fill(params.kappa_init || 1.0);
    this.time = 0;
    this.step = 0;
  }
}

/**
 * Seeded PRNG (splitmix32) for reproducible initialization.
 */
function makeRng(seed) {
  let s = seed | 0;
  return function () {
    s = (s + 0x9e3779b9) | 0;
    let t = s ^ (s >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t = t ^ (t >>> 15);
    t = Math.imul(t, 0x735a2d97);
    t = t ^ (t >>> 15);
    return (t >>> 0) / 4294967296;
  };
}

/**
 * Initialize a field state with ±E0 + noise (identical to Orange-DMSE reset).
 */
function initializeField(state, params, seed = 42) {
  const rng = makeRng(seed);
  for (let d = 0; d < params.n_channels; d++) {
    const direction = (d % 2 === 0) ? 1.0 : -1.0;
    for (let i = 0; i < state.N; i++) {
      const noise = (rng() - 0.5) * 0.1 * params.E0;
      const value = direction * params.E0 + noise;
      state.E[d][i] = value;
      state.E_prev[d][i] = value;
    }
  }
}

/**
 * Compute r_rms per channel and global for a simple field state.
 */
function computeSimpleMetrics(state, params) {
  const C = state.C;
  const N = state.N;
  const E0 = params.E0;
  const dt = params.dt;

  const r_rms = new Float64Array(C);
  const E_kin = new Float64Array(C);
  let sumR2Global = 0;
  let countGlobal = 0;

  for (let d = 0; d < C; d++) {
    let sumR2 = 0;
    let sumV2 = 0;
    for (let i = 0; i < N; i++) {
      const r = residualR(state.E[d][i], E0);
      sumR2 += r * r;
      const v = (state.E[d][i] - state.E_prev[d][i]) / dt;
      sumV2 += v * v;
    }
    r_rms[d] = Math.sqrt(sumR2 / N);
    E_kin[d] = 0.5 * sumV2 / N;
    sumR2Global += sumR2;
    countGlobal += N;
  }

  return { r_rms, r_rms_global: Math.sqrt(sumR2Global / countGlobal), E_kin };
}

/**
 * Compute Hamiltonian energy for a simple field state.
 */
function computeSimpleHamiltonian(state, params) {
  const { rho, alpha, dt } = params;
  let H = 0;
  for (let d = 0; d < state.C; d++) {
    for (let i = 0; i < state.N; i++) {
      const v = (state.E[d][i] - state.E_prev[d][i]) / dt;
      H += 0.5 * rho * v * v;
      H += 0.5 * alpha * state.E_lap[d][i] * state.E_lap[d][i];
    }
  }
  return H / (state.C * state.N);
}

/**
 * Run a single non-Orange model for N steps.
 */
function runSimpleModel(pdeStepFn, params, steps, seed = 42) {
  const state = new SimpleFieldState(params);
  initializeField(state, params, seed);

  const r_rms_history = [];
  const H_history = [];
  let convergenceStep = -1;
  const convergenceThreshold = params.r_rms_target * 2;

  for (let s = 0; s < steps; s++) {
    // Compute Laplacians
    for (let d = 0; d < state.C; d++) {
      laplacian2d(state.E[d], state.E_lap[d], state.Ny, state.Nx, params.dx, params.boundary);
    }

    // PDE step for each channel
    const E_next = new Array(state.C);
    for (let d = 0; d < state.C; d++) {
      E_next[d] = pdeStepFn(state.E[d], state.E_prev[d], state.E_lap[d], params);
    }

    // Rotate buffers
    for (let d = 0; d < state.C; d++) {
      state.E_prev[d].set(state.E[d]);
      state.E[d].set(E_next[d]);
    }

    state.time += params.dt;
    state.step++;

    // Metrics every 10 steps
    if (s % 10 === 0 || s === steps - 1) {
      const metrics = computeSimpleMetrics(state, params);
      r_rms_history.push({ step: s, r_rms_global: metrics.r_rms_global });
      H_history.push(computeSimpleHamiltonian(state, params));

      // Track first convergence
      if (convergenceStep < 0 && metrics.r_rms_global < convergenceThreshold) {
        convergenceStep = s;
      }
    }
  }

  // Final analysis
  const finalMetrics = computeSimpleMetrics(state, params);
  const stableDims = countStableDimensions(finalMetrics.r_rms, params.r_rms_target * 2);

  // Coherence analysis
  const coherence = CoherenceAnalyzer.analyze(state, params);

  // Shannon entropy of final field (channel 0 as representative)
  const entropy = shannonEntropy(state.E[0]);

  // Hamiltonian drift
  const H0 = H_history[0] || 0;
  const Hf = H_history[H_history.length - 1] || 0;
  const H_drift = H0 !== 0 ? Math.abs((Hf - H0) / H0) : Math.abs(Hf - H0);

  return {
    r_rms_history,
    H_history,
    final_r_rms: finalMetrics.r_rms_global,
    final_r_rms_per_channel: finalMetrics.r_rms,
    H_drift,
    stable_dims: stableDims,
    total_dims: state.C,
    coherence,
    entropy,
    convergence_step: convergenceStep,
    state, // Keep for further analysis
  };
}

/**
 * Count how many dimensions have r_rms below threshold.
 */
function countStableDimensions(r_rms, threshold) {
  let count = 0;
  for (let d = 0; d < r_rms.length; d++) {
    if (r_rms[d] <= threshold) count++;
  }
  return count;
}

/**
 * Run the Orange-DMSE model using the full engine.
 */
function runOrangeModel(params, steps, seed = 42) {
  const engine = new DMSEngine(params);
  engine.reset(seed);

  const r_rms_history = [];
  let convergenceStep = -1;
  const convergenceThreshold = params.r_rms_target * 2;

  for (let s = 0; s < steps; s++) {
    const metrics = engine.step();

    if (s % 10 === 0 || s === steps - 1) {
      r_rms_history.push({ step: s, r_rms_global: metrics.r_rms_global });

      if (convergenceStep < 0 && metrics.r_rms_global < convergenceThreshold) {
        convergenceStep = s;
      }
    }
  }

  // Final analysis
  const finalMetrics = computeMetrics(engine.state, params);
  const stableDims = countStableDimensions(finalMetrics.r_rms, params.r_rms_target * 2);
  const coherence = CoherenceAnalyzer.analyze(engine.state, params);
  const entropy = shannonEntropy(engine.state.E[0]);

  const H0 = engine.H_history[0] || 0;
  const Hf = engine.H_history[engine.H_history.length - 1] || 0;
  const H_drift = H0 !== 0 ? Math.abs((Hf - H0) / H0) : Math.abs(Hf - H0);

  return {
    r_rms_history,
    H_history: engine.H_history.filter((_, i) => i % 10 === 0),
    final_r_rms: finalMetrics.r_rms_global,
    final_r_rms_per_channel: finalMetrics.r_rms,
    H_drift,
    stable_dims: stableDims,
    total_dims: engine.state.C,
    coherence,
    entropy,
    convergence_step: convergenceStep,
    state: engine.state,
  };
}

// ─── BenchmarkRunner ─────────────────────────────────────────────────────────────

/**
 * Main benchmark orchestrator.
 *
 * Usage:
 * ```js
 * const runner = new BenchmarkRunner();
 * const report = await runner.runAll(1000, (progress, model) => { ... });
 * ```
 */
export class BenchmarkRunner {
  /**
   * @param {Object} [paramOverrides] - Override default params for all models
   */
  constructor(paramOverrides = {}) {
    this.params = { ...DEFAULT_PARAMS, ...paramOverrides };
    this.report = null;
  }

  /**
   * Run all 4 models and produce a comparative report.
   *
   * @param {number} [steps=1000] - Simulation steps per model
   * @param {function} [onProgress] - (progress: 0-1, modelName: string) => void
   * @returns {BenchmarkReport}
   */
  async runAll(steps = 1000, onProgress = null) {
    const results = {};
    const models = [
      { id: 'KLEIN_GORDON', fn: pdeStepKleinGordon, name: 'Klein-Gordon' },
      { id: 'PHI4', fn: pdeStepPhi4, name: 'φ⁴ Theory' },
      { id: 'STRING_WORLDSHEET', fn: pdeStepString, name: 'Worldsheet String' },
    ];

    let progress = 0;
    const totalModels = 4;

    // Run the 3 simple models
    for (const model of models) {
      if (onProgress) onProgress(progress / totalModels, model.name);

      results[model.id] = {
        ...MODEL_INFO[model.id],
        ...runSimpleModel(model.fn, this.params, steps),
      };

      progress++;
      // Yield to UI
      await new Promise(r => setTimeout(r, 0));
    }

    // Run Orange-DMSE
    if (onProgress) onProgress(progress / totalModels, 'Orange-DMSE');

    results.ORANGE_DMSE = {
      ...MODEL_INFO.ORANGE_DMSE,
      ...runOrangeModel(this.params, steps),
    };

    progress++;
    if (onProgress) onProgress(1.0, 'Complete');

    // Build comparative report
    this.report = this._buildReport(results, steps);
    return this.report;
  }

  /**
   * Build the comparative analysis report.
   */
  _buildReport(results, steps) {
    const models = Object.values(results);

    // Rank by r_rms (lower is better)
    const ranked = [...models].sort((a, b) => a.final_r_rms - b.final_r_rms);
    ranked.forEach((m, i) => { m.rank_convergence = i + 1; });

    // Rank by stable dimensions (higher is better)
    const rankedDims = [...models].sort((a, b) => b.stable_dims - a.stable_dims);
    rankedDims.forEach((m, i) => { m.rank_stability = i + 1; });

    // Rank by H_drift (lower is better)
    const rankedH = [...models].sort((a, b) => a.H_drift - b.H_drift);
    rankedH.forEach((m, i) => { m.rank_energy = i + 1; });

    // Rank by coherence (higher is better)
    const rankedC = [...models].sort(
      (a, b) => (b.coherence?.globalCoherence || 0) - (a.coherence?.globalCoherence || 0)
    );
    rankedC.forEach((m, i) => { m.rank_coherence = i + 1; });

    // Overall winner
    models.forEach(m => {
      m.overall_score = (m.rank_convergence || 4) + (m.rank_stability || 4) +
                        (m.rank_energy || 4) + (m.rank_coherence || 4);
    });
    const winner = [...models].sort((a, b) => a.overall_score - b.overall_score)[0];

    return {
      timestamp: new Date().toISOString(),
      params: { ...this.params },
      steps,
      models: results,
      rankings: {
        convergence: ranked.map(m => m.id),
        stability: rankedDims.map(m => m.id),
        energy: rankedH.map(m => m.id),
        coherence: rankedC.map(m => m.id),
      },
      winner: winner.id,
      winnerName: winner.name,
      summary: {
        totalModels: 4,
        totalSteps: steps,
        gridSize: this.params.grid,
        channels: this.params.n_channels,
      },
    };
  }
}
