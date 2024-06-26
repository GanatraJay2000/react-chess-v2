import { useAppContext } from "../../contexts/Context";
import { getCoords } from "../../util/helpers";
import { makeNewMove, kingPos } from "../../reducer/actions/move";

import PropTypes from "prop-types";

function PromotionBox({ onClosePopup }) {
  const options = ["q", "b", "n", "r"];
  const { appState, dispatch } = useAppContext();
  const { promotionSquare } = appState;
  if (!promotionSquare) return null;
  const { rank, file } = getCoords(promotionSquare);
  const color = rank === 0 ? "w" : "b";

  const onClick = (option) => {
    onClosePopup();
    let chess = appState.chess;
    const _move = appState.candidateMoves.filter(
      (move) => move.to === promotionSquare && move.promotion === option
    )[0].san;
    appState.chess.move(_move);
    const newBoard = appState.chess.board();
    dispatch(makeNewMove({ newBoard }));
    const _newBoard = chess.board();
    const _checkedSquare = _newBoard
      .flat()
      .filter((e) => e)
      .filter(
        ({ type, color }) => type == "k" && color == chess.turn()
      )[0].square;

    if (
      chess.isCheck() ||
      chess.isCheckmate() ||
      chess.isStalemate() ||
      chess.isDraw() ||
      chess.isInsufficientMaterial() ||
      chess.isThreefoldRepetition()
    ) {
      dispatch(kingPos({ kingPos: getCoords(_checkedSquare) }));
    }
  };

  return (
    <div
      className={`w-16 h-[40.5%] bg-[var(--tile-light)] absolute border-2 border-[var(--tile-light)] [box-shadow:0_0_0_4px_var(--tile-dark)] rounded-sm translate-x-2 flex ${
        color === "w" ? " top-2 " : " bottom-2 "
      }`}
      style={{
        left: `${12.5 * file}%`,
        flexDirection: color === "w" ? "column" : "column-reverse",
      }}
    >
      {options.map((option) => {
        return (
          <div
            key={option}
            className="piece w-full h-1/4 bg-100% hover:bg-[var(--tile-dark)] cursor-pointer rounded"
            style={{
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              backgroundImage: `url("/assets/pieces/${color}${option}.png")`,
            }}
            onClick={() => onClick(option)}
          >
            {/* {option} */}
          </div>
        );
      })}
    </div>
  );
}

PromotionBox.propTypes = {
  onClosePopup: PropTypes.func,
};

export default PromotionBox;
