import React, { ReactElement, FC, useState, useEffect } from "react";
import { Container } from "./_style";
import { PropsType, RowType, BoardType } from "./_definitions";
import { TileType } from "./Row/Tile/_definitions";
import Row from "./Row";

const Board: FC<PropsType> = ({
  rows,
  columns,
  mines
}: PropsType): ReactElement => {
  const [mainBoard, setMainBoard] = useState();
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
  useEffect(() =>{
    setMainBoard(createBoard());
  }, [])
  
  return (
    <Container>
      {mainBoard && mainBoard.map((item: Array<TileType>, index: number) => <Row key={index} row={item} />)}
    </Container>
  );
};

export default Board;
