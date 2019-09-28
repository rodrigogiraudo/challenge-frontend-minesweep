import React, { ReactElement, FC } from "react";
import { Cell } from "./_style";
import { PropsType } from "./_definitions";

const Tile: FC<PropsType> = ({ tile }: PropsType): ReactElement => {
  return <Cell>{tile.nearbyMines}</Cell>;
};

export default Tile;
