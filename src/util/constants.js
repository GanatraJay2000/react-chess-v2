import { Chess } from "chess.js";

export const Status = {
  ongoing: "Ongoing",
  checkmate: "Checkmate",
  stalemate: "Game Draw due to Stalemate",
  insufficient: "Game Draw due to Insufficient Material",
  checkPromotion: "Checking Promotion",
  promoting: "Promoting",
  white: "White wins",
  black: "Black wins",
  draw: "Game Draw 50-move rule",
};

export const initialGameState = (fen) => {
  const chess = new Chess(fen);
  return {
    chess: chess,
    game: chess.board(),
    kingPos: null,
    invalidMove: null,
    candidateMoves: [],
    promotionSquare: null,
    status: Status.ongoing,
    selectedPiece: null,
  };
};
