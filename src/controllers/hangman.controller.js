class HangmanController {
  constructor(_view) {
    this.view = _view;
    this.getNewWord();

    this.view.bindPlayAgainButton(this.getNewWord);
  }

  getNewWord = () => (this.word = words[Math.floor(Math.random() * words.length)]);
}
