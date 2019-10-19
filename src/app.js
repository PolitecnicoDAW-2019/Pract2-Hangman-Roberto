const hangmanView = new HangmanView();
hangmanView.init().then(response => (app = new HangmanController(hangmanView, new HangedService())));
