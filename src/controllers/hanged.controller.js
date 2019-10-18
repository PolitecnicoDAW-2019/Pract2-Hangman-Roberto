class HangedController {
    constructor(_view) {
        this.view = _view;
        this.playAgainButton();

        //this.view.bindPlayAgainButton(this.playAgainButton);
    }

    playAgainButton = () => {
        this.word = words[Math.floor(Math.random() * words.length)];
    }
}