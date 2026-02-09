// Game constants

export const BOARD_SIZE = 5; // Board side length
export const MAX_MARBLES_PER_PLAYER = 14;
export const MARBLES_TO_WIN = 6; // First to push 6 opponent marbles off wins
export const MAX_MARBLES_PER_MOVE = 3;

// Direction vectors for hexagonal grid (cube coordinates)
export const DIRECTION_VECTORS = [
  { q: 1, r: 0, s: -1 },   // EAST
  { q: 1, r: -1, s: 0 },   // NORTHEAST
  { q: 0, r: -1, s: 1 },   // NORTHWEST
  { q: -1, r: 0, s: 1 },   // WEST
  { q: -1, r: 1, s: 0 },   // SOUTHWEST
  { q: 0, r: 1, s: -1 },   // SOUTHEAST
];

// Color palette for futuristic design
export const COLORS = {
  deepSpaceBlue: '#0a0e1a',
  cyberBlue: '#3b82f6',
  electricCyan: '#06b6d4',
  navyBlue: '#1e3a8a',
  slateGray: '#1f2937',
  pureWhite: '#ffffff',
  deepBlack: '#1a1a1a',
  neonPurple: '#8b5cf6',
};

// Initial board setup - standard Abalone configuration
export const INITIAL_POSITIONS = {
  black: [
    // Row I (top): 5 marbles
    { q: -4, r: 0, s: 4 },
    { q: -3, r: 0, s: 3 },
    { q: -2, r: 0, s: 2 },
    { q: -1, r: 0, s: 1 },
    { q: 0, r: 0, s: 0 },
    // Row H: 6 marbles
    { q: -4, r: 1, s: 3 },
    { q: -3, r: 1, s: 2 },
    { q: -2, r: 1, s: 1 },
    { q: -1, r: 1, s: 0 },
    { q: 0, r: 1, s: -1 },
    { q: 1, r: 1, s: -2 },
    // Row G: 3 marbles
    { q: -2, r: 2, s: 0 },
    { q: -1, r: 2, s: -1 },
    { q: 0, r: 2, s: -2 },
  ],
  white: [
    // Row C (bottom row +3): 3 marbles
    { q: 0, r: -2, s: 2 },
    { q: 1, r: -2, s: 1 },
    { q: 2, r: -2, s: 0 },
    // Row B: 6 marbles
    { q: -1, r: -1, s: 2 },
    { q: 0, r: -1, s: 1 },
    { q: 1, r: -1, s: 0 },
    { q: 2, r: -1, s: -1 },
    { q: 3, r: -1, s: -2 },
    { q: 4, r: -1, s: -3 },
    // Row A (bottom): 5 marbles
    { q: 0, r: 0, s: 0 },
    { q: 1, r: 0, s: -1 },
    { q: 2, r: 0, s: -2 },
    { q: 3, r: 0, s: -3 },
    { q: 4, r: 0, s: -4 },
  ],
};
