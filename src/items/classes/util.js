export function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
/**
 * Returns a random integer number between min (inclusive) and max (exclusive)
 * from stackOverFlow
 */
export function getRandomIntArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getRandomFloatArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getMoveFromModel(state = [[]], modelJson = {}) {
  const stateStr = JSON.stringify(state);
  let maxQ = -Infinity;
  let move = null;
  if (modelJson[stateStr]) {
    const moves = modelJson[stateStr];
    for (const pos in moves) {
      if (Object.hasOwnProperty.call(moves, pos)) {
        const q = moves[pos];
        if (q > maxQ) {
          maxQ = q;
          move = JSON.parse(pos);
        }
        // avoid repeat
        if (q === maxQ && Array.isArray(move) && move.length) {
          move = getRandomIntArbitrary(0, 2) === 1 ? JSON.parse(pos) : move;
        }
      }
    }
  }
  return move;
}
