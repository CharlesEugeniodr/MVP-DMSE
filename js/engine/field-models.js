/**
 * @fileoverview Alternative Scalar Field Models for Benchmark Comparison.
 *
 * Implements force functions for 3 established physics models:
 *   1. Klein-Gordon (General Relativity) — scalar field with mass term
 *   2. φ⁴ Theory (QFT) — scalar field with quartic self-interaction
 *   3. Worldsheet String (String Theory) — pure wave equation (Polyakov)
 *
 * Each model exposes a pdeStep-compatible function that can be used with
 * the existing Verlet integrator from orange-core.js.
 *
 * All models operate on the same grid (64×64), same initial conditions (±E0),
 * and same timestep to ensure fair comparison.
 *
 * @module engine/field-models
 */

import { laplacian2d, residualR } from './orange-core.js';

// ─── Model Parameters ─────────────────────────────────────────────────────────────

/** Klein-Gordon effective mass squared (adimensional) */
const KG_MASS_SQ = 0.01;

/** φ⁴ coupling constant */
const PHI4_LAMBDA = 0.1;

/** φ⁴ effective mass squared */
const PHI4_MASS_SQ = -0.5; // Negative for double-well potential

// ─── Model Descriptions ──────────────────────────────────────────────────────────

export const MODEL_INFO = Object.freeze({
  KLEIN_GORDON: {
    id: 'KLEIN_GORDON',
    name: 'Klein-Gordon',
    theory: 'Relatividade Geral',
    equation: '∂²φ/∂t² = c²∇²φ − m²φ',
    description: 'Equação de campo escalar relativística com termo de massa. Baseline da física clássica.',
    color: '#2196F3',
    icon: '⭖',
  },
  PHI4: {
    id: 'PHI4',
    name: 'φ⁴ Theory',
    theory: 'Teoria Quântica de Campos',
    equation: '∂²φ/∂t² = ∇²φ − m²φ − λφ³',
    description: 'Campo escalar com auto-interação quártica. Potencial de duplo-poço V(φ) = m²φ²/2 + λφ⁴/4.',
    color: '#FF9800',
    icon: '⚛',
  },
  STRING_WORLDSHEET: {
    id: 'STRING_WORLDSHEET',
    name: 'Worldsheet String',
    theory: 'Teoria das Cordas',
    equation: '∂²Xμ/∂τ² = c²∂²Xμ/∂σ²',
    description: 'Ação de Polyakov em gauge conforme. Equação de onda pura sem massa nem auto-interação.',
    color: '#9C27B0',
    icon: '〜',
  },
  ORANGE_DMSE: {
    id: 'ORANGE_DMSE',
    name: 'Orange-DMSE',
    theory: 'Malha Octagonal Vetorial',
    equation: 'F = ηE\' + (-α∇²E) + NL(κ, E₀·Θ(T), ω, r) + coupling',
    description: 'Motor PDE completo com atrator não-linear, acoplamento pareado, modulação térmica Θ(T), e κ adaptativo.',
    color: '#FF6B35',
    icon: '🍊',
  },
});

// ─── PDE Step Functions ───────────────────────────────────────────────────────────

/**
 * Klein-Gordon PDE step.
 *
 * Force = -α·∇²E - m²·E + η·E'
 *
 * Standard relativistic scalar field. No attractor, no coupling,
 * no thermal modulation. This is the simplest possible field theory.
 *
 * @param {Float32Array} E - Current field
 * @param {Float32Array} E_prev - Previous field
 * @param {Float32Array} E_lap - Pre-computed Laplacian
 * @param {Object} p - Simulation parameters
 * @returns {Float32Array} E_next
 */
export function pdeStepKleinGordon(E, E_prev, E_lap, p) {
  const N = E.length;
  const dt = p.dt;
  const dt2 = dt * dt;
  const rho = p.rho;
  const eta = p.eta;
  const alpha = p.alpha;
  const invRhoDt2 = dt2 / rho;
  const m2 = KG_MASS_SQ;

  const E_next = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const e = E[i];
    const e_prev = E_prev[i];
    const ePrime = (e - e_prev) / dt;

    // Klein-Gordon: diffusion + mass term + damping
    const diffusion = -alpha * E_lap[i];
    const massTerm = m2 * e;
    const force = eta * ePrime + diffusion + massTerm;

    E_next[i] = 2.0 * e - e_prev - invRhoDt2 * force;
  }

  return E_next;
}

/**
 * φ⁴ Theory PDE step.
 *
 * Force = -α·∇²E + m²·E + λ·E³ + η·E'
 *
 * Scalar field with double-well potential V(φ) = -m²φ²/2 + λφ⁴/4.
 * With m² < 0 and λ > 0, has minima at φ = ±√(-m²/λ).
 * This creates an attractor similar to (but weaker than) the Orange-DMSE
 * nonlinear attractor.
 *
 * @param {Float32Array} E - Current field
 * @param {Float32Array} E_prev - Previous field
 * @param {Float32Array} E_lap - Pre-computed Laplacian
 * @param {Object} p - Simulation parameters
 * @returns {Float32Array} E_next
 */
export function pdeStepPhi4(E, E_prev, E_lap, p) {
  const N = E.length;
  const dt = p.dt;
  const dt2 = dt * dt;
  const rho = p.rho;
  const eta = p.eta;
  const alpha = p.alpha;
  const invRhoDt2 = dt2 / rho;
  const m2 = PHI4_MASS_SQ;
  const lambda = PHI4_LAMBDA;

  const E_next = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const e = E[i];
    const e_prev = E_prev[i];
    const ePrime = (e - e_prev) / dt;

    // φ⁴: diffusion + mass + quartic self-interaction + damping
    const diffusion = -alpha * E_lap[i];
    const massTerm = m2 * e;           // m² < 0 creates instability at origin
    const quartic = lambda * e * e * e; // λφ³ restoring force
    const force = eta * ePrime + diffusion + massTerm + quartic;

    E_next[i] = 2.0 * e - e_prev - invRhoDt2 * force;
  }

  return E_next;
}

/**
 * String Worldsheet PDE step.
 *
 * Force = -α·∇²E + η·E'
 *
 * Pure wave equation from the Polyakov action in conformal gauge.
 * No mass, no self-interaction, no attractor. Only diffusion and damping.
 * This is the cleanest model — but also the one most prone to
 * dimensional chaos (no stabilization mechanism).
 *
 * @param {Float32Array} E - Current field
 * @param {Float32Array} E_prev - Previous field
 * @param {Float32Array} E_lap - Pre-computed Laplacian
 * @param {Object} p - Simulation parameters
 * @returns {Float32Array} E_next
 */
export function pdeStepString(E, E_prev, E_lap, p) {
  const N = E.length;
  const dt = p.dt;
  const dt2 = dt * dt;
  const rho = p.rho;
  const eta = p.eta;
  const alpha = p.alpha;
  const invRhoDt2 = dt2 / rho;

  const E_next = new Float32Array(N);

  for (let i = 0; i < N; i++) {
    const e = E[i];
    const e_prev = E_prev[i];
    const ePrime = (e - e_prev) / dt;

    // String worldsheet: pure diffusion + damping only
    const diffusion = -alpha * E_lap[i];
    const force = eta * ePrime + diffusion;

    E_next[i] = 2.0 * e - e_prev - invRhoDt2 * force;
  }

  return E_next;
}

/**
 * Compute Shannon entropy of a field distribution.
 * Higher entropy = more disorder = less structure.
 *
 * @param {Float32Array} field - Field values
 * @param {number} bins - Number of histogram bins
 * @returns {number} Shannon entropy in bits
 */
export function shannonEntropy(field, bins = 50) {
  const N = field.length;
  if (N === 0) return 0;

  // Find range
  let min = Infinity, max = -Infinity;
  for (let i = 0; i < N; i++) {
    if (field[i] < min) min = field[i];
    if (field[i] > max) max = field[i];
  }

  const range = max - min;
  if (range < 1e-15) return 0; // Uniform field

  // Build histogram
  const counts = new Float64Array(bins);
  const binWidth = range / bins;
  for (let i = 0; i < N; i++) {
    let bin = Math.floor((field[i] - min) / binWidth);
    if (bin >= bins) bin = bins - 1;
    counts[bin]++;
  }

  // Compute entropy
  let H = 0;
  for (let b = 0; b < bins; b++) {
    if (counts[b] > 0) {
      const p = counts[b] / N;
      H -= p * Math.log2(p);
    }
  }

  return H;
}
