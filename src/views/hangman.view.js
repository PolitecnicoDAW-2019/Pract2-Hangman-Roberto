class HangmanView {
  constructor() {}

  init = () => {
    return new Promise((resolve, reject) => {
      fetch('/src/views/hangman.view.html')
        .then(response => response.text())
        .then(html => {
          const hangmanViewHTML = new DOMParser().parseFromString(html, 'text/html');
          document.getElementById('root').innerHTML = hangmanViewHTML.body.innerHTML;
        })
        .then(() => {
          this.DOM = this.cacheDOM();
          letters.forEach(element => (this.DOM.panelLetters.appendChild(document.createElement('button')).innerHTML = element));
          resolve('View Loaded.');
        });
    });
  };

  cacheDOM = () => {
    return {
      canvas: document.getElementById('myCanvas'),
      panelLetters: document.getElementById('panelLetters'),
      playAgainButton: document.getElementById('playAgainButton')
    };
  };

  bindPlayAgainButton = handler => this.DOM.playAgainButton.addEventListener('click', handler);

  paintCanvas = errors => {
    // line
    this.context.beginPath();
    this.context.moveTo(this.lastMousePositions.x, this.lastMousePositions.y);
    this.context.lineTo(event.offsetX, event.offsetY);
    this.context.stroke();
    this.lastMousePositions = { x: event.offsetX, y: event.offsetY };

    //circle
    const radius = 20;
    this.context.beginPath();
    this.context.arc(event.offsetX, event.offsetY, radius, 0, 2 * Math.PI, false);
    this.context.fill();
    this.context.stroke();
  };
}
