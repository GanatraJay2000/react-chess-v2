import { useAppContext } from "../../contexts/Context";
import Piece from "./Piece";
import { useRef } from "react";
import { coordinates, getCoords } from "../../util/helpers";
import {
  makeNewMove,
  invalidMove,
  kingPos,
  openPromotion,
} from "../../reducer/actions/move";
import { Status } from "../../util/constants";

function Pieces() {
  const ref = useRef(null);
  const { appState, dispatch } = useAppContext();

  const { game: board, chess } = appState;

  const move = (e) => {
    const { x, y } = coordinates(ref, e);
    const { square, color: _color } = appState.selectedPiece.piece;
    // const _move = (type == "p" ? "" : type.toUpperCase()) + square + ;
    const _move = { from: square, to: y + x };

    try {
      chess.move(_move);
      const _newBoard = chess.board();
      const _checkedSquare = _newBoard
        .flat()
        .filter((e) => e)
        .filter(
          ({ type, color }) =>
            type == "k" && color == (_color == "w" ? "b" : "w")
        )[0].square;
      dispatch(makeNewMove({ newBoard: _newBoard }));

      if (
        chess.isCheck() ||
        chess.isCheckmate() ||
        chess.isStalemate() ||
        chess.isDraw() ||
        chess.isInsufficientMaterial() ||
        chess.isThreefoldRepetition()
      ) {
        dispatch(kingPos({ kingPos: getCoords(_checkedSquare) }));
        appState.checkAudio.play();
      } else {
        appState.moveAudio.play();
      }
    } catch (e) {
      dispatch(invalidMove({ invalidMove: e.message }));
      if (chess.isCheck()) appState.illegalAudio.play();
      if (square == y + x) return;
      if (appState.status == Status.checkPromotion) {
        let _sq = y + x;
        dispatch(openPromotion({ promotionSquare: _sq }));
        return;
      }
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    move(e);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="pieces grid grid-cols-8 grid-rows-8 absolute inset-0 "
    >
      {board.map((r, rank) => {
        return r.map((f, file) =>
          f ? <Piece key={rank + "-" + file} piece={f} /> : null
        );
      })}
    </div>
  );
}

export default Pieces;
