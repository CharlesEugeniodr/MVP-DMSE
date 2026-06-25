/**
 * @fileoverview Coherence Analyzer — Implements the 'Invisible Code' theorem.
 *
 * The Invisible Code is the unifying theorem of the Octagonal Vector Mesh Theory:
 *   C(x,y,z,t) = Σ (M'ijk · Θ(T)) · εn  ⟹  ω·ε₋ = −1
 *
 * This module analyzes the simulation state to compute:
 * - Global coherence C_global (0 = chaos, 1 = full stability)
 * - Per-band coherence (Fundamental D1-10, Intermediate D11-20, Elevated D21-30)
 * - Invisible Code satisfaction status
 *
 * @module engine/coherence
 */

import { residualR } from './orange-core.js';

/**
 * Dimensional band definitions.
 */
const BANDS = {
  FUNDAMENTAL:  { start: 0,  end: 9,  name: 'Fundamental (D1-D10)' },
  INTERMEDIATE: { start: 10, end: 19, name: 'Intermediária (D11-D20)' },
  ELEVATED:     { start: 20, end: 29, name: 'Elevada (D21-D30)' },
};

/**
 * Compute coherence for a set of channels.
 *
 * Coherence = 1 - mean(|r|) for each channel, where r is the residual.
 * A coherence of 1.0 means all fields are exactly at ±E0.
 * A coherence of 0.0 means all fields are at maximum deviation.
 *
 * @param {Object} state - DMSEState
 * @param {Object} params - DMSEParams
 * @param {number} startChannel - First channel index (inclusive)
 * @param {number} endChannel - Last channel index (inclusive)
 * @returns {{ coherence: number, meanResidual: number, channels: number }}
 */
function computeBandCoherence(state, params, startChannel, endChannel) {
  const E0 = params.E0;
  let totalAbsR = 0;
  let count = 0;
  const actualEnd = Math.min(endChannel, state.C - 1);

  for (let d = startChannel; d <= actualEnd; d++) {
    for (let i = 0; i < state.N; i++) {
      const e = state.E[d][i];
      const r = residualR(e, E0);
      totalAbsR += Math.abs(r);
      count++;
    }
  }

  const meanR = count > 0 ? totalAbsR / count : 1.0;
  // Clamp coherence to [0, 1]
  const coherence = Math.max(0, Math.min(1, 1 - meanR));

  return {
    coherence,
    meanResidual: meanR,
    channels: actualEnd - startChannel + 1,
  };
}

/**
 * Check if the Invisible Code condition is satisfied.
 *
 * The condition ω·ε₋ = −1 is mapped to our simulation as:
 *   For each channel, |E| ≈ E0 (residual ≈ 0)
 *
 * In practice, we check if the global coherence exceeds a threshold.
 *
 * @param {number} globalCoherence
 * @returns {'SATISFIED' | 'APPROACHING' | 'VIOLATED'}
 */
function checkInvisibleCode(globalCoherence) {
  if (globalCoherence >= 0.95) return 'SATISFIED';
  if (globalCoherence >= 0.80) return 'APPROACHING';
  return 'VIOLATED';
}

/**
 * Full coherence analysis of the simulation state.
 */
export class CoherenceAnalyzer {
  /**
   * Analyze the current simulation state.
   *
   * @param {Object} state - DMSEState from the engine
   * @param {Object} params - DMSEParams from the engine
   * @returns {CoherenceReport}
   */
  static analyze(state, params) {
    if (!state || !state.E) {
      return CoherenceAnalyzer.emptyReport();
    }

    // Compute per-band coherence
    const bands = {};
    for (const [key, band] of Object.entries(BANDS)) {
      bands[key] = {
        ...band,
        ...computeBandCoherence(state, params, band.start, band.end),
      };
    }

    // Global coherence = weighted average
    // Fundamental bands get more weight (they're the base)
    const wF = 0.5, wI = 0.3, wE = 0.2;
    const globalCoherence = (
      (bands.FUNDAMENTAL?.coherence || 0) * wF +
      (bands.INTERMEDIATE?.coherence || 0) * wI +
      (bands.ELEVATED?.coherence || 0) * wE
    );

    // Invisible Code status
    const invisibleCode = checkInvisibleCode(globalCoherence);

    // Compute omega·epsilon product analog
    // In our model: omega = mean |E|, epsilon = -E0/mean|E|
    // Product = mean|E| * (-E0/mean|E|) = -E0
    // Normalized: product = -E0/E0 = -1 when at equilibrium
    let omegaSum = 0;
    let epsilonSum = 0;
    for (let d = 0; d < state.C; d++) {
      let chanOmega = 0;
      for (let i = 0; i < state.N; i++) {
        chanOmega += Math.abs(state.E[d][i]);
      }
      chanOmega /= state.N;
      omegaSum += chanOmega;
      // epsilon is the resistance: -(E0 / omega)
      if (chanOmega > 1e-10) {
        epsilonSum += -(params.E0 / chanOmega);
      }
    }
    const meanOmega = omegaSum / state.C;
    const meanEpsilon = epsilonSum / state.C;
    const omegaEpsilonProduct = meanOmega * meanEpsilon;

    return {
      timestamp: Date.now(),
      globalCoherence,
      bands,
      invisibleCode,
      postulate: {
        omega: meanOmega,
        epsilon: meanEpsilon,
        product: omegaEpsilonProduct,
        target: -1.0,
        deviation: Math.abs(omegaEpsilonProduct - (-1.0)),
      },
    };
  }

  /**
   * @returns {CoherenceReport} Empty report for uninitialized state.
   */
  static emptyReport() {
    return {
      timestamp: Date.now(),
      globalCoherence: 0,
      bands: {},
      invisibleCode: 'VIOLATED',
      postulate: {
        omega: 0,
        epsilon: 0,
        product: 0,
        target: -1.0,
        deviation: 1.0,
      },
    };
  }
}
