import { TileType } from "../components/Board/Row/Tile/_definitions";
const openTile = (y: number, x: number, editingBoard: TileType[][]) => {
  const currentTile = editingBoard[y][x];
  if (currentTile.isFlagged || currentTile.isExplored) {
    return editingBoard;
  }

  editingBoard.map((row: TileType[]) => {
    if (row[0].y === currentTile.y)
      return row.map((cell: TileType) => {
        if (cell.x === currentTile.x) {
          cell.isExplored = true;
          if (cell.isMine) cell.bombDeath = true;
        }
        return cell;
      });
    return row;
  });

  if (currentTile.isMine) {
    editingBoard.map((row: TileType[]) => {
      row.map((cell: TileType) => {
        if (cell.isMine) cell.isExplored = true;
        return cell;
      });
      return row;
    });
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

export default openTile;
