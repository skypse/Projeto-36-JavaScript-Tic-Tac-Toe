// Seleciona elementos do DOM e define condições de vitória
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

// Inicializa o jogo
function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
}

// Quando uma célula é clicada
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");
    if(options[cellIndex] != "" || !running) return;
    updateCell(this, cellIndex);
    checkWinner();
}

// Atualiza uma célula clicada
function updateCell(cell, index){
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

// Alterna entre os jogadores
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

// Verifica se há um vencedor ou empate
function checkWinner(){
    let roundWon = false;
    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
        if(cellA == "" || cellB == "" || cellC == "") continue;
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }
    // Se houve um vencedor, exibe a mensagem de vitória e encerra o jogo; se não, verifica se houve um empate ou alterna para o próximo jogador
    if(roundWon){
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;
    }
    else if(!options.includes("")){
        statusText.textContent = `Draw!`;
        running = false;
    }
    else changePlayer();
}

// Reinicia o jogo
function restartGame(){
    // Reinicia as variáveis e o estado do jogo para as configurações iniciais
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}

// Inicializa o jogo quando o DOM é carregado
document.addEventListener('DOMContentLoaded', initializeGame);
