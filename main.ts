controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorRow = Math.max(0, cursorRow - 1)
    cursor.setPosition(40 + cursorCol * 40, 40 + cursorRow * 40)
})
function checkWinner () {
    for (let row2 = 0; row2 <= 2; row2++) {
        if (board[row2][0] == currentPlayer && board[row2][1] == currentPlayer && board[row2][2] == currentPlayer) {
            return true
        }
    }
    for (let col2 = 0; col2 <= 2; col2++) {
        if (board[0][col2] == currentPlayer && board[1][col2] == currentPlayer && board[2][col2] == currentPlayer) {
            return true
        }
    }
    if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) {
        return true
    }
    if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) {
        return true
    }
    return false
}
function setupBoard () {
    for (let row = 0; row <= 2; row++) {
        for (let col = 0; col <= 2; col++) {
            tile = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.Player)
            tile.setPosition(40 + col * 40, 40 + row * 40)
        }
    }
}
function isTie () {
    for (let row3 = 0; row3 <= 2; row3++) {
        for (let col3 = 0; col3 <= 2; col3++) {
            if (board[row3][col3] == 0) {
                return false
            }
        }
    }
    return true
}
// Controller input for marking a cell
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    markCell(cursorRow, cursorCol)
})
// Controller input for moving the cursor
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorCol = Math.max(0, cursorCol - 1)
    cursor.setPosition(40 + cursorCol * 40, 40 + cursorRow * 40)
})
function markCell (row: number, col: number) {
    if (board[row][col] == 0) {
        board[row][col] = currentPlayer
        mark = sprites.create(currentPlayer === 1
            ? img`
                . . . . 2 2 2 2 . . . . 
                . . . 2 2 2 2 2 2 . . . 
                . . . 2 . . . . 2 . . . 
                . . . 2 . . . . 2 . . . 
                . . . 2 2 2 2 2 2 . . . 
                . . . 2 . . . . 2 . . . 
                . . . 2 . . . . 2 . . . 
                . . . 2 2 2 2 2 2 . . . 
            `
            : img`
                . . . 3 3 3 3 . . . . . 
                . . 3 . . . . 3 . . . . 
                . . 3 . . . . 3 . . . . 
                . . 3 . . . . 3 . . . . 
                . . 3 3 3 3 3 3 . . . . 
                . . . . . . . 3 . . . . 
                . . . . . . . 3 . . . . 
                . . . 3 3 3 3 . . . . . 
            `, SpriteKind.Player)
        mark.setPosition(40 + col * 40, 40 + row * 40)
        if (checkWinner()) {
        	
        } else if (isTie()) {
        	
        } else {
            currentPlayer = currentPlayer === 1 ? 2 : 1;
        }
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorCol = Math.min(2, cursorCol + 1)
    cursor.setPosition(40 + cursorCol * 40, 40 + cursorRow * 40)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    cursorRow = Math.min(2, cursorRow + 1)
    cursor.setPosition(40 + cursorCol * 40, 40 + cursorRow * 40)
})
function createCursor () {
    cursor = sprites.create(img`
        . . . . . . 5 5 . . . . . . 
        . . . . . 5 5 5 5 . . . . . 
        . . . . 5 5 5 5 5 5 . . . . 
        . . . 5 5 5 5 5 5 5 5 . . . 
        . . . . 5 5 5 5 5 5 . . . . 
        . . . . . 5 5 5 5 . . . . . 
        . . . . . . 5 5 . . . . . . 
        `, SpriteKind.Player)
    cursor.setPosition(40, 40)
}
let mark: Sprite = null
let tile: Sprite = null
let cursorCol = 0
let cursor: Sprite = null
let cursorRow = 0
let currentPlayer = 0
let board: number[][] = []
// Initialize the board
board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
// 1 for Player X, 2 for Player O
currentPlayer = 1
// Set up the game
scene.setBackgroundColor(9)
setupBoard()
createCursor()
