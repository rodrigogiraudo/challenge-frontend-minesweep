import styled from "styled-components";
import { CellProps } from "./_definitions";

export const Cell = styled.div<CellProps>`
  width: ${({ explored }) => (explored ? "22px" : "16px")};
  height: ${({ explored }) => (explored ? "22px" : "16px")};
  background-color: ${({ bombDeath }) => (bombDeath ? "#ff0000" : "#bdbdbd")};
  color: #0d0d0d;
  margin: 0px;
  padding: 0px;
  display: inline-block;
  border-top: ${({ explored }) => (explored ? "0px" : "3px")} solid #ffffff;
  border-left: ${({ explored }) => (explored ? "0px" : "3px")} solid #ffffff;
  border-bottom: ${({ explored }) => (explored ? "0px" : "3px")} solid #7b7b7b;
  border-right: ${({ explored }) => (explored ? "0px" : "3px")} solid #7b7b7b;
  font-size: 14px;
  cursor: pointer;
  vertical-align: bottom;
  &:hover {
    background-color: ${({ explored, bombDeath }) =>
      !explored ? "#8a8a8a" : !bombDeath ? "#bdbdbd" : "#ff0000"};
  }
`;

export const CellContent = styled.span`
  background: transparent;
  line-height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;
