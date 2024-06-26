import actionTypes from "../actionTypes";

export const makeNewMove = ({ newBoard }) => ({
  type: actionTypes.NEW_MOVE,
  payload: { newBoard },
});

export const openPromotion = ({ promotionSquare }) => ({
  type: actionTypes.OPEN_PROMOTION,
  payload: { promotionSquare },
});

export const invalidMove = ({ invalidMove }) => ({
  type: actionTypes.INVALID_MOVE,
  payload: { invalidMove },
});

export const selectPiece = ({ piece }) => ({
  type: actionTypes.SELECT_PIECE,
  payload: { selectedPiece: { piece } },
});

export const kingPos = ({ kingPos }) => ({
  type: actionTypes.IS_CHECKED,
  payload: { kingPos },
});

export const takeBack = () => ({
  type: actionTypes.TAKE_BACK,
});

export const setNewGame = ({ fen }) => {
  return {
    payload: { fen },
    type: actionTypes.NEW_GAME,
  };
};
