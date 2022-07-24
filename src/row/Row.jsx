import React from "react";
import Square from "../square/square";
import "./Row.css";

function Row(props) {
  return (
    <div className="board-row">
      {props.row.map((square) => {
        return (
          <Square
            box={props.row[props.row.indexOf(square)]}
            row={square.row}
            col={square.col}
            key={`${square.row}, ${square.col}`}
            onClick={props.onClick}
          />
        );
      })}
    </div>
  );
}

export default Row;
