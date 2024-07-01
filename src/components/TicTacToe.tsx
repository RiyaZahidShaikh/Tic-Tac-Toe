"use client";

import { useState } from "react";
import Board from "./Board";
import { Button } from "@/components/ui/button"

type BoardArray = Array<Array<string | null>>;

const makeComputerMove = (board: BoardArray): [number, number] => {
  const emptyCells: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCells.push([rowIndex, cellIndex]);
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  return emptyCells[randomIndex];
};

const checkWinner = (board: BoardArray): string | null => {
  const lines = [
    // Rows
    [board[0][0], board[0][1], board[0][2]],
    [board[1][0], board[1][1], board[1][2]],
    [board[2][0], board[2][1], board[2][2]],
    // Columns
    [board[0][0], board[1][0], board[2][0]],
    [board[0][1], board[1][1], board[2][1]],
    [board[0][2], board[1][2], board[2][2]],
    // Diagonals
    [board[0][0], board[1][1], board[2][2]],
    [board[0][2], board[1][1], board[2][0]],
  ];
  for (const line of lines) {
    if (line[0] && line[0] === line[1] && line[1] === line[2]) {
      return line[0];
    }
  }
  return null;
};

export default function TicTacToe() {
  const initialBoard: BoardArray = Array.from(
    { length: 3 },
    () => Array(3).fill(null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }

    // Player's move
    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === row && cellIndex === col ? player : cell
      )
    );
    setBoard(updatedPlayerBoard);
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);

    if (newWinner === "X") {
        setPlayerScore((prevScore) => prevScore + 30);
        return; // End the player's turn if they win
      }

    // if (newWinner) return;

    // Check if there are no empty cells after player's move
    const hasNullValue = updatedPlayerBoard.some((row) =>
      row.some((cell) => cell === null)
    );

    if (!hasNullValue) {
      setIsNoWinner(true);
      return;
    }

    // Computer's move
    const [computerRow, computerCol] = makeComputerMove(updatedPlayerBoard);
    const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) =>
        rowIndex === computerRow && cellIndex === computerCol ? "O" : cell
      )
    );

    setTimeout(() => {
      setBoard(updatedComputerBoard);
      const newComputerWinner = checkWinner(updatedComputerBoard);
      setWinner(newComputerWinner);

      if (!newComputerWinner) {
        // Check for draw after computer's move
        const noNullValue = updatedComputerBoard.some((row) =>
          row.some((cell) => cell === null)
        );
        if (!noNullValue) {
          setIsNoWinner(true);
        }
      }
    }, 200);
  };

  const restartGame = () => {
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
  };

  return (
    <div className="border-2 border-black rounded-2xl py-7 px-28 flex flex-col justify-center items-center gap-2">
      <h1 className="font-bold text-3xl bg-[#FF6347] rounded-xl flex justify-center p-2 absolute top-0 translate-y-16 rotate-6">Tic Tac Toe</h1>
      <h2 className="text-xl border border-black rounded-2xl px-2">Total ed coins earned: {playerScore}</h2>
      <Board board={board} handleClick={handleOnClick} />
      {winner && <p>{winner === "X" ? "You Win" : "AI Wins"}</p>}
      {isNoWinner && <p>No one wins</p>}
      <Button variant="destructive" onClick={restartGame}>
        Reset
      </Button>
    </div>
  );
}
