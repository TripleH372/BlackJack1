// Started Code in Python
// Drew immediate code and transferred from Aphrx's (YouTuber) Python code.
// Changed a little code by being inspired from here but didn't copy anything: https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript
let kemp=0;
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let vals = ['Ace', 'King', 'Queen', 'Jack',
  'Ten', 'Nine', 'Eight', 'Seven', 'Six',
  'Five', 'Four', 'Three', 'Two'
];

let textArea = document.getElementById('textArea');
let newGameButton = document.getElementById('newGameButton');
let hitButton = document.getElementById('hitButton');
let standButton = document.getElementById('standButton');

hitButton.style.display = 'none';
standButton.style.display = 'none';

let gameStarted = false;
let isItOver = false;
let playerWon = false;
let dealerCards = [];
let playerCards = [];
let dealerScore = 0;
let playerScore = 0;
let deck = [];

newGameButton.addEventListener('click', function() {
//got inspiration from https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
  gameStarted = true;
  isItOver = false;
  playerWon = false;

  deck = creatorX();
  shuffleDeck(deck);
  dealerCards = [shiftDeck(), shiftDeck()];
  playerCards = [shiftDeck(), shiftDeck()];
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline-block';
  standButton.style.display = 'inline-block';
  showStatus();
})

function creatorX() {
  let deck = []
  for (let i = 0; i < suits.length; i++) {
    for (let j = 0; j < vals.length; j++) {
      let card = {
        suit: suits[i],
        value: vals[j]
      }
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapper = Math.floor(Math.random() *deck.length);
    let tmp = deck[swapper];
    deck[swapper] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  playerCards.push(shiftDeck());
  checkDone();
  showStatus();
});

standButton.addEventListener('click', function(){
  isItOver = true;
  checkDone();
  showStatus();
});

function checkDone(){
  uss();
  
  if(isItOver){
    while(dealerScore<playerScore &&
          playerScore <=21 &&
          dealerScore <=21){
            dealerCards.push(shiftDeck());
            uss();
    }
  }
    
    if(playerScore>21){
      playerWon=false;
      isItOver = true;
    }
    
    else if(dealerScore>21){
      playerWon = true;
      isItOver = true;
    }
    
    else if(isItOver){
      if(playerScore>dealerScore){
        playerWon = true;
      }
      else{
        playerWon = false;
      }
    }
}

function getCardString(card) {
  let n=[card.value, card.suit];
  return n.join(" of ");
}
function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10; 
  }
}
function showStatus()
{
  if(gameStarted==false)
  {
    textArea.innerText = 'Welcome to Blackjack!';
    return; 
  }
  
  let dealerCardString = '';
  for(let i=0; i<dealerCards.length; i++)
  {
    dealerCardString =dealerCardString+ getCardString(dealerCards[i]) + '\n';
  }
  let playerCardString='';
  for(let i=0; i<playerCards.length; i++)
  {
    playerCardString =playerCardString+ getCardString(playerCards[i]) + '\n';
  }
  
  uss();
  
  textArea.innerText = 'Dealer :\n' + dealerCardString + '(score: ' + dealerScore + ')\n\n' +
                        
                        'Player :\n' + playerCardString + 
                        '(score: ' + playerScore + ')\n\n';
  let string1=textArea.innerText;
                        
  if(isItOver){
    if(playerScore==dealerScore) textArea.innerText=string1+"Push!";
    else{if(playerWon)
    {
      textArea.innerText=string1+"You won!";
    }
    else{
      textArea.innerText=string1+"You lost!";
    }}
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    standButton.style.display = 'none';
    
  }
}

function gs(a){
  let score = 0;
  let aceChecker = false;
  for(let i=0; i<a.length; i++){
    let card = a[i];
    score=score+ getCardNumericValue(card);
    if(card.value == 'Ace'){
      aceChecker = true;
    }
    
    
    //Playing this game through, I seem to have mathematical issues whenever cards are added when an Ace is in play.
  }
  if(aceChecker && score+10<=21) return score+10;
  else return score; 
}

function uss(){
  dealerScore = gs(dealerCards);
  playerScore = gs(playerCards); 
}


function shiftDeck() {
  return deck.shift();
}
