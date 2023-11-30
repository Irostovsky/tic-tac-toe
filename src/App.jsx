import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const getActivePlayer = (turns) =>
  turns.length && turns[0].player === "X" ? "O" : "X";

function App() {
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });

  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = getActivePlayer(gameTurns);

  let board = JSON.parse(JSON.stringify(initialGameBoard));
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }

  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const combinationSymbols = combination.map(
      (pair) => board[pair.row][pair.column]
    );
    const uniqueSymbols = [...new Set(combinationSymbols)];
    if (uniqueSymbols.length === 1 && uniqueSymbols[0]) {
      winner = players[uniqueSymbols[0]];
    }
  }

  const hasDraw = gameTurns.length == 9 && !winner;
  const handleSquareSelection = (rowIndex, colIndex) => {
    setGameTurns((prevGameTurns) => {
      const currentPlayer = getActivePlayer(prevGameTurns);
      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];
    });
  };

  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, name) => {
    setPlayers((previousPlayers) => {
      return {
        ...previousPlayers,
        [symbol]: name,
      };
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
            onSavePlayer={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onSavePlayer={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRestart} />
        )}
        <GameBoard onSelectionSquare={handleSquareSelection} board={board} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
