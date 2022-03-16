import { init_grid, default_moves, players } from "./data";
import { getRandomIntArbitrary as getRandomArbitrary } from "./util";

const winningPrize = 50;
export default class Grid {
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
      ms.push(<br />);
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
        newState: game.grid,
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
    }
    return [x, y];
  }

  getRandomActionFromComputerSmart() {
    let possibleMoves = [];
    let move = null;
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.grid[i][j] > 1) {
          possibleMoves.push([i, j]);
        }
      }
    }
    if (possibleMoves.length) {
      let index = getRandomArbitrary(0, possibleMoves.length);
      move = possibleMoves[index];
    }
    return move;
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
