export type PropsType = {
  tile: TileType;
};
export interface CellProps {
  explored?: boolean;
}
export type TileType = {
  x: number;
  y: number;
  nearbyMines: number;
  isExplored: boolean;
  isFlagged: boolean;
  isMine: boolean;
};
