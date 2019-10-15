import styled from "styled-components";
import { HeaderType, ErrorMessageType } from "./_definitions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Header = styled.div<HeaderType>`
  height: 32px;
  width: calc(16px + (22px * ${({ columns }) => columns}));
  background-color: #ece9d8;
  color: #000;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding-left: 10px;
`;

export const InputContainer = styled.div`
  height: 20px;
  color: #5f5f5f;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  > label { 
    width: 75px;
    text-align: left;
   }; 
  > input { 
    flex: 1
   }; 
`;

export const DropdownTitle = styled.span`
  cursor: pointer;
`;

export const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
  text-align: left;
`;

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropdownContent} {
    display: block;
  }
`;

export const DropdownItem = styled.div`
  margin: 0px;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    background-color: #5d5d5d;
    color: #fff;
  }
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size: 15px;
  background-color: white;
  border-radius: 50%;
  color: red;
`;
export const Close = styled.a`
  right: -7px;
  top: -7px;
  display: inline-block;
  position: absolute;
`;
export const PopupContainer = styled.div`
  padding: 10px;
`;
export const ErrorMessage = styled.div<ErrorMessageType>`
  display: ${({ hasError }) => (hasError ? "block" : "none")};
  padding: 10px;
  background-color: red;
  color: white;
  border-radius: 5px;
  font-size: 13px;
  font-weight: 800;
`;
