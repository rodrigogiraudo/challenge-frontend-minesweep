import React, { ReactElement, FC } from "react";
import { Header } from "./_style";
import { PropsType } from "./_definitions";
import Timer from "./Timer";
import RemainingMines from "./RemainingMines";
import Reset from "./Reset";

const Controls: FC<PropsType> = ({
  columns,
  flags,
  time,
  restart,
  gameStatus,
}: PropsType): ReactElement => {
  return (
    <Header columns={columns}>
      <RemainingMines flags={flags}></RemainingMines>
      <Reset restart={restart} gameStatus={gameStatus}></Reset>
      <Timer time={time}></Timer>
    </Header>
  );
};

export default Controls;
