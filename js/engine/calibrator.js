/**
 * @fileoverview Calibrator — Grid-search parameter optimizer for Orange-DMSE.
 *
 * Sweeps over (eta, alpha, coupling_strength, dt) to find the parameter
 * combination that yields the lowest r_rms_global after a short simulation.
 * Uses a reduced grid (32×32) for speed.
 *
 * @module engine/calibrator
 */

import { DMSEngine } from './orange-core.js';

// ── Parameter search space ─────────────────────────────────────────────────────

const SEARCH_SPACE = {
  eta:               [0.01, 0.05, 0.1, 0.2, 0.5],
  alpha:             [0.1, 0.3, 0.5, 1.0, 2.0],
  coupling_strength: [0.01, 0.05, 0.1, 0.2],
  dt:                [0.005, 0.01, 0.02, 0.05],
};

/**
 * Run a short simulation and return the final r_rms_global.
 * Uses a reduced 32×32 grid for speed.
 *
 * @param {Object} paramOverrides - Parameters to test
 * @param {number} steps - Number of steps to run
 * @param {number} seed - PRNG seed
 * @returns {{ r_rms_global: number, kappa_mean: number, converged: boolean }}
 */
function probe(paramOverrides, steps = 500, seed = 42) {
  const params = {
    ...paramOverrides,
    grid: [32, 32],       // Reduced grid for speed
    n_channels: 10,       // Reduced channels for speed
  };

  try {
    const engine = new DMSEngine(params);
    engine.reset(seed);

    let lastMetrics = null;
    let hasNaN = false;

    for (let i = 0; i < steps; i++) {
      lastMetrics = engine.step();

      // Early abort if NaN detected (numerical instability)
      if (isNaN(lastMetrics.r_rms_global) || !isFinite(lastMetrics.r_rms_global)) {
        hasNaN = true;
        break;
      }
    }

    if (hasNaN || !lastMetrics) {
      return { r_rms_global: Infinity, kappa_mean: Infinity, converged: false };
    }

    // Compute mean kappa
    let kappaSum = 0;
    for (let d = 0; d < engine.state.C; d++) {
      kappaSum += engine.state.kappa[d];
    }
    const kappaMean = kappaSum / engine.state.C;
    const converged = lastMetrics.r_rms_global < params.r_rms_target * 2;

    return {
      r_rms_global: lastMetrics.r_rms_global,
      kappa_mean: kappaMean,
      converged,
    };
  } catch (e) {
    return { r_rms_global: Infinity, kappa_mean: Infinity, converged: false };
  }
}

/**
 * Calibrator class for systematic parameter optimization.
 */
export class Calibrator {
  /**
   * @param {Object} [baseParams] - Base parameters to use (non-swept params)
   * @param {Object} [searchSpace] - Override default search space
   */
  constructor(baseParams = {}, searchSpace = null) {
    this.baseParams = baseParams;
    this.searchSpace = searchSpace || SEARCH_SPACE;
    this.results = [];
    this.bestResult = null;
  }

  /**
   * Run full grid search calibration.
   *
   * @param {number} [stepsPerProbe=500] - Steps per parameter combination
   * @param {function} [onProgress] - (progress: 0-1, current: Object) => void
   * @returns {{ best: Object, results: Object[], totalProbes: number }}
   */
  calibrate(stepsPerProbe = 500, onProgress = null) {
    const { eta: etas, alpha: alphas, coupling_strength: couplings, dt: dts } = this.searchSpace;
    const totalCombinations = etas.length * alphas.length * couplings.length * dts.length;
    let probeCount = 0;
    let bestRrms = Infinity;
    let bestParams = null;
    let bestResult = null;

    this.results = [];

    for (const eta of etas) {
      for (const alpha of alphas) {
        for (const cs of couplings) {
          for (const dt of dts) {
            const testParams = {
              ...this.baseParams,
              eta,
              alpha,
              coupling_strength: cs,
              dt,
            };

            const result = probe(testParams, stepsPerProbe);
            probeCount++;

            const entry = {
              params: { eta, alpha, coupling_strength: cs, dt },
              r_rms_global: result.r_rms_global,
              kappa_mean: result.kappa_mean,
              converged: result.converged,
              rank: 0, // will be set after sorting
            };

            this.results.push(entry);

            if (result.r_rms_global < bestRrms) {
              bestRrms = result.r_rms_global;
              bestParams = { ...testParams };
              bestResult = entry;
            }

            if (onProgress) {
              onProgress(probeCount / totalCombinations, entry);
            }
          }
        }
      }
    }

    // Rank results
    this.results.sort((a, b) => a.r_rms_global - b.r_rms_global);
    this.results.forEach((r, i) => { r.rank = i + 1; });

    this.bestResult = {
      params: bestParams,
      r_rms_global: bestRrms,
      kappa_mean: bestResult?.kappa_mean || Infinity,
      converged: bestResult?.converged || false,
    };

    return {
      best: this.bestResult,
      results: this.results,
      totalProbes: probeCount,
    };
  }

  /**
   * Get the top N results.
   * @param {number} n
   * @returns {Object[]}
   */
  topN(n = 10) {
    return this.results.slice(0, n);
  }
}

/**
 * Quick calibration function — runs a reduced grid search and returns
 * the best parameter set found.
 *
 * @param {Object} [baseParams] - Base parameters
 * @param {number} [stepsPerProbe=300] - Steps per probe (lower = faster)
 * @param {function} [onProgress] - Progress callback
 * @returns {{ bestParams: Object, r_rms: number, converged: boolean, topResults: Object[] }}
 */
export function quickCalibrate(baseParams = {}, stepsPerProbe = 300, onProgress = null) {
  // Use a reduced search space for quick calibration
  const quickSpace = {
    eta:               [0.05, 0.1, 0.3],
    alpha:             [0.3, 0.5, 1.0],
    coupling_strength: [0.05, 0.1, 0.2],
    dt:                [0.01, 0.02],
  };

  const cal = new Calibrator(baseParams, quickSpace);
  const { best, results, totalProbes } = cal.calibrate(stepsPerProbe, onProgress);

  return {
    bestParams: best.params,
    r_rms: best.r_rms_global,
    converged: best.converged,
    topResults: cal.topN(5),
    totalProbes,
  };
}
