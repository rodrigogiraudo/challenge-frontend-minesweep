import React, { ReactElement, FC } from "react";
import { Line } from "./_style";
import { PropsType } from "./_definitions";
import { TileType } from "./Tile/_definitions";
import Tile from "./Tile";

const Row: FC<PropsType> = ({ row }: PropsType): ReactElement => {
  return (
    <Line>
      {row.map((item: TileType, index: number) => <Tile key={item.y.toString().concat('-',item.x.toString())} tile={item} />)}
    </Line>
  );
};

export default Row;
