class Word {
  constructor(string) {
    this.word = string;
    this.progress = new Array(string.length).fill('_');
  }

  checkIfFinished = () => this.word === this.progress.join('');
  updateProgress = letter => {
    this.progress = this.progress.map((current, index) => (this.word.substring(index, index + 1) === letter ? letter : current));
  };
}
