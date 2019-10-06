import { TileType } from "./Row/Tile/_definitions";

export type PropsType = {
  board: Array<Array<TileType>>;
  leftClick: (tile: TileType) => void;
};
