(function () {
    const boardElement = document.getElementById('board');
    const restartButton = document.getElementById('restart');
    const winningMassageText = document.getElementById('winningMessageText');

    const boardRows = 9;
    const boardColumns = 9;
    let boardCellsArray = [];
    const mines = 10;


    (function createBoardCells() {
        for (let i = 0; i < boardRows; i++) {
            for (let j = 0; j < boardColumns; j++) {
                const cell = document.createElement('div');
                cell.setAttribute("class", "cell");
                cell.setAttribute("id", `${i}${j}`);
                cell.innerHTML = ``;
                cell.addEventListener('click', onCellClicked);
                cell.addEventListener('contextmenu', onCellRightClicked);
                boardElement.appendChild(cell);
            }
            boardCellsArray.push(['', '', '', '', '', '', '', '', '']);
        }
        console.log(boardCellsArray);
        pasteRandomMines();
        console.log(boardCellsArray);
    })()

    function pasteRandomMines() {
        for (let i = 0; i < mines; i++) {
            const randomRow = Math.floor(Math.random() * boardCellsArray.length);
            const randomColumn = Math.floor(Math.random() * boardCellsArray.length);

            if (boardCellsArray[randomRow][randomColumn] === '') {
                boardCellsArray[randomRow][randomColumn] = '!!!';
            } else {
                i--;
            }
        }
    }

    function onCellClicked(e) {
        e.preventDefault();
        if (boardCellsArray[e.currentTarget.id[0]][e.currentTarget.id[1]] === '!!!') {
            e.currentTarget.classList.add("mine");
            document.getElementById('winningMessage').style.visibility = "visible";
            winningMassageText.innerText = "You lost the game! Clicked on a MINE!";
        } else {
            revealedCellsToRight(boardCellsArray, Number(e.currentTarget.id[0]), Number(e.currentTarget.id[1]));
            revealedCellsToLeft(boardCellsArray, Number(e.currentTarget.id[0]), Number(e.currentTarget.id[1]));
        }
    }

    function revealedCellsToRight (board, rowIndex, columnIndex) {
        if ((rowIndex < 0 || rowIndex >= board.length) ||
            (columnIndex < 0 || columnIndex >= board.length)
        ) {
            return;
        }

        if(board[rowIndex][columnIndex] === '!!!') {
            return;
        }

        if(rowIndex < board.length || columnIndex < board.length) {
            document.getElementById(`${rowIndex}${columnIndex}`).classList.add('revealed');
            revealedCellsToRight(board, rowIndex + 1, columnIndex);
            revealedCellsToRight(board, rowIndex, columnIndex + 1);
        }
    }

    function revealedCellsToLeft (board, rowIndex, columnIndex) {
        if ((rowIndex < 0 || rowIndex >= board.length) ||
            (columnIndex < 0 || columnIndex >= board.length)
        ) {
            return;
        }

        if(board[rowIndex][columnIndex] === '!!!') {
            return;
        }

        if(rowIndex > 0 || columnIndex > 0) {
            document.getElementById(`${rowIndex}${columnIndex}`).classList.add('revealed');
            revealedCellsToLeft(board, rowIndex - 1, columnIndex);
            revealedCellsToLeft(board, rowIndex, columnIndex - 1);
        }
    }

    function onCellRightClicked(e) {
        e.preventDefault();
        if (e.currentTarget.classList.contains('revealed')) {
            return;
        }
        if(e.currentTarget.innerHTML === '') {
            e.currentTarget.innerHTML = 'X';
        } else if (e.currentTarget.innerHTML === 'X') {
            e.currentTarget.innerHTML = '';
        }
    }

    //restartButton.addEventListener('click', restartGame);

   // function restartGame (e) {
    //   e.preventDefault();
    // boardCellsArray = boardCellsArray.map(cells => {
    //   cells.map(el => el = '');
    //})
    //console.log(boardCellsArray);
    //}
})()