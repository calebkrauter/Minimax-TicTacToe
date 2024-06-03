// Tic Tac Toe
class Agent {

    minimax(board, isMaximizing) {
        let gameOver = board.gameOver();
        return gameOver === 1 ? 1 : gameOver === 2 ? -1 : gameOver === 3 ? 0 : this.newTurn(board, isMaximizing);
    }

    newTurn(board, isMaximizing) {
        let bestScore = isMaximizing ? -Infinity : Infinity;
        for (let i = 0; i < board.cells.length; i++) {
            let cell = i + 1;
            if (board.emptySpace(cell)) {
                let newBoard = board.clone();
                newBoard.move(cell);
                let score = isMaximizing ? this.minimax(newBoard, false) : this.minimax(newBoard, true);
                bestScore = isMaximizing ? Math.max(bestScore, score) : Math.min(bestScore, score);
            }
        }
        return bestScore;
    }

    selectMove(board) {
        let maxScore = -Infinity, minScore = Infinity, maxMove, minMove;
        for (let i = 0; i < board.cells.length; i++) {
            let cell = i + 1;
            if (board.emptySpace(cell)) {
                let newBoard = board.clone();
                newBoard.move(cell);
                let score = this.minimax(newBoard, !board.playerOne);
                if (score > maxScore) {
                    maxScore = score;
                    maxMove = cell;
                }
                if (score < minScore) {
                    minScore = score;
                    minMove = cell;
                }
            }
        }
        return board.playerOne ? maxMove : minMove;
    }
}