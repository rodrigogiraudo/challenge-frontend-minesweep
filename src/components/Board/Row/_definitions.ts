import { MouseEvent } from 'react';
import { TileType } from "./Tile/_definitions";

export type PropsType = {
  row: Array<TileType>;
  leftClick: (tile: TileType) => void;
  rightClick: (tile: TileType, e:MouseEvent) => void;
};

