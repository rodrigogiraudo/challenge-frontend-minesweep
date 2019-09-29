import React, { ReactElement, FC } from "react";
import { Header } from "./_style";
import { PropsType } from "./_definitions";
import Timer from "./Timer";
import RemainingMines from "./RemainingMines";
import Reset from "./Reset";

const Controls: FC<PropsType> = ({ columns }: PropsType): ReactElement => {
  return (
    <Header columns={columns}>
      <RemainingMines></RemainingMines>
      <Reset></Reset>
      <Timer></Timer>
    </Header>
  );
};

export default Controls;
