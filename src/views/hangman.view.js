class HangmanView {
  constructor() {}

  init = () => {
    return new Promise(resolve => {
      fetch('/src/views/hangman.view.html')
        .then(response => response.text())
        .then(html => {
          const hangmanViewHTML = new DOMParser().parseFromString(html, 'text/html');
          document.getElementById('root').innerHTML = hangmanViewHTML.body.innerHTML;
          this.DOM = this.cacheDOM();
          LETTERS.forEach(element => {
            const button = document.createElement('button');
            button.innerHTML = element;
            this.DOM.lettersButton[element.toLowerCase()] = button;
            this.DOM.panelLetters.appendChild(button);
          });
          this.context = this.DOM.canvas.getContext('2d');
          this.context.font = '100px monospace';
          this.context.textAlign = 'center';
          resolve('View Loaded.');
        });
    });
  };

  cacheDOM = () => {
    return {
      canvas: document.getElementById('myCanvas'),
      panelLetters: document.getElementById('panelLetters'),
      playAgainButton: document.getElementById('playAgainButton'),
      winStreak: document.getElementById('winStreak'),
      lettersButton: {}
    };
  };

  bindPlayAgainButton = handler =>
    this.DOM.playAgainButton.addEventListener('click', event => {
      this.clearCanvas();
      this.turnOnLettersButtons(true);
      handler();
    });

  clearCanvas = () => {
    const previousColor = this.context.fillStyle;
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.DOM.canvas.width, this.DOM.canvas.height);
    this.context.fillStyle = previousColor;
  };

  bindClickEventToLettersButton = handler => Object.values(this.DOM.lettersButton).forEach(element => element.addEventListener('click', event => this.myfunction(event, handler)));
  bindKeyUpEventToLettersButton = handler => document.body.addEventListener('keyup', event => this.myfunction(event, handler));

  getLetterFromEvent = event => {
    if (event.type === 'keyup') {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        return event.key.toLowerCase();
      }
      return null;
    }
    return event.target.innerHTML.toLowerCase();
  };

  myfunction = (event, handler) => {
    const letter = this.getLetterFromEvent(event);
    const result = handler(event);
    if (result && result != null) {
      this.word.updateProgress(letter);
      this.paintWord(this.word.progress);
      if (this.word.checkIfFinished()) {
        this.playerWin();
      }
    } else if (!result && result != null) {
      const livesLeft = this.lives();
      if (livesLeft === 0) {
        this.playerLoose();
      }
      this.paintHangman(livesLeft);
    }
  };

  playerWin = () => {
    this.context.fillText('You win!', 800, 90);
    this.turnOnLettersButtons(false);
    this.updateWinStreak(true);
    setTimeout(() => this.DOM.playAgainButton.click(), 5000);
  };

  updateWinStreak = correct => (this.DOM.winStreak.innerHTML = `Win Streak: <br> <center>${this.getWinStreak(correct)}</center>`);

  playerLoose = () => {
    this.context.fillText('You loose!', 800, 90);
    this.word.progress = this.word.word.split('');
    this.paintWord(this.word.progress);
    this.updateWinStreak(false);
    this.turnOnLettersButtons(false);
  };

  turnOnLettersButtons = on => {
    Object.values(this.DOM.lettersButton).forEach(element => (element.disabled = !on));
  };

  paintWord = wordArray => {
    this.context.fillText(wordArray.join(' '), 500, 634);
  };

  paintHangman = livesLeft => {
    const paint = {
      0: { start: { x: 450, y: 280 }, end: { x: 400, y: 280 } },
      1: { start: { x: 350, y: 280 }, end: { x: 400, y: 280 } },
      2: { start: { x: 455, y: 423 }, end: { x: 400, y: 375 } },
      3: { start: { x: 355, y: 423 }, end: { x: 400, y: 375 } },
      4: { start: { x: 400, y: 200 }, end: { x: 400, y: 375 } },
      5: 'nothing',
      6: { start: { x: 400, y: 100 }, end: { x: 400, y: 175 } },
      7: { start: { x: 125, y: 100 }, end: { x: 400, y: 100 } },
      8: { start: { x: 125, y: 500 }, end: { x: 125, y: 100 } },
      9: { start: { x: 50, y: 500 }, end: { x: 200, y: 500 } }
    };

    if (livesLeft != 5) {
      this.paintLine(paint[livesLeft]);
    } else {
      this.context.beginPath();
      this.context.arc(400, 200, 40, 0, 2 * Math.PI, false);
      this.context.fill();
      this.context.stroke();
    }
  };

  paintLine = coordinates => {
    this.context.beginPath();
    this.context.moveTo(coordinates.start.x, coordinates.start.y);
    this.context.lineTo(coordinates.end.x, coordinates.end.y);
    this.context.stroke();
  };
}
