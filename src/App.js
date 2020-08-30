import React, { useState } from "react";
import "./App.css";
import Matrix from "./components/Matrix";
import Solver from "./components/Solver";

function Cell(props) {
  let style = {};

  if (props.solved) {
    if (props.failed) {
      style = { background: "red" };
    } else {
      style = { background: "#8FBC8F" };
    }
  }

  return (
    <input
      style={style}
      className="cell"
      id={props.id}
      value={props.value}
      onChange={(e) => props.onChange(props.id, e.target.value)}
    ></input>
  );
}

function App() {
  let [dim, setDim] = useState(2);
  let [solved, setSolved] = useState(false);
  let [matrix, setMatrix] = useState(new Matrix(dim, dim));
  let [solution, setSolution] = useState(new Matrix(dim, 1));
  let [failed, setFailed] = useState(false);
  let [rhs, setRHS] = useState(new Matrix(dim, 1));

  function updateMatrix(i, value) {
    let new_values = matrix.values.slice();
    let new_matrix = new Matrix(matrix.rows, matrix.cols);
    new_values[i] = value;
    new_matrix.values = new_values;
    setMatrix(new_matrix);
  }

  function updateRHS(i, value) {
    let index = i.replace(/\D/g, "");
    let new_values = rhs.values.slice();
    let new_matrix = new Matrix(matrix.rows, 1);
    new_values[index] = value;
    new_matrix.values = new_values;
    setRHS(new_matrix);
  }

  function updateDim(value) {
    let dim = isNaN(parseInt(value)) ? 2 : parseInt(value);
    if (dim > 10) {
      dim = 10;
    } else if (dim < 2) {
      dim = 2;
    }
    setMatrix(new Matrix(dim, dim));
    setRHS(new Matrix(dim, 1));
    setDim(dim);
  }

  function solve() {
    let solver = new Solver();
    let new_solution = solver.solveLU(matrix, rhs);

    for (let i = 0; i < new_solution.values.length; i++) {
      if (isNaN(new_solution.values[i])) {
        new_solution.values[i] = new_solution.values[i].toString();
      }
    }

    if (new_solution.values.includes("NaN")) {
      setFailed(true);
    } else {
      setFailed(false);
    }

    setSolved(true);
    setSolution(new_solution);
  }

  function reset() {
    let new_dim = 2;
    let new_solved = false;
    let new_matrix = new Matrix(dim, dim);
    let new_solution = new Matrix(dim, 1);
    let new_failed = false;
    let new_rhs = new Matrix(dim, 1);

    setDim(new_dim);
    setSolved(new_solved);
    setMatrix(new_matrix);
    setSolution(new_solution);
    setFailed(new_failed);
    setRHS(new_rhs);
  }

  return (
    <div className="App">
      <nav>
        <a href="https://fazalkhan.net/"> back to Fazi's Homepage</a>
      </nav>
      <div className="title">Matrix Solver</div>
      <div className="description">
        <p>
          This is a matrix solver written in Javascript using React. It directly
          solves a system of equations of the form
          <span className="bold"> Ax = b</span> using an LU decomposition with
          partial pivoting. <br></br>
          <br></br>
          1. Input the values in the matrix on the left. <br></br> <br></br>
          2. Input the right-hand side. <br></br> <br></br>
          3. Hit solve. <br></br> <br></br>
          If a solution exists, the variable column will show the solution
          values and turn green from grey. <br></br> <br></br>
          If a solution does not exist, the variable column will turn red from
          grey.
        </p>
      </div>

      <div className="inputs">
        <span className="dimensions">#Rows:</span>
        <input
          className="slider"
          type="number"
          min="2"
          max="10"
          value={dim}
          onChange={(event) => updateDim(event.target.value)}
        ></input>

        <button className="solve-button" onClick={solve}>
          Solve
        </button>
        <button className="reset-button" onClick={reset}>
          Reset
        </button>
      </div>

      <div className="content">
        <div className="grid">
          <div className="matrix">
            <div>
              {Array.apply(null, Array(dim)).map(function (x, i) {
                const col = Array.apply(null, Array(dim)).map(function (y, j) {
                  return (
                    <Cell
                      key={i * dim + j}
                      id={i * dim + j}
                      value={matrix.values[i * dim + j]}
                      onChange={updateMatrix}
                    />
                  );
                });
                return <div key={i}>{col}</div>;
              })}
            </div>
          </div>
          <div className="variables">
            {Array.apply(null, Array(dim)).map(function (x, i) {
              return (
                <Cell
                  failed={failed}
                  solved={solved}
                  key={"x" + i}
                  id={"x" + i}
                  value={solved ? solution.values[i] : "x" + i}
                  onChange={(a, b) => {}}
                />
              );
            })}
          </div>
          <div className="equalsign"> = </div>
          <div className="rhs">
            {Array.apply(null, Array(dim)).map(function (x, i) {
              return (
                <Cell
                  key={"rhs" + i}
                  id={"rhs" + i}
                  value={rhs.values[i]}
                  onChange={updateRHS}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
