class HangedService {
  checkLetterInWord = (letter, word) => Array.from(word).includes(letter);
  controlLive = live => live - 1;
  controlWinStreak = (winStreak, correct) => (correct ? winStreak + 1 : (winStreak = 0));
  getNewWord = json => {
    const word = json[Math.floor(Math.random() * json.length)];
    json.splice(json.indexOf(word), 1);
    return word;
  };
  readWordJson = jsonFilePath => {
    return fetch(jsonFilePath).then(response => response.json());
  };
}
