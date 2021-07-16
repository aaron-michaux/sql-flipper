
function newBoard(rows, cols, connect = 4)
{
    return {
        nextPlayer: 1,   // Player is [1|2]
        gameOver: null,  // 0: draw, 1: player1 won, 2: player2 won
        rows: rows,
        cols: cols,
        squares: Array(rows *cols).fill(null),
        connect: connect,
    };
}

function boardIndex(board, row, col)
{
    return (row >= 0 && col >= 0 && row < board.rows && col < board.cols)
        ? (row * board.cols + col)
        : -1;
}

function valueAt(board, row, col)
{
    let index = boardIndex(board, row, col);
    return (index >= 0) ? board.squares[row * board.cols + col] : null;
}

function calculateWinner(board, squares)
{
    let connect = board.connect;

    function search(row0, col0, dRow, dCol) {
        let col = col0;
        let row = row0;
        let counter = 0;
        let player = null;
        while(boardIndex(board, row, col) >= 0) {
            let index = boardIndex(board, row, col);
            let cell = (index >= 0 ? squares[index] : null);
            if((cell == player) && (player != null)) {
                if(++counter == connect) return player;
            } else {
                player = cell;
                counter = (cell == null ? 0 : 1);
            }
            col += dCol;
            row += dRow;
        }
        return null;
    }

    // Rows
    for(let row = 0; row < board.rows; ++row) {
        let winner = search(row, 0, 0, 1);
        if(winner) return winner;
    }

    // Cols
    for(let col = 0; col < board.cols; ++col) {
        let winner = search(0, col, 1, 0);
        if(winner) return winner;
    }

    // Diagonal
    for(let row = 0; row < board.rows; ++row) {
        for(let col = 0; col < board.cols; ++col) {
            let winner_pp = search(row, col, 1, 1);
            if(winner_pp) return winner_pp;
            let winner_nn = search(row, col, -1, -1);
            if(winner_nn) return winner_nn;
        }
    }
    
    // Draw
    let n_plays = board.squares.reduce((acc, value) => acc + (value == null ? 0 : 1), 0);
    if(n_plays == board.squares.length)
        return 0;

    // Game is ongoing
    return null;
}

function firstEmptyRow(board, column)
{
    // Find the max row that is not full
    for(let row = 0; row < board.rows; ++row) {
        if(valueAt(board, row, column) == null)
            return row;
    }
    return board.rows; // Out of range
}

function makeNewSquares(board, column, player)
{
    let row = firstEmptyRow(board, column);
    let index = boardIndex(board, row, column);
    console.log('row = ' + row + ', col = ' + column);
    if(index < 0)
        throw 'Invalid move!';
    let squares = board.squares.slice();
    squares[index] = player;
    return squares;
}

/**
 * Returns a new state
 */
function play(board, column)
{
    let new_squares = makeNewSquares(board, column, board.nextPlayer);
    return {
        ...board,
        squares: new_squares,
        gameOver: calculateWinner(board, new_squares),
        nextPlayer: (board.nextPlayer == 1 ? 2 : 1)
    };
}

export { newBoard, boardIndex, play };
