import { BoardType, RowType } from "../_definitions";
import { TileType } from "../components/Board/Row/Tile/_definitions";

const createBoard = (
  rows: number,
  columns: number,
  mines: number
): BoardType => {
  //Create empty field
  let newBoard: BoardType = [];
  let tileBag: number[] = [];
  let count: number = 0;
  for (let row = 0; row < rows; row++) {
    let rowArray: RowType = [];
    for (let column = 0; column < columns; column++) {
      tileBag.push(count);
      count++;
      let tile: TileType = {
        x: column,
        y: row,
        nearbyMines: 0,
        isMine: false,
        isExplored: false,
        isFlagged: false,
        bombDeath: false
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
    tileBag.splice(randomId, 1);
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
  return newBoard;
};

export default createBoard;
