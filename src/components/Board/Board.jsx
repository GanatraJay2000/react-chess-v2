import { cn } from "../../util/cn";
import Files from "./Bits/Files";
import Ranks from "./Bits/Ranks";
import Pieces from "../Pieces/Pieces";
import Popup from "../Popup/Popup";
import { useAppContext } from "../../contexts/Context";
import { getAxes, getCoords } from "../../util/helpers";
import { useEffect, useState, useRef } from "react";
import PromotionBox from "../Popup/PromotionBox";
import { setNewGame, takeBack } from "../../reducer/actions/move";
import GameEnds from "../Popup/GameEnds";

function Board() {
  const [fenValue, setFenValue] = useState("");
  const { appState, dispatch } = useAppContext();
  const { ranks, files } = getAxes();

  const getClassName = (rank, file) => {
    let _class = "";
    _class +=
      (file + rank) % 2 === 0
        ? " bg-[var(--tile-light)] "
        : " bg-[var(--tile-dark)] ";

    if (rank == appState.kingPos?.rank && file == appState.kingPos?.file) {
      _class += " tile--checked ";
    }

    return _class;
  };

  const defaultClassState = Array.from({ length: 8 }, (_, r) =>
    Array.from({ length: 8 }, (_, f) => getClassName(r, f))
  );

  const [classState, setClassState] = useState(defaultClassState);

  useEffect(() => {
    if (appState.candidateMoves.length === 0) {
      setClassState(defaultClassState);
      return;
    }

    appState.candidateMoves.forEach((move) => {
      setClassState((prev) => {
        const { rank: r, file: f } = getCoords(move.to);
        if (move.captured) {
          prev[r][f] += " tile--candidate ";
        } else {
          prev[r][f] += " tile--highlight ";
        }
        return [...prev];
      });
    });
  }, [appState.candidateMoves]);

  useEffect(() => {
    if (!appState.kingPos) {
      setClassState(defaultClassState);
      return;
    }

    setClassState((prev) => {
      prev[appState.kingPos.rank][appState.kingPos.file] += " tile--checked ";
      return [...prev];
    });
  }, [appState.kingPos]);
  const inputRef = useRef(null);

  return (
    <div className="board relative  h-bsz">
      <Ranks ranks={ranks} />
      <div className="absolute -top-10 ">
        <input
          ref={inputRef}
          id="fen"
          onChange={(e) => {
            setFenValue(e.target.value);
          }}
          value={fenValue}
          type="text"
          placeholder="FEN"
          className="text-gray-300 bg-neutral-700 outline-none px-3 py-1 mr-5 rounded"
        />
        <button
          onClick={() => {
            dispatch(setNewGame({ fen: fenValue }));
          }}
        >
          New Game
        </button>
      </div>
      <div className="tiles rounded overflow-hidden grid grid-cols-8 w-bsz grid-rows-8 h-bsz col-span-11">
        {classState.length &&
          ranks.map((rank, r) =>
            files.map((file, f) => {
              const square = `${file - 1}${8 - rank}`;

              return (
                <div
                  key={square}
                  className={cn(`tile relative ${classState[r][f]} `)}
                ></div>
              );
            })
          )}
      </div>
      <Pieces />
      <Popup>
        <GameEnds />
        <PromotionBox />
      </Popup>
      <Files files={files} />
      <button onClick={() => dispatch(takeBack())}>Undo</button>
    </div>
  );
}

export default Board;
