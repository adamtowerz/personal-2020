import React from "react";
import ChessBoard from "@/components/chess/ChessBoard";
import { BoardState, PieceType, Side } from "@/components/chess/types";

const chess = () => {
  const state: BoardState = {
    pieces: [
      {
        side: Side.White,
        type: PieceType.Queen,
        loc: {
          row: 0,
          column: 0,
        },
      },
    ],
  };
  return (
    <div>
      <ChessBoard rows={8} columns={8} state={state} />
    </div>
  );
};

export default chess;
