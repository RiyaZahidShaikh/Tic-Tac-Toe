import React from "react";

type BoardProps = {
    board: Array<Array<string | null>>,
    handleClick: (row: number, col: number) => void,
}

export default function Board({ board, handleClick }: BoardProps) {
  return (
    <div>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center">
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className={`p-2 bg-color-50 border-2 border-color-1100 ${
                cell === "X"
                  ? "text-red"
                  : cell === "O"
                  ? "text-blue"
                  : ""
              } w-12 h-12 hover:bg-color-800 items-center justify-center`}
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
