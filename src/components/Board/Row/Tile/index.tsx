import React, { ReactElement, FC } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faFlag } from '@fortawesome/free-solid-svg-icons'
import { Cell, CellContent } from "./_style";
import { PropsType, TileType } from "./_definitions";

const RenderTileContent = (tile: TileType) => {
  if (tile.isExplored && !tile.isMine) {
    return (
      <CellContent>{tile.nearbyMines > 0 && tile.nearbyMines}</CellContent>
    );
  }
  if (tile.isFlagged) {
    return <CellContent><FontAwesomeIcon icon={faFlag} /></CellContent>;
  }
  if (tile.isExplored && tile.isMine) {
    return <CellContent><FontAwesomeIcon icon={faBomb} /></CellContent>;
  }
  return <CellContent />;
};

const Tile: FC<PropsType> = ({ tile, leftClick }: PropsType): ReactElement => {
  return <Cell explored={tile.isExplored} onClick={() => leftClick(tile)}>{RenderTileContent(tile)}</Cell>;
};

export default Tile;
