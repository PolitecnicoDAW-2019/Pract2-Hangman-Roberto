class HangmanView {
  constructor() {}

  init = () => {
    return new Promise(resolve => {
      fetch('/src/views/hangman.view.html')
        .then(response => response.text())
        .then(html => {
          const hangmanViewHTML = new DOMParser().parseFromString(html, 'text/html');
          document.getElementById('root').innerHTML = hangmanViewHTML.body.innerHTML;
        })
        .then(() => {
          this.DOM = this.cacheDOM();
          LETTERS.forEach(element => {
            const button = document.createElement('button');
            button.innerHTML = element;
            this.DOM.lettersButton[element.toLowerCase()] = button;
            document.getElementById('panelLetters').appendChild(button);
          });
          this.context = this.DOM.canvas.getContext('2d');
          resolve('View Loaded.');
        });
    });
  };

  cacheDOM = () => {
    return {
      canvas: document.getElementById('myCanvas'),
      panelLetters: document.getElementById('panelLetters'),
      playAgainButton: document.getElementById('playAgainButton'),
      lettersButton: {}
    };
  };

  bindPlayAgainButton = handler => this.DOM.playAgainButton.addEventListener('click', handler);

  bindClickEventToLettersButton = handler => Object.values(this.DOM.lettersButton).forEach(element => element.addEventListener('click', event => this.myfunction(event, handler)));
  bindKeyUpEventToLettersButton = handler => document.body.addEventListener('keyup', event => this.myfunction(event, handler));

  xd = () => this.DOM.canvas.addEventListener('click', event => console.log(`x: ${event.offsetX}, y: ${event.offsetY}`));

  myfunction = (event, handler) => {
    const result = handler(event);
    if (result && result != 'xdparte2') {
      //no ze pinta
      console.log('no se pinta');
    } else if (!result && result != null) {
      console.log('se pinta');
      this.paintHangman(this.lives());
      //ze pinta, y te robo una bia
    }
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

    console.log(`Lives: ${livesLeft}`);

    if (livesLeft != 5) {
      this.paint(paint[livesLeft]);
    } else {
      this.context.beginPath();
      this.context.arc(400, 200, 40, 0, 2 * Math.PI, false);
      this.context.fill();
      this.context.stroke();
    }
  };

  paint = coordinates => {
    this.context.beginPath();
    this.context.moveTo(coordinates.start.x, coordinates.start.y);
    this.context.lineTo(coordinates.end.x, coordinates.end.y);
    this.context.stroke();
  };
}
