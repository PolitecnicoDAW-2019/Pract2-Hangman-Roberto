class Word {
  constructor(string) {
    this.word = string;
    this.progress = new Array(string.length).fill('_', 0, string.length);
  }

  checkIfFinished = () => this.word === this.progress.join('');
  updateProgress = letter => {
    this.progress = this.progress.map((current, index) => {
      if (this.word.substring(index, index + 1) === letter) {
        return letter;
      }
      return current;
    });
  };
}
