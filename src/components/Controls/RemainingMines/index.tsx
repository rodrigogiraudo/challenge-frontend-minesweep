import React, { ReactElement, FC } from "react";
import { Container } from "./_style";
import { PropsType } from "./_definitions";

const RemainingMines: FC<PropsType> = ({ flags }: PropsType): ReactElement => {
  return <Container>{flags}</Container>;
};

export default RemainingMines;
