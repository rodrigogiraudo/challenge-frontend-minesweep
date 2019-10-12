import styled from "styled-components";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Container = styled.div`
  height: 17px;
  width: 17px;
  background-color: #bbbebf;
  border-top: 3px solid #ffffff;
  border-left: 3px solid #ffffff;
  border-bottom: 3px solid #7b7b7b;
  border-right: 3px solid #7b7b7b;
  justify-content: center;
  display: flex;
  align-items: center;

  :active {
    border-top: 3px solid #7b7b7b;
    border-left: 3px solid #7b7b7b;
    border-bottom: 3px solid #ffffff;
    border-right: 3px solid #ffffff;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 15px;
  background-color: #000;
  border-radius: 50%;
  color: yellow;
`;
