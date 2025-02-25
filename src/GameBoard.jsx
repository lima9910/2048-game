import React, { useEffect, useState } from "react";
import { createEmptyGrid, addNewNumber, moveGrid } from "./gameLogic";

const GameBoard = () => {
    const [grid, setGrid] = useState(createEmptyGrid());
    const [score, setScore] = useState(0);

    useEffect(() => {
        let newGrid = [...grid];
        addNewNumber(newGrid);
        addNewNumber(newGrid);
        setGrid(newGrid);
    }, []);

    const handleKeyDown = (event) => {
        let direction;
        if (event.key === "ArrowUp") direction = "up";
        if (event.key === "ArrowDown") direction = "down";
        if (event.key === "ArrowLeft") direction = "left";
        if (event.key === "ArrowRight") direction = "right";
        
        if (direction) {
            let { newGrid, moved, score: newScore } = moveGrid(grid, direction);
            if (moved) {
                addNewNumber(newGrid);
                setGrid(newGrid);
                setScore(score + newScore);
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    });

    return (
        <div>
            <h1>2048 游戏</h1>
            <h2>得分: {score}</h2>
            <div className="grid">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((num, colIndex) => (
                            <div key={colIndex} className={`cell ${num ? "filled" : ""}`}>
                                {num !== 0 ? num : ""}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;