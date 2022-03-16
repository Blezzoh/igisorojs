// import Grid from "./Grid";
// import {getRandomFloatArbitrary}from './util';

// import {players} from './data'

const init_grid = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4],
  [0, 0, 0, 0, 0, 0, 0, 0],
];
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
const default_moves = {
  //   E: "east",
  //   W: "west",
  //   S: "south",
  //   N: "north",
  F: "forward",
  B: "backward",
};
const winningPrize = 50;

const players = {
  one: "one",
  computer: "computer",
};

function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomFloatArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

class Grid {
  constructor(
    grid = init_grid,
    nMovesComputer = 0,
    nMovesOne = 0,
    moves = default_moves
  ) {
    this.grid = grid;
    this.moves = moves;
    this.players = players;
    this.movesOne = nMovesOne;
    this.movesComputer = nMovesComputer;
  }
  setGrid(grid = [[]]) {
    this.grid = grid;
  }
  getGrid() {
    return this.grid;
  }
  incrementNumberOfMoves(player) {
    if (player === this.players.one) {
      this.movesOne++;
    } else {
      this.movesComputer++;
    }
  }
  getMoves() {
    return this.moves;
  }
  setMoves(moves = []) {
    this.moves = moves;
  }
  can_moveBackWard(position = [], player) {
    const [x, y] = position;
    const count = this.grid[x][y];
    if (player === this.players.one) {
      if ((y === 6 && x === 2) || (y === 7 && x === 3)) {
        if (y === 6 && x === 2) {
          return (
            count >= 10 &&
            this.grid[1][count - 10] > 0 &&
            this.grid[0][count - 10] > 0
          );
        }
        if (y === 7 && x === 3) {
          return (
            count >= 8 &&
            this.grid[1][count - 8] > 0 &&
            this.grid[0][count - 8] > 0
          );
        }
      }
    } else {
      if ((y === 0 && x === 0) || (y === 1 && x === 1)) {
        if (y === 0 && x === 0) {
          return (
            count >= 10 &&
            this.grid[2][count - 8] > 0 &&
            this.count[3][count - 8] > 0
          );
        }
        if (y === 1 && x === 1) {
          return (
            count >= 8 &&
            this.grid[2][count - 10] > 0 &&
            this.count[3][count - 10] > 0
          );
        }
      }
    }
    return false;
  }
  can_moveForward(position) {
    const [x, y] = position;
    return this.grid[x][y] > 1;
  }
  /**
   *
   * @param {Array<number>} position
   * @param {String} player
   */
  canGetOppositionBalls(position, player) {
    const [x, y] = position;
    if (player === this.players.one) {
      return this.grid[0][y] > 0 && this.grid[1][y] > 0 && this.grid[x][y] > 1;
    } else {
      return this.grid[2][y] > 0 && this.grid[3][y] > 0 && this.grid[x][y] > 1;
    }
  }
  /**
   *
   * @param {Array<number>} position
   * @param {String} player
   */
  getOppositionBalls(position, player) {
    console.log(position, player, "getOppositionBalls");
    const [x, y] = position;
    if (players.one === player) {
      const nBalls = this.grid[0][y] + this.grid[1][y];
      this.grid[0][y] = 0;
      this.grid[1][y] = 0;
      this.grid[x][y] += nBalls;
      return nBalls;
    } else {
      const nBalls = this.grid[2][y] + this.grid[3][y];
      this.grid[2][y] = 0;
      this.grid[3][y] = 0;
      this.grid[x][y] += nBalls;
      return nBalls;
    }
  }
  /**
   *
   * @param {Array<number>} position
   * @param {String} player
   */
  getNextForwardPosition(position, player) {
    const [x, y] = position;
    if (player === this.players.one) {
      if (y === 0 && x === 2) {
        return [x + 1, y];
      } else if (y === 7 && x === 3) {
        return [x - 1, y];
      } else if (x === 3) {
        return [x, y + 1];
      }
      return [x, y - 1];
    } else {
      if (y === 0 && x === 0) {
        return [x + 1, y];
      } else if (y === 7 && x === 1) {
        return [x - 1, y];
      } else if (x === 0) {
        return [x, y - 1];
      }
      return [x, y + 1];
    }
  }

  /**
   * @param {Array<number>} position
   * @param {String} player
   */
  moveForward(
    position,
    player = "",
    setMoves = () => null,
    canEat = true,
    setGameOver = () => null
  ) {
    console.log(position, player, "moveForward");
    let current = position;
    const [x1, y1] = current;
    let carry = this.grid[x1][y1];
    let ms = [];
    if (this.can_moveForward(position)) {
      this.grid[x1][y1] = 0;
    } else {
      return { nextPosition: position, state: this.grid };
    }
    while (carry > 0) {
      const nextPosition = this.getNextForwardPosition(current, player);
      const [x, y] = nextPosition;
      this.grid[x][y] = this.grid[x][y] + 1;
      if (this.canGetOppositionBalls(nextPosition, player) && canEat) {
        this.getOppositionBalls(nextPosition, player);
        ms.push("ate at this");
      }
      ms.push(JSON.stringify(this.grid));
      ms.push(JSON.stringify(nextPosition));
      ms.push("<br />");
      carry--;
      current = nextPosition;
      if (carry === 0 && this.grid[x][y] > 1) {
        carry = this.grid[x][y];
        this.grid[x][y] = 0;
      }
    }
    if (this.isGameOver(player)) {
      setGameOver({ player, status: true });
    }
    setMoves(ms);
    return { nextPosition: current, state: this.grid };
  }
  isGameOver(player) {
    let max = -Infinity;
    if (player === players.one) {
      for (let i = 0; i < this.grid.length - 2; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          max = Math.max(max, this.grid[i][j]);
        }
      }
    } else {
      for (let i = 2; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          max = Math.max(max, this.grid[i][j]);
        }
      }
    }
    console.log(max, player);
    return max < 2;
  }

  move(position, player, move) {
    if (move === this.moves.B) {
      return -1;
    }
    return this.moveForward(position, player);
  }
  /**
   * method to be used by learner to get the next state, reward, and additional metadata about the game
   * @param {Array<number>} position
   * @param {String} player
   */
  static moveForwardLearner(position, player = "", grid = [[]], nMoves = {}) {
    const game = new Grid(grid, nMoves.computer, nMoves.one);

    let current = position;
    const [x1, y1] = current;
    let carry = game.grid[x1][y1];
    let reward = 0;
    let isOver = false;
    let canEat =
      player === players.one ? game.movesOne > 1 : game.movesComputer > 1;
    if (game.can_moveForward(position)) {
      game.grid[x1][y1] = 0;
    } else {
      return {
        nextPosition: position,
        state: game.grid,
        isOver: false,
        reward,
      };
    }
    // moves
    while (carry > 0) {
      const nextPosition = game.getNextForwardPosition(current, player);
      const [x, y] = nextPosition;
      game.grid[x][y] = game.grid[x][y] + 1;
      if (game.canGetOppositionBalls(nextPosition, player) && canEat) {
        reward += game.getOppositionBalls(nextPosition, player);
      }
      carry--;
      current = nextPosition;
      if (carry === 0 && game.grid[x][y] > 1) {
        carry = game.grid[x][y];
        game.grid[x][y] = 0;
      }
    }
    if (game.isGameOver(player)) {
      reward += winningPrize;
      isOver = true;
    }
    // increment the number of moves
    const moves = {
      one: player === players.one ? nMoves.one + 1 : nMoves.one,
      computer:
        player === players.computer ? nMoves.computer + 1 : nMoves.computer,
    };
    // return new
    return {
      nextPosition: current,
      newState: game.grid,
      reward,
      isOver,
      nMoves: moves,
    };
  }
  getNextState({ nextPosition, state, reward }) {
    return { position: nextPosition, grid: state, reward };
  }

  getRandomActionFromComputer() {
    let x = getRandomArbitrary(0, 2),
      y = getRandomArbitrary(0, 8);
    while (!this.can_moveForward([x, y])) {
      x = getRandomArbitrary(0, 2);
      y = getRandomArbitrary(0, 8);
      console.log("trying", x, y, JSON.stringify(this.getGrid()));
    }
    return [x, y];
  }
  getRandomActionFromOne() {
    let x = getRandomArbitrary(2, 4),
      y = getRandomArbitrary(0, 8);
    while (!this.can_moveForward([x, y])) {
      x = getRandomArbitrary(2, 4);
      y = getRandomArbitrary(0, 8);
    }
    return [x, y];
  }
}
class Learner {
  constructor(
    numberOfEpisodes = 10,
    numberOfSteps = 30,
    lr = 0.1,
    discount = 0.99,
    exploration_decay_rate = 0.01,
    exploration_rate = 1
  ) {
    this.reward = 0;
    this.previousState = null;
    this.currrentState = new Grid();
    // <grid in string mode>: <position to get the most reward>
    this.qState = {};
    this.numberOfEpisodes = numberOfEpisodes;
    this.learningRate = lr;
    this.numberOfSteps = numberOfSteps;
    this.explorationDecayRate = exploration_decay_rate;
    this.explorationRate = exploration_rate;
    this.maxExplorationRate = 1;
    this.minExplorationRate = 0.01;
    this.discountRate = discount;
  }
  learn() {
    let explorationRate = this.explorationRate;
    let episode = 0;
    let reward_cumm = 0;
    while (episode < this.numberOfEpisodes) {
      reward_cumm += this.learnOneEpisode(
        explorationRate,
        reward_cumm,
        episode
      );
      explorationRate =
        this.minExplorationRate +
        (this.maxExplorationRate - this.minExplorationRate) *
          Math.exp(-this.explorationDecayRate * episode);
      this.currrentState = new Grid();
      console.log("end ep ", episode + 1, "reward", reward_cumm);
      episode++;
      sleep(100);
    }
  }
  learnOneEpisode(explorationRate, cummulative_r, episode) {
    const exploration_rate_threshold = getRandomFloatArbitrary(0, 1);
    // javascript can act up so string -> array
    let learningGrid = new Grid(JSON.parse(JSON.stringify(init_grid)));
    let state = learningGrid.getGrid();
    let stateKey = JSON.stringify(state);
    let reward_cumm = cummulative_r;
    let moves = {
      [players.computer]: 0,
      [players.one]: 0,
    };
    console.log("started ep", episode, explorationRate, cummulative_r);
    if (cummulative_r < 0) {
      console.log("started ep env", stateKey);
    }
    for (let i = 0; i < this.numberOfSteps; i++) {
      let action = null;
      /*
      exploration vs exploitation, we exploit is the exploration rate is less than exploration_rate_threshold
      */
      if (
        explorationRate < exploration_rate_threshold &&
        this.qState[stateKey]
      ) {
        let localQ = -Infinity;
        for (let a in this.qState[stateKey]) {
          const f = parseFloat(this.qState[stateKey][a]);
          if (f >= localQ) {
            action = JSON.parse(a);
          }
        }
      } else {
        console.log("br 1.0 getting random action");
        action = learningGrid.getRandomActionFromComputer();
      }
      console.log("br 1.2", action);
      let { newState, reward, isOver, nMoves } = Grid.moveForwardLearner(
        action,
        players.computer,
        state,
        moves
      );
      console.log("br 1.3", nMoves, reward);
      let arr_q = this.getAllPreviousQueues(JSON.stringify(newState));
      let previousQ =
        this.qState[stateKey] && this.qState[stateKey][action]
          ? this.qState[stateKey][action]
          : 0;
      let lr = this.learningRate;
      let r = reward;
      reward_cumm += reward;
      let discount_r = this.discountRate;
      if (this.qState[stateKey]) {
        this.qState[stateKey][JSON.stringify(action)] = this.calculateQ(
          previousQ,
          r,
          lr,
          discount_r,
          arr_q
        );
      } else {
        this.qState[stateKey] = {};
        this.qState[stateKey][JSON.stringify(action)] = this.calculateQ(
          previousQ,
          r,
          lr,
          discount_r,
          arr_q
        );
      }

      /** player one makes a random move*/
      let temp_grid = new Grid(newState);
      if (isOver) {
        break;
      }
      let action_one = temp_grid.getRandomActionFromOne();
      console.log("br 2");
      let one_results = Grid.moveForwardLearner(
        action_one,
        players.one,
        state,
        nMoves
      );
      newState = one_results.newState;
      reward = one_results.reward;
      isOver = one_results.isOver;
      nMoves = one_results.nMoves;
      console.log("br 2.1", nMoves, reward);

      reward_cumm -= reward;
      /** end of player one makes a random move */
      state = newState;
      stateKey = JSON.stringify(newState);
      moves = nMoves;
      if (isOver) {
        break;
      }
    }
    return reward_cumm;
  }
  getAllPreviousQueues(state) {
    let qs = [];
    if (this.qState[state]) {
      for (let action in this.qState[state]) {
        qs.push(qState[state][action]);
      }
    }
    return qs;
  }
  calculateQ(previousQ, r, lr, discount_r, arr_q) {
    return previousQ * (1 - lr) + lr * (r + discount_r * Math.max(arr_q));
  }
}

const fs = require("fs");
const learner = new Learner(100);
learner.learn();
console.log(learner.qState);
fs.writeFile(
  "src/items/model/model.json",
  JSON.stringify(learner.qState),
  (err) => {
    if (err) {
      console.error(err, process.cwd());
      return;
    }
    //file written successfully
  }
);
