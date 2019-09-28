export type PropsType = {
  tile: TileType;
};

export type TileType = {
  x: number;
  y: number;
  nearbyMines: number;
  isExplored: boolean;
  isFlagged: boolean;
  isMine: boolean;
};
