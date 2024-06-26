import actionTypes from "./actionTypes";
import { Status, initialGameState } from "../util/constants";

export const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.NEW_MOVE: {
      let _status = "";
      const _next = state.chess.turn();
      if (state.chess.isStalemate()) {
        _status = Status.stalemate;
      } else if (state.chess.isCheckmate()) {
        _status = _next == "w" ? Status.black : Status.white;
      } else if (state.chess.isDraw()) {
        _status = Status.isDraw;
      } else if (state.chess.isInsufficientMaterial()) {
        _status = "insufficient material";
      } else if (state.chess.isThreefoldRepetition()) {
        _status = "threefold repetition";
      } else {
        _status = Status.ongoing;
      }

      let kingPos = _status !== Status.ongoing ? action.payload.kingPos : null;

      return {
        ...state,
        game: action.payload.newBoard,
        invalidMove: null,
        candidateMoves: [],
        kingPos: kingPos,
        status: _status,
        promotionSquare: null,
      };
    }

    case actionTypes.TAKE_BACK: {
      state.chess.undo();
      return { ...state, chess: state.chess, game: state.chess.board() };
    }

    case actionTypes.INVALID_MOVE: {
      return {
        ...state,
        invalidMove: action.payload.invalidMove,
        candidateMoves:
          state.status == Status.ongoing ? [] : state.candidateMoves,
      };
    }

    case actionTypes.SELECT_PIECE: {
      const candidateMoves = state.chess.moves({
        square: action.payload.selectedPiece.piece.square,
        verbose: true,
      });

      const isPromoting =
        candidateMoves.filter((move) => move.promotion).length > 0;

      const status = isPromoting ? Status.checkPromotion : Status.ongoing;

      return {
        ...state,
        selectedPiece: action.payload.selectedPiece,
        candidateMoves,
        status,
      };
    }

    case actionTypes.OPEN_PROMOTION: {
      return {
        ...state,
        status: Status.promoting,
        promotionSquare: action.payload.promotionSquare,
      };
    }

    case actionTypes.IS_CHECKED: {
      return { ...state, kingPos: action.payload.kingPos };
    }

    case actionTypes.CLOSE_POPUP: {
      return { ...state, status: Status.ongoing, promotionSquare: null };
    }

    case actionTypes.NEW_GAME: {
      return {
        ...initialGameState(
          action.payload.fen == "" ? undefined : action.payload.fen
        ),
      };
    }

    default:
      return state;
  }
};
