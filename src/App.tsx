import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Board from "./components/Board";

const App: React.FC = () => {
  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(10);
  const [mines, setMines] = useState(16);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Board rows={rows} columns={columns} mines={mines} />
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
