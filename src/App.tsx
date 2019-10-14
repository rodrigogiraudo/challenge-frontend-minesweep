import React, { FC, useState, useEffect, MouseEvent } from "react";

//Styled Componets
import { AppBody, AppContainer, Game } from "./_style";

//Components
import Board from "./components/Board";
import Controls from "./components/Controls";
import Menu from "./components/Menu";

//Types
import { PropsType, BoardType } from "./_definitions";
import { TileType } from "./components/Board/Row/Tile/_definitions";

//Utils
import createBoard from "./utils/createBoard.util";
import openTile from "./utils/openTile.util";
import checkIfWon from "./utils/checkIfWon.util";
import setWonBoard from "./utils/setWonBoard.util";
import boardDeepCopy from "./utils/boardDeepCopy.util";

const App: FC<PropsType> = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(9);
  const [mines, setMines] = useState(9);
  const [flags, setFlags] = useState(10);
  const [board, setBoard] = useState<BoardType>([]);
  const [time, setTime] = useState(0);
  const [isOn, setOn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [gameStatus, setGameStatus] = useState("NotInitialized");

  let start: number;

  useEffect(() => {
    setBoard(createBoard(rows, columns, mines));
  }, []);

  const startTimer = () => {
    setOn(true);
    start = Date.now();
    setTimer(setInterval(() => {
      setTime(Date.now() - start);
    }, 1000));
  };
  const stopTimer = () => {
    setOn(false);
    clearInterval(timer);
    setTimer(0);
  };
  const resetTimer = () => {
    stopTimer();
    setTime(0);
  };
  const handleRestart = () => {
    setGameStatus("NotInitialized");
    setFlags(mines);
    setBoard(createBoard(rows, columns, mines));
    resetTimer();
  };

  const handleOptionsChange = (newRows, newColumns, newMines) => {
    setRows(newRows);
    setColumns(newColumns);
    setMines(newMines);
    handleRestart();
  };

  const handleLooseScenario = () => {
    stopTimer();
    setGameStatus("Loose");
  };
  const handleWinScenario = (newBoard: BoardType) => {
    stopTimer();
    setGameStatus("Won");
    setFlags(0);
    setBoard(setWonBoard(newBoard));
  };
  const handleLeftClick = (tile: TileType) => {
    if(gameStatus !== "Won" && gameStatus !== "Loose"){
      if (!isOn) {
        setGameStatus("Playing");
        startTimer();
      }
      let newBoard = openTile(tile.y, tile.x, boardDeepCopy(board));
      newBoard[tile.y][tile.x].bombDeath && handleLooseScenario();
      checkIfWon(newBoard, mines)
        ? handleWinScenario(newBoard)
        : setBoard(newBoard);
    };
    return
  };

  const handleRightClick = (tile: TileType, e: MouseEvent) => {
    e.preventDefault();
    if (tile.isExplored) return false;
    let newBoard = boardDeepCopy(board);
    tile.isFlagged ? setFlags(flags + 1) : setFlags(flags - 1);
    newBoard[tile.y][tile.x].isFlagged = !tile.isFlagged;
    setBoard(newBoard);
    return false;
  };

  return (
    <AppBody>
      <AppContainer>
      <Menu columns={columns} rows={rows} mines={mines} newGame={handleRestart} saveOptions={handleOptionsChange}/>
        <Game>
          <Controls
            columns={columns}
            flags={flags}
            time={time}
            restart={handleRestart}
            gameStatus={gameStatus}
          ></Controls>
          {board && (
            <Board
              board={board}
              leftClick={handleLeftClick}
              rightClick={handleRightClick}
            />
          )}
        </Game>
      </AppContainer>
    </AppBody>
  );
};

export default App;
