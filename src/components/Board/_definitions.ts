import { TileType } from './Row/Tile/_definitions';

export type PropsType = {
  rows: number;
  columns: number;
  mines: number;
};

export type RowType = Array<TileType>
export type BoardType = Array<RowType>