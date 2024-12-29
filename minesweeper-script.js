(function () {
    const boardElement = document.getElementById('board');
    const restartButton = document.getElementById('restart');
    const winningMassageElement = document.getElementById('winningMassage');
    const winingMassageText = document.getElementById('winningMassageText');

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
        e.currentTarget.classList.add("revealed");
        if (boardCellsArray[e.currentTarget.id[0]][e.currentTarget.id[1]] === '!!!') {
            e.currentTarget.classList.add("mine");
            //document.getElementById('winningMassage').style.display = "block";
            //winingMassageText.innerHTML = "You lost the game! Clicked on a MINE!"
        } else {
            revealedCells(boardCellsArray, e.currentTarget.id);
        }
    }

    function revealedCells (board, cellId) {
        let row =cellId[0];
        let column = cellId[1];
        if (board[row][column] !== '!!!') {
            column++;
            return revealedCells(board, cellId);
        } else {
            return
        }
    }

    function onCellRightClicked(e) {
            console.log("right-clicked");
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