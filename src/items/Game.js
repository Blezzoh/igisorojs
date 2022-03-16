import React, { useEffect, useState } from "react";
import { default_moves, init_grid, players } from "./classes/data";
import Grid from "./classes/Grid";
import Hole from "./Hole";

export default function Game() {
  const [gridState, setGridState] = useState(
    new Grid(init_grid, default_moves)
  );
  const [canEat, setCanEast] = useState({
    [players.one]: 0,
    [players.computer]: 0,
  });
  const [moves, setMoves] = useState([]);
  const [position, setPositon] = useState(null);
  const [player, setPlayer] = useState("");
  const [message, setMessage] = useState({});
  const [isGame, setIsGame] = useState({ player: players.one, status: false });
  const setNextMove = (position, player) => {
    console.log(position, player);
    setMessage({});
    setPositon(position);
    setPlayer(player);
  };
  useEffect(() => {
    if (position === null || !Array.isArray(position)) {
      setMessage({ player, message: "Select a position to move from" });
      return;
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
    } else {
      let copy = new Grid();
      copy.setGrid(gridState.getGrid());
      const { state, nextPosition } = copy.moveForward(
        position,
        player,
        setMoves,
        canEat[player] > 1,
        setIsGame
      );
      console.log(state, nextPosition);
      setGridState(copy);
      setPositon(null);
      setMessage({});
      setPlayer("");
    }
  }, [position, player]);
  return (
    <div className="game">
      <div className="top">
        {/* <button onClick={() => handleClick(player)}>Move forward</button> */}
        <button disabled>Move Backward</button>
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
                      click={() => {
                        const value = canEat[players.computer] + 1;
                        setCanEast((canEat) => ({
                          ...canEat,
                          [players.computer]: value,
                        }));
                        setNextMove([i, j], player);
                      }}
                    />
                  ))}
                </div>
              );
            }
            return (
              <div className="row edge-top" key={`row-${i}`}>
                {data.map((d, j) => (
                  <Hole
                    key={j}
                    nItems={d}
                    player={player}
                    click={() => {
                      const value = canEat[players.computer] + 1;
                      setCanEast((canEat) => ({
                        ...canEat,
                        [players.computer]: value,
                      }));
                      setNextMove([i, j], player);
                    }}
                  />
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
                        setCanEast((canEat) => ({
                          ...canEat,
                          [players.one]: value,
                        }));
                        setNextMove([i, j], player);
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
                      setCanEast((canEat) => ({
                        ...canEat,
                        [players.one]: value,
                      }));
                      setNextMove([i, j], player);
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
        <button disabled>Move Backward</button>
      </div>
      <div className="top">
        <table>
          <tbody>
            <tr>
              <td colSpan="8 center">Previous moves</td>
            </tr>
          </tbody>
        </table>
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
