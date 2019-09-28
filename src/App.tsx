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
        <Board rows={rows} columns={columns} mines={mines} />
      </header>
    </div>
  );
};

export default App;
