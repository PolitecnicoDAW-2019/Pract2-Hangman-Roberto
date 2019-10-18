class HangedView {
    constructor() {
        fetch('/src/views/hanged.view.html')
            .then(response => response.text())
            .then(html => {
                const hangedViewHTML = new DOMParser().parseFromString(html, 'text/html');
                document.getElementById('root').innerHTML = hangedViewHTML.body.innerHTML;
            })
            .then(() => {
                this.DOM = this.cacheDOM();
                letters.forEach(element => (this.DOM.panelLetters.appendChild(document.createElement('button')).innerHTML = element));
            });
    }

    cacheDOM = () => {
        return {
            canvas: document.getElementById('myCanvas'),
            panelLetters: document.getElementById('panelLetters'),
            playAgainButton: document.getElementById('playAgainButton')
        };
    };

    bindPlayAgainButton = handler => this.DOM.playAgainButton.addEventListener('click', handler);
}