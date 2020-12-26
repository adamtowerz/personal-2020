import React, { useMemo } from "react";
import { BoardState, Piece } from "./types";
import styles from "./Board.module.scss";

type Props = {
  rows: number;
  columns: number;
  state: BoardState;
};

const ChessBoard: React.FC<Props> = (props) => {
  validateProps(props);
  const { rows, columns, state } = props;
  const tiles = useMemo(() => generateTiles(rows, columns), [rows, columns]);
  const pieces = useMemo(() => generatePieces(state.pieces), [state.pieces]);
  return (
    <div
      className={styles.chessboard}
      style={{
        height: `${rows * 60}px`,
        width: `${columns * 60}px`,
      }}
    >
      {tiles}
      {pieces}
    </div>
  );
};

export default ChessBoard;

type TileElProps = {
  row: number;
  column: number;
};

const TileEl: React.FC<TileElProps> = ({ row, column }) => {
  const isWhite = row % 2 === column % 2;
  return (
    <div
      style={{
        height: 60,
        width: 60,
        background: isWhite ? "white" : "black",
        transform: `translate(${row * 100}%, ${column * 100}%)`,
      }}
      className={styles.tile}
    ></div>
  );
};

type PieceElProps = {
  piece: Piece;
};

function generateTiles(rows: number, columns: number): JSX.Element[] {
  const tiles: JSX.Element[] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      tiles.push(<TileEl row={i} column={j} />);
    }
  }
  return tiles;
}

const PieceEl: React.FC<PieceElProps> = ({ piece }) => {
  const { loc, side, type } = piece;
  return (
    <div
      style={{
        height: 60,
        width: 60,
        backgroundImage: `url(/chess-sprites.svg#${side}${type})`,
        transform: `translate(${loc.row * 100}%, ${loc.column * 100}%)`,
      }}
      className={styles.piece}
    ></div>
  );
};

function generatePieces(pieces: Piece[]): JSX.Element[] {
  return pieces.map((piece) => <PieceEl piece={piece} />);
}

function validateProps(props: Props) {
  const { rows, columns } = props;
  if (rows < 1 || columns < 1) {
    throw new Error(`Dimension cannt be 0 (h: ${rows}, w: ${columns})`);
  }
}
