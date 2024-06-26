import { useReducer } from "react";
import { reducer } from "./reducer/Reducer.js";
import { initialGameState } from "./util/constants.js";
import AppContext from "./contexts/Context.js";
import Board from "./components/Board/Board.jsx";

function App() {
  const [appState, dispatch] = useReducer(reducer, initialGameState());
  const providerState = { appState, dispatch };
  return (
    <AppContext.Provider value={providerState}>
      <div className="App grid md:place-content-center bg-[var(--bg-color)] min-h-screen">
        <div className="min-h-bsz flex gap-5 flex-col lg:flex-row items-center justify-center ">
          <Board />
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
