import { BoardType, RowType } from "../_definitions";
import { TileType } from "../components/Board/Row/Tile/_definitions";

const boardDeepCopy = (board: BoardType): BoardType => {
  return board.map((row: TileType[]) => {
    row = row.map((cell: TileType) => {
      return { ...cell };
    });
    return [...row];
  });
};

export default boardDeepCopy;
