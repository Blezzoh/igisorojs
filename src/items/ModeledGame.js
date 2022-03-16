import React, { useEffect, useState } from "react";
import { default_moves, init_grid, players } from "./classes/data";
import Grid from "./classes/Grid";
import { getMoveFromModel } from "./classes/util";
import Hole from "./Hole";
import modelJson from "./model/model.json";

export default function Game() {
  const [gridState, setGridState] = useState(
    new Grid(init_grid, default_moves)
  );
  const [model] = useState(modelJson);
  const [canEat, setCanEat] = useState({
    [players.one]: 0,
    [players.computer]: 0,
  });
  const [moves, setMoves] = useState([]);
  //   const [position, setPositon] = useState(null);
  const [player, setPlayer] = useState("");
  const [message, setMessage] = useState({});
  const [isGame, setIsGame] = useState({ player: players.one, status: false });

  const setNextMove = (position, p) => {
    if (isGame.status) {
      return setMessage({
        message: "game has already been won! Reload to play again.",
        player: "",
      });
    }
    if (p !== player) {
      return setMessage({
        message: "Move not allowed this is the computer's turn",
        player: "",
      });
    }
    if (Array.isArray(position) && !gridState.can_moveForward(position)) {
      const [x, y] = position;
      setMessage({
        player,
        message:
          "Cannot advance from this position. You have 0 or 1 ball in spot (" +
          x +
          " " +
          y +
          ")",
      });
      return;
    }
    console.log(position, player);
    const { nMoves, isOver, newState } = Grid.moveForwardLearner(
      position,
      players.one,
      gridState.getGrid(),
      canEat
    );
    setMoves((m) => [
      ...m,
      JSON.stringify({ status: "player one Moved", position, nMoves }),
      <br />,
    ]);
    if (isOver) {
      setIsGame({ player: players.one, status: true });
      setGridState(JSON.parse(JSON.stringify(newState)));
      //   setPositon(nextPosition);
    } else {
      moveComputer(new Grid(JSON.parse(JSON.stringify(newState))), nMoves);
    }
  };
  /**
   * make a move for the computer ideally from model, if not random
   * @param {Grid} gridS - Grid
   */
  const moveComputer = (gridS, numberOfMoves) => {
    const grid = gridS.getGrid();
    let move = getMoveFromModel(grid, model);
    if (!move) {
      move = gridS.getRandomActionFromComputerSmart();
      if (!move) {
        return setIsGame({ player: players.one, status: true });
      }
    }
    const { nMoves, isOver, newState } = Grid.moveForwardLearner(
      move,
      players.computer,
      gridState.getGrid(),
      numberOfMoves
    );
    setGridState(new Grid(JSON.parse(JSON.stringify(newState))));
    setCanEat(nMoves);
    setPlayer(players.one);
    if (isOver) {
      setIsGame({ player: players.computer, status: true });
    }
    setMoves((m) => [
      ...m,
      JSON.stringify({ status: "computer Moved", nMoves, position: move }),
      <br />,
    ]);
  };
  useEffect(
    () => {
      moveComputer(gridState, canEat);
    },
    // eslint-disable-next-line
    [model]
  );
  return (
    <div className="game">
      <div className="top">
        {/* <button onClick={() => handleClick(player)}>Move forward</button> */}
      </div>
      <div className="top">
        {message.player && message.message ? (
          `player ${message.player}, ${message.message}`
        ) : (
          <div>
            <br />
            <br />
          </div>
        )}
        {isGame.player && isGame.status ? (
          `player ${isGame.player} won!`
        ) : (
          <div>
            <br />
            <br />
          </div>
        )}
      </div>
      <div className="grid">
        {gridState.getGrid().map((data, i) => {
          if (i < 2) {
            const player = players.computer;
            if (i === 1) {
              return (
                <div className="row middle-top" key={`row-${i}`}>
                  {data.map((d, j) => (
                    <Hole
                      key={j}
                      nItems={d}
                      player={player}
                      click={() => null}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div className="row edge-top" key={`row-${i}`}>
                {data.map((d, j) => (
                  <Hole key={j} nItems={d} player={player} click={() => null} />
                ))}
              </div>
            );
          } else {
            const player = players.one;
            if (i === 2) {
              return (
                <div className="row middle-bottom" key={`row-${i}`}>
                  {data.map((d, j) => (
                    <Hole
                      key={j}
                      nItems={d}
                      player={player}
                      click={() => {
                        const value = canEat[players.one] + 1;
                        setNextMove([i, j], player, value);
                      }}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div className="row edge-bottom" key={`row-${i}`}>
                {data.map((d, j) => (
                  <Hole
                    key={j}
                    nItems={d}
                    player={player}
                    click={() => {
                      const value = canEat[players.one] + 1;
                      setNextMove([i, j], player, value);
                    }}
                  />
                ))}
              </div>
            );
          }
        })}
      </div>
      <div className="bottom">
        {/* <button onClick={() => handleClick(player)}>Move forward</button> */}
      </div>
      <div className="top">
        <table>
          <tbody>
            <tr>
              <td colSpan="8 center">Previous moves</td>
            </tr>
            <tr>
              <td colSpan="8 center">
                Click on a hole you want to move from when it is your turn
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <div className="row">
          {/* {moves.map((grid, i) => {
            return (
              <div key={i} className="moves">
                <tbody>
                  {grid.map((row, j) => {
                    return (
                      <tr key={j} className="border">
                        {row.map((d, k) => {
                          return <td key={k}>{d}</td>;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </div>
            );
          })} */}
          {moves}
        </div>
      </div>
    </div>
  );
}
