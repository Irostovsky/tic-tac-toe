import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const getActivePlayer = (turns) =>
  turns.length && turns[0].player === "X" ? "O" : "X";

const deriveWinner = (board, players) => {
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
  return winner;
};

const deriveBoard = (turns) => {
  let board = JSON.parse(JSON.stringify(INITIAL_GAME_BOARD));
  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    board[row][col] = player;
  }
  return board;
};

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = getActivePlayer(gameTurns);
  const board = deriveBoard(gameTurns);
  const winner = deriveWinner(board, players);
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
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onSavePlayer={handlePlayerNameChange}
          />
          <Player
            initialName={PLAYERS.O}
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
