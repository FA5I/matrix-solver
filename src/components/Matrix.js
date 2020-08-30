class Matrix {
  constructor(rows, cols) {
    this.rows = parseInt(rows);
    this.cols = parseInt(cols);
    this.size = rows * cols;
    this.values = new Array(this.size).fill(0);
  }

  printValues() {
    console.log(JSON.stringify(this.values));
  }

  swapRows(i, j) {
    // no swap required
    if (i == j) {
      return;
    }

    // create copy of the first row (both A and b)
    let iA = new Array(this.cols).fill(0);

    for (let k = 0; k < this.cols; k++) {
      iA[k] = this.values[i * this.cols + k];
    }

    // swap the rows
    for (let k = 0; k < this.cols; k++) {
      //copy row j of A into row i of A
      this.values[i * this.cols + k] = this.values[j * this.cols + k];

      // copy row 1 into row 2
      this.values[j * this.cols + k] = iA[k];
    }
  }

  // assumes user has already created mat_right and output matrices
  matMatMult(mat_right) {
    // check dimensions make sense return without doing any multiplication
    if (this.cols !== mat_right.rows) {
      throw "input dimensions don't match";
    }

    // create an output matrix that will hold our values
    let output = new Matrix(this.rows, mat_right.cols);

    /*======================================
     *  matrix multiplication is O(n^3).
     *  Although this loop ordering takes advantage of caching, it
     *  does not take advantage of BLAS routines (for row by row access).
     *======================================*/
    for (let i = 0; i < this.rows; i++) {
      for (let k = 0; k < this.cols; k++) {
        for (let j = 0; j < mat_right.cols; j++) {
          output.values[i * output.cols + j] +=
            this.values[i * this.cols + k] *
            mat_right.values[k * mat_right.cols + j];
        }
      }
    }

    return output;
  }

  transpose() {
    // create a new values array to hold the data
    let new_values = new Array(this.size).fill(0);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        new_values[i * this.cols + j] = this.values[j * this.cols + i];
      }
    }

    let temp = this.rows;
    this.rows = this.cols;
    this.cols = temp;
    this.values = new_values;
  }
}

export default Matrix;
