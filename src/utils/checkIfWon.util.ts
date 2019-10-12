import { BoardType, RowType } from "../_definitions";
import { TileType } from "../components/Board/Row/Tile/_definitions";

const checkIfWon = (newBoard: BoardType, mines: number): boolean => {
  let remainingTiles: number = 0;
  newBoard.forEach((row: RowType) => {
    row.forEach((cell: TileType) => {
      if (!cell.isExplored) remainingTiles++;
    });
  });
  return mines === remainingTiles;
};

export default checkIfWon;
