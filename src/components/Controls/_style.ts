import styled from "styled-components";
import { HeaderType } from "./_definitions";

export const Header = styled.div<HeaderType>`
  height: 32px;
  width: calc(22px * ${({ columns }) => columns});
  background-color: #c0c0c0;
  border-top: 3px solid #7b7b7b;
  border-left: 3px solid #7b7b7b;
  border-bottom: 3px solid #ffffff;
  border-right: 3px solid #ffffff;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
