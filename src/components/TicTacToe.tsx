"use client";

import { useState } from "react";
import Board from "./Board";
import { Button } from "@/components/ui/button";
import { PiCoinsLight } from "react-icons/pi";
import { getCleverMoves } from "./util";

type BoardArray = Array<Array<string | null>>;

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
  const initialBoard: BoardArray = Array.from({ length: 3 }, () =>
    Array(3).fill(null)
  );
  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);
  const [isNoWinner, setIsNoWinner] = useState<boolean>(false);
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [matchCount, setMatchCount] = useState<number>(0);

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner || matchCount >= 3) {
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
      setMatchCount((prevCount) => prevCount + 1);
      return; // End the player's turn if they win
    }

    // Check if there are no empty cells after player's move
    const hasNullValue = updatedPlayerBoard.some((row) =>
      row.some((cell) => cell === null)
    );

    if (!hasNullValue) {
      setIsNoWinner(true);
      setMatchCount((prevCount) => prevCount + 1);
      return;
    }

    // Computer's move
    const nextPlayer = player === "X" ? "O" : "X";
    const bestMove = getCleverMoves(updatedPlayerBoard, nextPlayer, checkWinner);

    setTimeout(() => {
      const aiBoard = updatedPlayerBoard.map((r, rowIndex) =>
        r.map((c, colIndex) =>
          rowIndex === bestMove?.[0] && colIndex === bestMove[1]
            ? nextPlayer
            : c
        )
      );
      setBoard(aiBoard);
      const newComputerWinner = checkWinner(aiBoard);
      setWinner(newComputerWinner);

      if (!newComputerWinner) {
        // Check for draw after computer's move
        const noNullValue = aiBoard.some((row) =>
          row.some((cell) => cell === null)
        );
        if (!noNullValue) {
          setIsNoWinner(true);
          setMatchCount((prevCount) => prevCount + 1);
        }
      }
    }, 200);
  };

  const restartGame = () => {
    if (matchCount >= 3) {
      setPlayerScore(0);
      setMatchCount(0);
    }
    setBoard(Array.from({ length: 3 }, () => Array(3).fill(null)));
    setPlayer("X");
    setWinner(null);
    setIsNoWinner(false);
  };

  return (
    <div className="bg-white border-2 border-black rounded-2xl py-7 px-28 flex flex-col justify-center items-center gap-2">
      <h1 className="font-bold text-3xl bg-color-150 rounded-xl flex justify-center p-2 absolute top-0 translate-y-16 rotate-6">
        Tic Tac Toe
      </h1>
      <div className="text-xl flex justify-center items-center space-x-1 border border-color-1100 rounded-2xl px-2 mt-2">
        <p>Total</p> <PiCoinsLight />
        <p> ed coins earned: {playerScore}</p>
      </div>
      <Board board={board} handleClick={handleOnClick} />
      <p>Winner:{winner && <p>{winner === "X" ? "You" : "AI"}</p>}
      {isNoWinner && <p>No one wins</p>}</p>
      <Button variant="destructive" onClick={restartGame}>
        {matchCount >= 3 ? "Reset Game" : "Reset"}
      </Button>
      <p>Matches Played: {matchCount}/3</p>
    </div>
  );
}
