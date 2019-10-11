import React, { FC, useState, useEffect, MouseEvent } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { AppBody, AppContainer, Game } from "./_style";
import { PropsType, BoardType, RowType } from "./_definitions";
import { TileType } from "./components/Board/Row/Tile/_definitions";

const App: FC<PropsType> = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(16);
  const [flags, setFlags] = useState(16);
  const [board, setBoard] = useState<BoardType>([]);
  const createBoard = () => {
    //Create empty field
    let newBoard: BoardType = [];
    let tileBag: number[] = [];
    let count: number = 0;
    for (let row = 0; row < rows; row++) {
      let rowArray: RowType = [];
      for (let column = 0; column < columns; column++) {
        count++;
        tileBag.push(count);
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
      newBoard.push(rowArray);
    }

    //Populate with Bombs
    for (let k = 0; k < mines; k++) {
      const randomId = Math.floor(Math.random() * tileBag.length);
      let randomY = Math.trunc(tileBag[randomId] / columns);
      let randomX = tileBag[randomId] % columns;
      newBoard[randomY][randomX].isMine = true;
      tileBag.slice(randomId, 1);
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
              if (
                !(l === 0 && m === 0) &&
                newBoard[yPosition][xPosition].isMine
              ) {
                newBoard[row][column].nearbyMines++;
              }
            }
          }
        }
      }
    }

    console.table(newBoard);
    return newBoard;
  };
  useEffect(() => {
    setBoard(createBoard());
  }, []);

  const openTile = (y: number, x: number, editingBoard: TileType[][]) => {
    const currentTile = editingBoard[y][x];
    if (currentTile.isFlagged || currentTile.isExplored) {
      return editingBoard;
    }

    editingBoard.map((row: TileType[]) => {
      if (row[0].y === currentTile.y)
        return row.map(cell => {
          if (cell.x === currentTile.x) cell.isExplored = true;

          return cell;
        });
      return row;
    });

    if (currentTile.isMine) {
      //TODO: Handle Loose situation
      return editingBoard;
    }
    if (currentTile.nearbyMines > 0) {
      //TODO: Regular visit
      return editingBoard;
    }

    if (currentTile.nearbyMines === 0) {
      for (let row = -1; row <= 1; row++) {
        for (let col = -1; col <= 1; col++) {
          if (
            !(row === 0 && col === 0) && //Validate it is not the current position
            currentTile.x + col >= 0 && // It is within the board on X
            currentTile.y + row >= 0 && // It is within the board on Y
            currentTile.x + col < editingBoard[0].length && // It is within the board on X
            currentTile.y + row < editingBoard.length && // It is within the board on Y
            !editingBoard[currentTile.y + row][currentTile.x + col].isExplored // It is not yet explored
          ) {
            openTile(currentTile.y + row, currentTile.x + col, editingBoard);
          }
        }
      }
      return editingBoard;
    }
    return editingBoard;
  };

  const handleLeftClick = (tile: TileType) => {
    let newBoard = board.map((row: TileType[]) => {
      row = row.map(cell => {
        return { ...cell };
      });
      return [...row];
    });

    newBoard = openTile(tile.y, tile.x, newBoard);
    setBoard(newBoard);
  };

  const handleRightClick = (tile: TileType, e: MouseEvent) => {
    e.preventDefault();
    if (tile.isExplored) return false;
    tile.isFlagged ? setFlags(flags + 1) : setFlags(flags - 1);
    setBoard(
      board.map((row: TileType[]) => {
        if (row[0].y === tile.y)
          return row.map(cell => {
            if (cell.x === tile.x)
              return { ...cell, isFlagged: !tile.isFlagged };
            return cell;
          });
        return [...row];
      })
    );
    return false;
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
