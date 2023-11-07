import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const getActivePlayer = (turns) =>
  turns.length && turns[0].player === "X" ? "O" : "X";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = getActivePlayer(gameTurns);

  const handleSquareSelection = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = getActivePlayer(prevGameTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        <GameBoard
          onSelectionSquare={handleSquareSelection}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
