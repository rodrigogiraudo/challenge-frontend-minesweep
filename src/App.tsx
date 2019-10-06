import React, { FC, useState, useEffect, MouseEvent } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { AppBody, AppContainer, Game } from "./_style";
import { PropsType, BoardType, RowType } from "./_definitions";
import { TileType } from "./components/Board/Row/Tile/_definitions";
import Tile from "./components/Board/Row/Tile";
import { rootCertificates } from "tls";

const App: FC<PropsType> = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(16);
  const [flags, setFlags] = useState(16);
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
      }
    }

    // Calculate Nearby Mines
    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        //Loop over neighbors
        for (let l = -1; l <= 1; l++) {
          for (let m = -1; m <= 1; m++) {
            let xPosition = column + m;
            let yPosition = row + l;
            //Validate the position is a valid tile in the board
            if (
              xPosition >= 0 &&
              xPosition < columns &&
              yPosition >= 0 &&
              yPosition < rows
            ) {
              //Sum a mine if it is not itself and the position has a mine
              if (!(l === 0 && m === 0) && board[yPosition][xPosition].isMine) {
                board[row][column].nearbyMines++;
              }
            }
          }
        }
      }
    }

    console.table(board);
    return board;
  };
  useEffect(() => {
    setBoard(createBoard());
  }, []);

  const handleLeftClick = (tile: TileType) => {
    console.log(tile);
    if (tile.isFlagged || tile.isExplored) {
      return;
    }
    if (tile.isMine) {
      //TODO: Handle Loose situation
      setBoard(
        board.map((row: TileType[]) => {
          if (row[0].y === tile.y)
            return row.map(cell => {
              if (cell.x === tile.x) return { ...cell, isExplored: true };
              return cell;
            });
          return [...row];
        })
      );
      return;
    }
    if (tile.nearbyMines > 0) {
      setBoard(
        board.map((row: TileType[]) => {
          if (row[0].y === tile.y)
            return row.map(cell => {
              if (cell.x === tile.x) return { ...cell, isExplored: true };
              return cell;
            });
          return [...row];
        })
      );
      return false;
    }
    //TODO: In this instance is explored with no nearby mines, so it must iterate over itself
  };
  const handleRightClick = (tile: TileType, e:MouseEvent) => {
    e.preventDefault(); 
    tile.isFlagged ? setFlags(flags + 1) : setFlags(flags - 1);
    setBoard(
      board.map((row: TileType[]) => {
        if (row[0].y === tile.y)
          return row.map(cell => {
            if (cell.x === tile.x) return { ...cell, isFlagged: !tile.isFlagged };
            return cell;
          });
        return [...row];
      })
    );
  };
  return (
    <AppBody>
      <AppContainer>
        <Game>
          <Controls columns={columns} flags={flags}></Controls>
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
