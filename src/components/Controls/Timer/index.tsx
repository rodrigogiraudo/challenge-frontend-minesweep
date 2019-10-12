import React, { ReactElement, FC } from "react";
import { Container } from "./_style";
import { PropsType } from "./_definitions";

const Timer: FC<PropsType> = ({ time }: PropsType): ReactElement => {
  return <Container>{Math.trunc(time/1000)} </Container>;
};

export default Timer;
