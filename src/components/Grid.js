import React, { useState } from "react";
import Cell from "./Cell";

function Grid() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);

  return (
    <div>
      rows: <input onChange={(e) => setRows(e.target.value)}></input>
      cols: <input onChange={(e) => setColumns(e.target.value)}></input>
      {/* <h1>rows: {rows}</h1>
      <h1>cols: {columns}</h1> */}
    </div>
  );
}

export default Grid;
