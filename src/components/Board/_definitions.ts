import { MouseEvent } from "react";
import { TileType } from "./Row/Tile/_definitions";

export type PropsType = {
  board: Array<Array<TileType>>;
  leftClick: (tile: TileType) => void;
  rightClick: (tile: TileType, e:MouseEvent) => void;
};
