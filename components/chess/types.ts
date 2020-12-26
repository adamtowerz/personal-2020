export enum PieceType {
  Pawn = "p",
  Knight = "n",
  Bishop = "b",
  Rook = "r",
  Queen = "q",
  King = "k",
}

export enum Side {
  White = "w",
  Black = "b",
}

export type Coord = {
  row: number;
  column: number;
};

export type Piece = {
  loc: Coord;
  type: PieceType;
  side: Side;
};

export type BoardState = {
  pieces: Piece[];
};
