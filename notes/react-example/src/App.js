
import React, {Component, useState} from "react";
import {hot} from "react-hot-loader";
import {newBoard, boardIndex, play} from "./ConnectFour.js";
import "./App.css";

// ---------------------------------------------------------------------- Square

function Square(props) {
    return (
        <button key={props.value} className="square" onClick={() => props.onClick()}>
        {props.board.squares[props.value] == 1 ? 'X' : props.board.squares[props.value] == 2 ? 'O' : ''}
        </button>
    );
}

function StatusRow(props) {
    return (
        <div key="status">
          {props.value}
        </div>
    );
}

// ----------------------------------------------------------------------- Board

function Board(props) {

    let [board, setBoard] = useState(newBoard(props.rows, props.cols, props.connect));

    function getStatus() {
        switch(board.gameOver) {
        case 0: return 'Game Drawn';
        case 1: return 'Player 1 Has Won';
        case 2: return 'Player 2 Has Won';
        default:
            return `Connect Four: Player ${board.nextPlayer} to play`;
        }
    }
    
    function handleClick(col) {
        try {
            if(board.gameOver != null) return;
            setBoard(play(board, col));
        } catch(err) {
            console.log(err);
        }
    }
    
    function makeRow(row) {
        let widgets = Array(props.cols).fill(null);
        for(let i = 0; i < props.cols; ++i) 
            widgets[i] = Square({board: board,
                                 value: boardIndex(board, row, i),
                                 onClick: () => handleClick(i)
                                });
        return React.createElement('div', {key: row, className: 'board-row'}, widgets);
    }

    let children = Array(props.rows + 1).fill(null);
    children[0] = StatusRow({value: getStatus()});
    for(let row = 0; row < props.rows; ++row)
        children[row + 1] = makeRow(props.rows - row - 1);
    return React.createElement('div', {}, children);
}

// ------------------------------------------------------------------------- App

function App(props) {
    return(
        <div className="game">
          <div className="game-board">
            <Board rows="6" cols="7" connect="4" />
          </div>
        </div>
    );
}

export default hot(module)(App);
