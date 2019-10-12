import { MouseEvent } from 'react';
export type PropsType = {
  tile: TileType;
  leftClick: (tile: TileType) => void;
  rightClick: (tile: TileType, e:MouseEvent) => void;
};
export interface CellProps {
  explored?: boolean;
  bombDeath?: boolean;
  onClick: (event: any) => void;
}
export type TileType = {
  x: number;
  y: number;
  nearbyMines: number;
  isExplored: boolean;
  isFlagged: boolean;
  isMine: boolean;
  bombDeath: boolean;
};
