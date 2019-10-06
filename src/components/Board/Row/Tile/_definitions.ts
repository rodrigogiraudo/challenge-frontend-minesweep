
export type PropsType = {
  tile: TileType;
  leftClick: (tile: TileType) => void;
};
export interface CellProps {
  explored?: boolean;
  onClick: (event: any) => void;
}
export type TileType = {
  x: number;
  y: number;
  nearbyMines: number;
  isExplored: boolean;
  isFlagged: boolean;
  isMine: boolean;
};
