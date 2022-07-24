import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import Square from "./square/square";
import Row from "./row/Row";
import "./index.css";

function Board() {
  const rowCount = useRef(0);
  const xGap = useRef(1);
  const board = [];
  for (rowCount.current; rowCount.current < 15; rowCount.current++) {
    const singleRow = [
      { row: rowCount.current, col: 0, value: null },
      { row: rowCount.current, col: 1, value: null },
      { row: rowCount.current, col: 2, value: null },
      { row: rowCount.current, col: 3, value: null },
      { row: rowCount.current, col: 4, value: null },
      { row: rowCount.current, col: 5, value: null },
      { row: rowCount.current, col: 6, value: null },
      { row: rowCount.current, col: 7, value: null },
      { row: rowCount.current, col: 8, value: null },
      { row: rowCount.current, col: 9, value: null },
      { row: rowCount.current, col: 10, value: null },
      { row: rowCount.current, col: 11, value: null },
      { row: rowCount.current, col: 12, value: null },
      { row: rowCount.current, col: 13, value: null },
      { row: rowCount.current, col: 14, value: null },
    ];
    board.push(singleRow);
  }
  const [squares, setSquares] = useState(board);
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(".");
  const [history, setHistory] = useState([]);
  const regex = new RegExp(`${turn}{5}`);
  const status = `Next player: ${turn === "X" ? "X" : "O"}`;

  const handleClick = (e) => {
    if (winner !== ".") {
      return;
    }
    const split = e.target.id.split(",").map((x) => +x);
    const copy = [...squares];
    copy.splice(
      split[0],
      1,
      squares[split[0]].map((box) =>
        box.col === split[1] ? { ...box, value: turn } : { ...box }
      )
    );
    setSquares(copy);
    const copyHistory = history.concat({
      row: split[0],
      col: split[1],
      user: turn,
    });
    setHistory(copyHistory);

    const colSum = [];
    const rowCopy = copy[split[0]];
    rowCopy.map((col) => {
      colSum.push(col.value !== null ? col.value : ".");
    });
    if (regex.test(colSum.join(""))) {
      return setWinner(turn);
    }

    if (winner !== ".") {
      return;
    }

    const rowSum = [];
    const colCopy = [];
    copy.map((row) => {
      colCopy.push(row[split[1]]);
    });
    colCopy.map((row) => {
      rowSum.push(row.value !== null ? row.value : ".");
    });
    if (regex.test(rowSum.join(""))) {
      return setWinner(turn);
    }

    if (winner !== ".") {
      return;
    }

    // copy.map((row) => {
    //   let strings = "";
    //   row.map((box) => {
    //     strings += box.value !== null ? box.value : ".";
    //   });
    // });
    console.log(rowCopy);
    console.log(colCopy);
    console.log(copyHistory);
    const turnHistory = [...copyHistory]
      .filter((x) => x.user === turn)
      .sort((a, b) => {
        return a.row - b.row;
      });
    let digonal = [];
    console.log(turnHistory);
    turnHistory.map((x) => {
      const bottomRight = [];
      const bottomLeft = [];
      for (xGap.current; xGap.current < 5; xGap.current++) {
        const right = turnHistory.find(
          (Element) =>
            Element.row - x.row === xGap.current &&
            Element.col - x.col === xGap.current
        );
        if (right !== undefined) bottomRight.push(right);

        const left = turnHistory.find(
          (Element) =>
            Element.row - x.row === xGap.current &&
            x.col - Element.col === xGap.current
        );
        if (left !== undefined) bottomLeft.push(left);
      }
      //   console.log(bottomRight, bottomLeft);
      //   console.log("====================");
      xGap.current -= 4;
      if (bottomRight.length === 4) {
        return (digonal = [...bottomRight]);
      }
      if (bottomLeft.length === 4) {
        return (digonal = [...bottomLeft]);
      }
    });
    if (digonal.length === 4) {
      return setWinner(turn);
    }
    if (winner !== ".") {
      return;
    }
    setTurn(turn === "X" ? "O" : "X");
  };
  return (
    <>
      <div>
        {squares.map((a) => {
          return (
            <Row row={squares[squares.indexOf(a)]} onClick={handleClick} />
          );
        })}
      </div>

      <div className="status">
        <span> {status}</span>
        <span>{winner !== "." && `${turn} is Winner!`}</span>
      </div>
    </>
  );
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
