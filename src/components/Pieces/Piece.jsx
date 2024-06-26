import PropTypes from "prop-types";
import { useAppContext } from "../../contexts/Context";
import { cn } from "../../util/cn";
import { selectPiece } from "../../reducer/actions/move";
import { getCoords } from "../../util/helpers";

function Piece({ piece }) {
  const { dispatch } = useAppContext();
  const { rank, file } = getCoords(piece.square);

  const onDragStart = (e) => {
    e.dataTransfer.effectAllowed = "move";
    dispatch(selectPiece({ piece }));

    setTimeout(() => {
      e.target.style.display = "none";
    }, 0);
  };

  const onDragEnd = (e) => (e.target.style.display = "block");

  return (
    <div
      className={cn(
        `piece ${piece} w-[var(--tsz)] h-[var(--tsz)] bg-100% z-[2]`
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("/assets/pieces/${
          piece.color + piece.type
        }.png")`,
        gridColumnStart: file + 1,
        gridRowStart: rank + 1,
      }}
      draggable="true"
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    ></div>
  );
}

Piece.propTypes = {
  piece: PropTypes.object.isRequired,
};

export default Piece;
