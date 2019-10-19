class HangedService {
  checkLetterInWord = (letter, word) => Array.from(word).includes(letter);
  controlLive = live => live - 1;
}
