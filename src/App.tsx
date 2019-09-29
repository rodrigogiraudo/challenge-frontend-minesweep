import React, { FC, useState, useEffect } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { AppBody, AppContainer, Game } from "./_style";
import { PropsType, BoardType, RowType } from "./_definitions";
import { TileType } from "./components/Board/Row/Tile/_definitions";

const App: FC<PropsType> = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(16);
  const [board, setBoard] = useState();
  const createBoard = () => {
    //Create empty field
    let board: BoardType = [];
    for (let row = 0; row < rows; row++) {
      let rowArray: RowType = [];
      for (let column = 0; column < columns; column++) {
        let tile: TileType = {
          x: column,
          y: row,
          nearbyMines: 0,
          isMine: false,
          isExplored: false,
          isFlagged: false
        };
        rowArray.push(tile);
      }
      board.push(rowArray);
    }

    // Mine the tiles
    for (let k = 0; k < mines; k++) {
      let newMineRow = Math.floor(Math.random() * rows);
      let newMineColumn = Math.floor(Math.random() * columns);
      if (board[newMineRow][newMineColumn].isMine) {
        k--;
      } else {
        board[newMineRow][newMineColumn].isMine = true;
        //TODO: Calculate Nearby Mines
      }
    }

    console.table(board);
    return board;
  };
  useEffect(() => {
    setBoard(createBoard());
  }, []);

  return (
    <AppBody>
      <AppContainer>
        <Game>
          <Controls columns={columns}></Controls>
          {board && <Board board={board} />}
        </Game>
      </AppContainer>
    </AppBody>
  );
};

export default App;
