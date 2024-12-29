// script.js
const deck = [];
const suits = ['♠', '♥', '♦', '♣'];
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

const dealerCardsDiv = document.getElementById('dealer-cards');
const playerCardsDiv = document.getElementById('player-cards');
const dealerScoreP = document.getElementById('dealer-score');
const playerScoreP = document.getElementById('player-score');
const messageP = document.getElementById('message');

function createDeck() {
    for (const suit of suits) {
        for (const value of values) {
            deck.push({ suit, value });
        }
    }
    shuffleDeck();
}

function shuffleDeck() {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}

function dealCard(hand, areaDiv) {
    const card = deck.pop();
    hand.push(card);
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.textContent = `${card.value}${card.suit}`;
    areaDiv.appendChild(cardDiv);
    return card;
}

function calculateScore(hand) {
    let score = 0;
    let aces = 0;
    for (const card of hand) {
        if (['J', 'Q', 'K'].includes(card.value)) {
            score += 10;
        } else if (card.value === 'A') {
            aces++;
            score += 11;
        } else {
            score += parseInt(card.value);
        }
    }
    while (score > 21 && aces) {
        score -= 10;
        aces--;
    }
    return score;
}

function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    playerScoreP.textContent = `Score: ${playerScore}`;
    dealerScoreP.textContent = `Score: ${dealerScore}`;
}

function checkWinner() {
    if (playerScore > 21) {
        messageP.textContent = 'You busted! Dealer wins.';
    } else if (dealerScore > 21) {
        messageP.textContent = 'Dealer busted! You win.';
    } else if (playerScore === dealerScore) {
        messageP.textContent = 'It\'s a tie!';
    } else if (playerScore > dealerScore) {
        messageP.textContent = 'You win!';
    } else {
        messageP.textContent = 'Dealer wins!';
    }
}

document.getElementById('new-game-button').addEventListener('click', () => {
    deck.length = 0;
    playerHand = [];
    dealerHand = [];
    playerScore = 0;
    dealerScore = 0;
    dealerCardsDiv.innerHTML = '';
    playerCardsDiv.innerHTML = '';
    messageP.textContent = '';
    createDeck();
    dealCard(playerHand, playerCardsDiv);
    dealCard(playerHand, playerCardsDiv);
    dealCard(dealerHand, dealerCardsDiv);
    updateScores();
});

document.getElementById('hit-button').addEventListener('click', () => {
    dealCard(playerHand, playerCardsDiv);
    updateScores();
    if (playerScore > 21) {
        messageP.textContent = 'You busted! Dealer wins.';
    }
});

document.getElementById('stand-button').addEventListener('click', () => {
    while (dealerScore < 17) {
        dealCard(dealerHand, dealerCardsDiv);
        updateScores();
    }
    checkWinner();
});

// Initialize the game
createDeck();
