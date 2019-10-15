import { BoardType, RowType } from "../_definitions";
import { TileType } from "../components/Board/Row/Tile/_definitions";

const setWonBoard = (newBoard: BoardType): BoardType => {
  return newBoard.map((row: RowType) => {
    return row.map((cell: TileType) => {
      if (!cell.isExplored) cell.isFlagged = true;
      return cell;
    });
  });
};

export default setWonBoard;
