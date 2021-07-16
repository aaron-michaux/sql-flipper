
import React, {Component, useState} from "react";
import {hot} from "react-hot-loader";
import "./App.css";

function calculateWinner(squares)
{
    const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

function isDrawn(squares)
{
    return squares.reduce((acc, value) => (acc && value != null), true);
}

function Square(props) {
    return (
        <button className="square" onClick={() => props.onClick()}>
          {props.value}
        </button>
    );
}

function Board(props) {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winner, setWinner]   = useState(null);

    const next_player = 'Next player: ' + (xIsNext ? 'X' : 'O');
    const is_draw = isDrawn(squares);
    const status =
          (is_draw) ? 'Drawn' : (winner == null) ? next_player : (winner + ' has won');

    function handleClick(i) {
        if(winner != null) return;
        if(squares[i] != null) return;
        let player = xIsNext ? 'X' : 'O';
        let new_squares = squares.slice();
        new_squares[i] = player;
        setSquares(new_squares);
        setXIsNext(!xIsNext);
        setWinner(calculateWinner(new_squares));
    }
    
    function renderSquare(i) {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    }
    
    return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
    );
}

function App(props) {
    return(
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
        </div>
    );
}

export default hot(module)(App);
