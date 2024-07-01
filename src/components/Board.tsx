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
              className={`p-2 bg-white border border-gray-600 ${
                cell === "X"
                  ? "text-red-600"
                  : cell === "O"
                  ? "text-blue-600"
                  : ""
              } w-12 h-12 hover:bg-slate-400 items-center justify-center`}
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
