class HangmanController {
  constructor(_view, _service) {
    this.view = _view;
    this.service = _service;

    this.service.readWordJson('/src/data/words.json').then(json => {
      this.jsonFile = json;
      this.word = new Word(this.service.getNewWord(this.jsonFile));
      this.view.word = this.word;
      this.view.paintWord(this.word.progress);
      this.player = new Player('Roberto');

      this.view.lives = this.handlerControlLive;
      this.view.getWinStreak = this.handlerWinStreak;

      this.view.bindPlayAgainButton(this.playAgainButton);
      this.view.bindClickEventToLettersButton(this.handleCheckLetter);
      this.view.bindKeyUpEventToLettersButton(this.handleCheckLetter);
    });
  }

  /*
  TODO LIST
  - If player died, don't allow him to press keys
  - Refactor and improve code
  */

  playAgainButton = () => {
    this.word = new Word(this.service.getNewWord(this.jsonFile));
    this.view.word = this.word;
    this.view.paintWord(this.word.progress);
    this.player.lives = 10;
    this.player.lettersHistory = [];
  };

  handleCheckLetter = event => {
    const letter = this.view.getLetterFromEvent(event);
    if (letter != null && !this.player.lettersHistory.includes(letter)) {
      this.player.lettersHistory.push(letter);
      this.view.DOM.lettersButton[letter].disabled = true;
      return this.service.checkLetterInWord(letter, this.word.word);
    }
    alert(`You already pressed the letter ${letter.toUpperCase()}!`); //TODO Improve this
    return null;
  };

  handlerControlLive = () => (this.player.lives = this.service.controlLive(this.player.lives));
  handlerWinStreak = correct => (this.player.winStreak = this.service.controlWinStreak(this.player.winStreak, correct));
}
