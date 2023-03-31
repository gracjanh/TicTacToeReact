import { useState } from "react";

const App = () => {
    const [boardData, setBoardData] = useState([
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
    ]);
    const [player, setPlayer] = useState("X");
    let isFinished = false;

    const checkForWinner = () => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (
                boardData[a] !== null &&
                boardData[a] === boardData[b] &&
                boardData[a] === boardData[c]
            ) {
                isFinished = true;
                return boardData[a];
            }
        }
        return null;
    };

    const checkForDraw = () => {
        if (!boardData.includes(null) && !checkForWinner()) {
            isFinished = true;
            return true;
        }
        return false;
    };

    const resetGame = () => {
        setBoardData([null, null, null, null, null, null, null, null, null]);
        setPlayer("X");
    };

    const switchPlayer = () => {
        if (player === "X") {
            setPlayer("O");
        } else {
            setPlayer("X");
        }
    };

    const updateBoard = (index) => {
        const newBoardData = [...boardData];
        if (newBoardData[index] === null && !isFinished) {
            newBoardData[index] = player;
            setBoardData(newBoardData);
            switchPlayer();
        }
    };

    const Tile = ({ index, tile }) => {
        return (
            <div
                className="tile"
                onClick={() => {
                    updateBoard(index);
                }}
            >
                <div className="tile-text">{tile}</div>
            </div>
        );
    };

    const Board = () => {
        return (
            <div className="board">
                {boardData.map((tile, index) => {
                    return <Tile key={index} index={index} tile={tile} />;
                })}
            </div>
        );
    };

    return (
        <div className="app">
            <div className="header">TIC-TAC-TOE GAME</div>
            {checkForWinner() || checkForDraw() ? null : (
                <div className="caption">{player} TURN</div>
            )}
            {checkForWinner() ? (
                <div className="caption">THE WINNER IS: {checkForWinner()}</div>
            ) : null}
            {checkForDraw() ? <div className="caption">DRAW!</div> : null}
            <Board />

            <button className="btn" onClick={resetGame}>
                NEW GAME
            </button>
        </div>
    );
};
export default App;
