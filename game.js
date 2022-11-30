window.addEventListener("DOMContentLoaded", () => {
    const tiles = Array.from(document.querySelectorAll(".tile"));
    const playerDisplay = document.getElementById("turn");
    const resetButton = document.querySelector("#reset");
    const startButton = document.getElementById("start");
    const announcer = document.getElementById("announcer");

    let playerX = "X";
    let playerO = "O";

    let board = ["", "", "", "", "", "", "", "", ""];

    let currentPlayer = "X";
    let isGameActive = true;

    const PLAYERX_WON = "PLAYERX_WON";
    const PLAYERO_WON = "PLAYERO_WON";
    const TIE = "TIE";

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function handleResultValidation() {
        console.log(board);
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === "" || b === "" || c === "") {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

        if (!board.includes("")) announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = playerO + " Won";
                break;
            case PLAYERX_WON:
                announcer.innerHTML = playerX + " Won";
                break;

            case TIE:
                announcer.innerText = "Tie";
        }
        announcer.classList.remove("hide");
    };

    const isValidAction = (tile) => {
        if (tile.innerText === "X" || tile.innerText === "O") {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    };

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        playerDisplay.innerText = currentPlayer == "X" ? playerX : playerO;
        playerDisplay.classList.add(`player${currentPlayer}`);
    };

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    };

    const resetBoard = () => {
        const namingDiv = document.getElementById("naming");
        const boardDiv = document.getElementById("all");

        namingDiv.style.display = "block";
        boardDiv.style.display = "none";

        board = ["", "", "", "", "", "", "", "", ""];
        isGameActive = true;

        document.getElementById("playerX").value = "";
        document.getElementById("playerO").value = "";
        announcer.classList.add("hide");

        if (currentPlayer === "O") {
            changePlayer();
        }

        tiles.forEach((tile) => {
            tile.innerText = "";
            tile.classList.remove("playerX");
            tile.classList.remove("playerO");
        });
    };

    tiles.forEach((tile, index) => {
        tile.addEventListener("click", () => userAction(tile, index));
    });

    const startGame = () => {
        const namingDiv = document.getElementById("naming");
        const boardDiv = document.getElementById("all");

        playerX = document.getElementById("playerX").value;
        playerO = document.getElementById("playerO").value;
        const errorText = document.getElementById("error");

        if (playerX === "" || playerO === "") {
            errorText.innerHTML = "Please enter your names";
            return;
        }

        playerDisplay.innerHTML = playerX;

        namingDiv.style.display = "none";
        boardDiv.style.display = "block";
    };

    startButton.addEventListener("click", startGame);
    resetButton.addEventListener("click", resetBoard);
});
