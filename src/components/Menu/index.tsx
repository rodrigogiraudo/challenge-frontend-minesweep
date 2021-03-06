import React, { ReactElement, FC, useState, useEffect } from "react";
import { PropsType } from "./_definitions";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

import Popup from "reactjs-popup";
import {
  Header,
  InputContainer,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTitle,
  PopupContainer,
  Icon,
  ErrorMessage,
  Close
} from "./_style";

const Menu: FC<PropsType> = ({
  mines,
  rows,
  columns,
  newGame,
  saveOptions
}: PropsType): ReactElement => {
  const [showModal, setShowModal] = useState(false);
  const [newRows, setNewRows] = useState(0);
  const [newColumns, setNewColumns] = useState(0);
  const [newMines, setNewMines] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setNewRows(rows);
    setNewColumns(columns);
    setNewMines(mines);
  }, []);

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const handleSubmit = () => {
    if (newMines > newColumns * newRows) {
      setHasError(true);
      setErrorMessage("Amount of mines must be less than rows * columns");
      return false;
    }
    if(newMines>=100 || newColumns >= 100){
      setHasError(true);
      setErrorMessage("Max number of columns and / or rows is 100");
      return false;
    }
    setHasError(false);
    setErrorMessage("");
    saveOptions(newRows, newColumns, newMines);
    closeModal();
  };
  return (
    <Header columns={columns}>
      <Dropdown>
        <DropdownTitle>Menu</DropdownTitle>
        <DropdownContent>
          <DropdownItem onClick={newGame}>New Game</DropdownItem>
          <DropdownItem onClick={openModal}>Options</DropdownItem>
          <DropdownItem onClick={openModal}>Statistics</DropdownItem>
        </DropdownContent>
      </Dropdown>

      <Popup open={showModal} closeOnDocumentClick onClose={closeModal}>
        <PopupContainer>
          <Close className="close" onClick={closeModal}>
            <Icon icon={faTimesCircle} />
          </Close>
          <div>
            <InputContainer>
              <label>Columns </label>
              <input
                name="columns"
                min="0"
                max="99"
                type="number"
                placeholder="Insert amount of columns..."
                value={newColumns}
                onChange={event => setNewColumns(parseInt(event.target.value))}
              />
            </InputContainer>
            <InputContainer>
              <label>Rows </label>
              <input
                name="rows"
                min="0"
                max="99"
                type="number"
                placeholder="Insert amount of rows..."
                value={newRows}
                onChange={event => setNewRows(parseInt(event.target.value))}
              />
            </InputContainer>
            <InputContainer>
              <label>Mines </label>
              <input
                name="mines"
                min="0"
                max="99"
                type="number"
                placeholder="Insert amount of mines..."
                value={newMines}
                onChange={event => setNewMines(parseInt(event.target.value))}
              />
            </InputContainer>
            <InputContainer>
              <button
                type="button"
                name="save"
                value="Save"
                onClick={handleSubmit}
              >
                Save
              </button>
            </InputContainer>
          </div>
          <ErrorMessage hasError={hasError}>{errorMessage}</ErrorMessage>
        </PopupContainer>
      </Popup>
    </Header>
  );
};

export default Menu;
