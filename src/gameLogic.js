export const GRID_SIZE = 4;

// 生成一个新的 2048 游戏棋盘
export function createEmptyGrid() {
    return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
}

// 在空白位置生成新的数字（2 或 4）
export function addNewNumber(grid) {
    let emptyCells = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (grid[row][col] === 0) emptyCells.push({ row, col });
        }
    }
    if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() > 0.9 ? 4 : 2;
    }
}

// 处理网格移动
export function moveGrid(grid, direction) {
    let moved = false;
    let score = 0;

    const slide = (row) => {
        let arr = row.filter(val => val);
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] === arr[i + 1]) {
                arr[i] *= 2;
                score += arr[i];
                arr.splice(i + 1, 1);
            }
        }
        while (arr.length < GRID_SIZE) arr.push(0);
        return arr;
    };

    let newGrid = createEmptyGrid();

    if (direction === "left") {
        for (let r = 0; r < GRID_SIZE; r++) {
            let newRow = slide(grid[r]);
            if (grid[r].toString() !== newRow.toString()) moved = true;
            newGrid[r] = newRow;
        }
    } else if (direction === "right") {
        for (let r = 0; r < GRID_SIZE; r++) {
            let newRow = slide(grid[r].reverse()).reverse();
            if (grid[r].toString() !== newRow.toString()) moved = true;
            newGrid[r] = newRow;
        }
    } else if (direction === "up") {
        for (let c = 0; c < GRID_SIZE; c++) {
            let col = grid.map(row => row[c]);
            let newCol = slide(col);
            if (col.toString() !== newCol.toString()) moved = true;
            newCol.forEach((val, r) => newGrid[r][c] = val);
        }
    } else if (direction === "down") {
        for (let c = 0; c < GRID_SIZE; c++) {
            let col = grid.map(row => row[c]).reverse();
            let newCol = slide(col).reverse();
            if (col.toString() !== newCol.toString()) moved = true;
            newCol.forEach((val, r) => newGrid[r][c] = val);
        }
    }

    return { newGrid, moved, score };
}