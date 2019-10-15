import React, { ReactElement, FC } from "react";
import { Container, Icon } from "./_style";
import { PropsType } from "./_definitions";
import {
  faSmileBeam,
  faDizzy,
  faGrinStars,
  faSurprise,
  faSmile,
  IconDefinition
} from "@fortawesome/free-solid-svg-icons";

const Reset: FC<PropsType> = ({
  restart,
  gameStatus
}: PropsType): ReactElement => {
  const gameIcon = (status: string): IconDefinition => {
    switch (status) {
      case "NotInitialized":
        return faSmile;
      case "Loose":
        return faDizzy;
      case "Won":
        return faGrinStars;
      case "Active":
        return faSurprise;
      case "Playing":
      default:
        return faSmileBeam;
    }
  };
  return (
    <Container onClick={restart}>
      <Icon icon={gameIcon(gameStatus)} />
    </Container>
  );
};

export default Reset;
