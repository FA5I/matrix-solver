import Matrix from "./Matrix";

class Solver {
  solveLU(lhs, b) {
    // construct LU decomposition of the lhs matrix - lhs gives us the permutation
    let plu = this.luDecompositionPivot(lhs);

    // create space to hold the upper triangular, lower triangular and permutation
    let upper_tri = plu[2];
    let lower_tri = plu[1];
    let permutation = plu[0];

    // transpose the permutation matrix
    permutation.transpose();

    // multiply the transpose of the permutation matrix by b
    let p_inv_b = permutation.matMatMult(b);

    // calculate the y values using forward substitution
    let y_values = this.forwardSubstitution(lower_tri, p_inv_b); // memory cleared

    // calculate the solution using back substitution and the y values we calculated earlier
    let solution = this.backSubstitution(upper_tri, y_values); // return at end of function

    return solution;
  }

  luDecompositionPivot(lhs) {
    // make sure the matrix is square
    if (lhs.cols !== lhs.rows) {
      throw "Input matrix must be square!";
    }

    // make a copy of the lhs matrix
    let A = new Matrix(lhs.rows, lhs.cols);
    for (let i = 0; i < lhs.size; i++) {
      A.values[i] = lhs.values[i];
    }

    let lower_tri = new Matrix(lhs.rows, lhs.cols);

    let permutation = new Matrix(lhs.rows, lhs.cols);
    for (let i = 0; i < permutation.rows; i++) {
      permutation.values[i * permutation.cols + i] = 1;
    }

    let max_val;
    let max_index;

    for (let k = 0; k < A.rows - 1; k++) {
      max_val = -1;
      max_index = k;

      for (let z = k; z < A.rows; z++) {
        let candidate = Math.abs(A.values[z * A.cols + k]);
        if (candidate > max_val) {
          max_val = candidate;
          max_index = z;
        }
      }

      A.swapRows(k, max_index);
      permutation.swapRows(k, max_index);
      lower_tri.swapRows(k, max_index);

      let s;

      // loop over each equation below the pivot
      for (let i = k + 1; i < A.rows; i++) {
        // assumes row major order
        s = A.values[i * A.cols + k] / A.values[k * A.cols + k];

        // update the upper tri values using the scaling factor
        for (let j = k; j < A.cols; j++) {
          A.values[i * A.cols + j] -= s * A.values[k * A.cols + j];
        }

        // update the lower tri values
        lower_tri.values[i * lower_tri.rows + k] = s;
      }
    }

    // add 1s to the diagonal
    for (let i = 0; i < A.rows; i++) {
      lower_tri.values[i * lower_tri.rows + i] += 1;
    }

    permutation.transpose();

    // transpose the permutation matrix
    return [permutation, lower_tri, A];
  }

  upperTriangular(lhs, b) {
    // check if A is square
    if (lhs.rows !== lhs.cols) {
      throw "Input matrix must be square!";
    }

    // check that the dimensions of A and b are compatible
    if (lhs.rows !== b.size) {
      throw "The dimensions of A and b don't match!";
    }

    // s is the scaling factor to adjust a row. kmax keeeps track of the index of the maximum value; need for pivoting
    let s;
    let kmax;

    // loop over each pivot row except the last one
    for (let k = 0; k < lhs.rows - 1; k++) {
      // initialize with current pivot row
      kmax = k;

      // find pivot column to avoid zeros on diagonal
      for (let i = k + 1; i < lhs.rows; i++) {
        if (
          Math.abs(lhs.values[kmax * lhs.cols + k]) <
          Math.abs(lhs.values[i * lhs.cols + k])
        ) {
          kmax = i;
        }
      }

      // swap the rows if we have found a bigger value in the column below the pivot
      lhs.swapRows(kmax, k);
      b.swapRows(kmax, k);

      // loop over each row below the pivot
      for (let i = k + 1; i < lhs.rows; i++) {
        // calculate scaling value for lhs row
        s = lhs.values[i * lhs.cols + k] / lhs.values[k * lhs.cols + k];

        // start looping from k and update the row
        for (let j = k; j < lhs.rows; j++) {
          lhs.values[i * lhs.cols + j] -= s * lhs.values[k * lhs.cols + j];
        }

        // update corresponding entry of b
        b.values[i] -= s * b.values[k];
      }
    }
  }

  backSubstitution(lhs, b) {
    // check if A is square
    if (lhs.rows !== lhs.cols) {
      throw "Input matrix must be square!";
    }

    // check that the dimensions of A and b are compatible
    if (lhs.rows !== b.size) {
      throw "The dimensions of A and b don't match!";
    }

    // create an empty vector
    let solution = new Matrix(b.rows, b.cols); // return at end of function

    // scaling factor
    let s;

    // iterate over system backwards
    for (let k = b.size - 1; k >= 0; k--) {
      // scaling factor
      s = 0;

      for (let j = k + 1; j < b.size; j++) {
        // assumes row major order
        s += lhs.values[k * lhs.cols + j] * solution.values[j];
      }

      // adjust the values in the solution vector
      solution.values[k] = (b.values[k] - s) / lhs.values[k * lhs.cols + k];
    }

    // console.log("back sub", solution);
    return solution;
  }

  forwardSubstitution(lhs, b) {
    // console.log("lhs", lhs.values, "b", b.values);
    // check if A is square
    if (lhs.rows !== lhs.cols) {
      throw "Input matrix must be square!";
    }

    // check that the dimensions of A and b are compatible
    if (lhs.rows !== b.size) {
      throw "The dimensions of A and b don't match!";
    }

    // create an empty vector
    let solution = new Matrix(b.rows, b.cols);

    // scaling factor
    let s;

    // iterate over system
    for (let k = 0; k < b.size; k++) {
      s = 0;

      for (let j = 0; j < k; j++) {
        // assumes row major order
        s = s + lhs.values[k * lhs.cols + j] * solution.values[j];
      }

      // adjust the values in the solution vector
      solution.values[k] = (b.values[k] - s) / lhs.values[k * lhs.cols + k];
    }

    // console.log("forward sub", solution);

    return solution;
  }
}

export default Solver;
