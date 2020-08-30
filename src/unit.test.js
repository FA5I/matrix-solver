const Matrix = require("./matrix");
const Solver = require("./solver");

const TOL = 0.001;

// a function to compare two numbers within a given tolerance
function fEqual(a, b, tolerance) {
  return Math.abs(a - b) < tolerance;
}

/*======================================
 *            Matrix  Unit Tests
 *======================================*/
test("swap rows", () => {
  let lhs = new Matrix(4, 4);
  lhs.values = [1, 0, 3, 7, 2, 1, 0, 4, 5, 4, 1, -2, 4, 1, 6, 2];

  let b = new Matrix(4, 1);
  b.values = [1, 2, -3, 2];

  let result = [2, 1, 0, 4, 1, 0, 3, 7, 5, 4, 1, -2, 4, 1, 6, 2];

  lhs.swapRows(0, 1);
  b.swapRows(0, 1);

  expect(lhs.values).toEqual(result);
  expect(b.values).toEqual([2, 1, -3, 2]);
});

test("matrix multiplication", () => {
  let rows = 2;
  let cols = 2;

  let a = new Matrix(rows, cols);
  a.values = [1, 2, 3, 4];

  let b = new Matrix(rows, cols);
  b.values = [1, 2, 3, 4];

  let result = [7, 10, 15, 22];
  let output = a.matMatMult(b);

  expect(output.values).toEqual(result);
});

test("transpose", () => {
  let rows = 2;
  let cols = 2;

  let a = new Matrix(rows, cols);
  a.values = [1, 2, 3, 4];

  a.transpose();

  let result = [1, 3, 2, 4];

  expect(a.values).toEqual(result);
});
/*======================================
 *         Solver  Unit Tests
 *======================================*/
test("upper_tri", () => {
  let rows = 3;
  let cols = 3;

  let a = new Matrix(rows, cols);
  a.values = [2, 3, -4, 3, -1, 2, 4, 2, 2];

  let b = new Matrix(rows, 1);
  b.values = [10, 3, 8];

  let solver = new Solver();

  solver.upperTriangular(a, b);

  let a_result = [4, 2, 2, 0, -2.5, 0.5, 0, 0, -4.6];
  let b_result = [8, -3, 3.6];

  for (let i = 0; i < a.size; i++) {
    expect(a.values[i]).toBeCloseTo(a_result[i]);
  }

  for (let i = 0; i < b.size; i++) {
    expect(b.values[i]).toBeCloseTo(b_result[i]);
  }
});

test("lower_tri", () => {
  let rows = 3;
  let cols = 3;

  let a = new Matrix(rows, cols);
  a.values = [2, 3, -4, 3, -1, 2, 4, 2, 2];

  let b = new Matrix(rows, 1);
  b.values = [10, 3, 8];

  let solver = new Solver();

  solver.upperTriangular(a, b);

  let a_result = [4, 2, 2, 0, -2.5, 0.5, 0, 0, -4.6];
  let b_result = [8, -3, 3.6];

  for (let i = 0; i < a.size; i++) {
    expect(a.values[i]).toBeCloseTo(a_result[i]);
  }

  for (let i = 0; i < b.size; i++) {
    expect(b.values[i]).toBeCloseTo(b_result[i]);
  }
});

test("back_substitution", () => {
  let rows = 3;
  let cols = 3;

  let a = new Matrix(rows, cols);
  a.values = [2, 3, -4, 0, -1, 14, 0, 0, 30];

  let b = new Matrix(rows, 1);
  b.values = [5, -12, -15];

  let solver = new Solver();

  let x = solver.backSubstitution(a, b);

  let result = [-6, 5, -0.5];

  for (let i = 0; i < x.size; i++) {
    expect(x.values[i]).toBeCloseTo(result[i]);
  }
});

test("lu_decomposition_pp", () => {
  let rows = 4;
  let cols = 4;

  let a = new Matrix(rows, cols);
  a.values = [5, 7, 5, 9, 5, 14, 7, 10, 20, 77, 41, 48, 25, 91, 55, 67];

  let b = new Matrix(rows, 1);
  b.values = [5, -12, -15];

  let solver = new Solver();
  let xyz = solver.luDecompositionPivot(a);

  let y_result = [
    1,
    0,
    0,
    0,
    0.2,
    1,
    0,
    0,
    0.8,
    -0.375,
    1,
    0,
    0.2,
    0.375,
    0.3333,
    1,
  ];
  let z_result = [
    25,
    91,
    55,
    67,
    0,
    -11.2,
    -6,
    -4.4,
    0,
    0,
    -5.25,
    -7.25,
    0,
    0,
    0,
    0.666667,
  ];

  for (let i = 0; i < a.size; i++) {
    expect(xyz[1].values[i]).toBeCloseTo(y_result[i]);
    expect(xyz[2].values[i]).toBeCloseTo(z_result[i]);
  }
});

test("lu_decomposition_pp_solve", () => {
  let rows = 2;
  let cols = 2;

  let a = new Matrix(rows, cols);
  a.values = [1.01, 0.99, 0.99, 1.01];

  let b = new Matrix(rows, 1);
  b.values = [1.0, 1.0];

  let solver = new Solver();

  let solution = solver.solveLU(a, b);

  let result = [0.5, 0.5];

  for (let i = 0; i < solution.size; i++) {
    expect(solution.values[i]).toBeCloseTo(result[i]);
  }
});
