class HangmanController {
  constructor(_view, _service) {
    this.view = _view;
    this.service = _service;

    this.playAgainButton();
    this.player = new Player('Roberto');
    this.alreadyPressedLetters = [];
    this.view.lives = this.handlerControlLive;

    this.view.bindPlayAgainButton(this.playAgainButton);
    this.view.bindClickEventToLettersButton(this.handleCheckLetter);
    this.view.bindKeyUpEventToLettersButton(this.handleCheckLetter);

    this.view.xd();
  }

  playAgainButton = () => {
    this.getNewWord();
  };

  getNewWord = () => (this.word = words[Math.floor(Math.random() * words.length)]);

  getLetterFromEvent = event => {
    if (event.type === 'keyup') {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        return event.key.toLowerCase();
      }
      return 'xd';
    }
    return event.target.innerHTML.toLowerCase();
  };

  handleCheckLetter = event => {
    const letter = this.getLetterFromEvent(event);
    if (letter != 'xd' && !this.alreadyPressedLetters.includes(letter)) {
      this.alreadyPressedLetters.push(letter);
      this.view.DOM.lettersButton[letter].disabled = true;
      return this.service.checkLetterInWord(letter, this.word);
    }
    return 'xdparte2';
  };

  handlerControlLive = () => (this.player.lives = this.service.controlLive(this.player.lives));

  loadJSON = () => {};
}
