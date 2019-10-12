import React, { ReactElement, FC } from "react";
import { Container } from "./_style";
import { PropsType} from "./_definitions";
import { TileType } from "./Row/Tile/_definitions";
import Row from "./Row";

const Board: FC<PropsType> = ({ board, leftClick, rightClick }: PropsType): ReactElement => {
  return (
    <Container>
      {board.map((item: Array<TileType>, index: number) => (
        <Row key={item[0].y} row={item} leftClick={leftClick} rightClick={rightClick}/>
      ))}
    </Container>
  );
};

export default Board;
