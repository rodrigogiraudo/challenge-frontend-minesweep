import React, { FC, useState, useEffect, MouseEvent } from "react";
import Board from "./components/Board";
import Controls from "./components/Controls";
import { AppBody, AppContainer, Game } from "./_style";
import { PropsType, BoardType, RowType } from "./_definitions";
import { TileType } from "./components/Board/Row/Tile/_definitions";
import createBoard from "./utils/createBoard.util";
import openTile from "./utils/openTile.util";

const App: FC<PropsType> = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(16);
  const [flags, setFlags] = useState(16);
  const [board, setBoard] = useState<BoardType>([]);

  useEffect(() => {
    setBoard(createBoard(rows, columns, mines));
  }, []);

  const handleEOG = () => {};
  const handleLeftClick = (tile: TileType) => {
    let newBoard = board.map((row: TileType[]) => {
      row = row.map(cell => {
        return { ...cell };
      });
      return [...row];
    });

    newBoard = openTile(tile.y, tile.x, newBoard);
    newBoard[tile.y][tile.x].bombDeath && handleEOG();
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
