class HangedView {
  constructor() {
    fetch('/src/views/hanged.view.html')
      .then(response => response.text())
      .then(html => {
        const hangedViewHTML = new DOMParser().parseFromString(html, 'text/html');
        document.getElementById('root').innerHTML = hangedViewHTML.body.innerHTML;
      })
      .then(() => {
        this.dom = this.cacheDom();
        letters.forEach(element => (this.dom.panelLetters.appendChild(document.createElement('button')).innerHTML = element));
      });
  }

  cacheDom = () => {
    return {
      canvas: document.getElementById('myCanvas'),
      panelLetters: document.getElementById('panelLetters')
    };
  };

  loadWord = () => {};
}
