import React, { ReactElement, FC } from "react";
import { Cell, CellContent } from "./_style";
import { PropsType, TileType } from "./_definitions";

const RenderTile = (tile: TileType) => {
  if (tile.isExplored && !tile.isMine) {
    return (
      <CellContent>{tile.nearbyMines > 0 && tile.nearbyMines}</CellContent>
    );
  }
  if (tile.isFlagged) {
    return <CellContent>F</CellContent>;
  }
  if (tile.isExplored && tile.isMine) {
    return <CellContent>B</CellContent>;
  }
  return <CellContent />;
};

const Tile: FC<PropsType> = ({ tile }: PropsType): ReactElement => {
  return <Cell explored={tile.isExplored}>{RenderTile(tile)}</Cell>;
};

export default Tile;
