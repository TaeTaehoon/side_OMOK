import React from "react";
import "./square.css";

function Square(props) {
  return (
    <>
      {props.box.value === null && (
        <button
          id={`${props.row},${props.col}`}
          className="square"
          onClick={props.onClick}
        >
          {props.box.value}
        </button>
      )}
      {props.box.value !== null && (
        <button id={`${props.row},${props.col}`} className="square">
          {props.box.value}
        </button>
      )}
    </>
  );
}

export default Square;
