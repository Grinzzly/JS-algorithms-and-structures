const DEFAULT_BASE = 17;

class SimplePolynomialHash {
  constructor(base = DEFAULT_BASE) {
    this.base = base;
  }

  hash(word) {
    let hash = 0;
    for (let charIndex = 0; charIndex < word.length; charIndex += 1) {
      hash += word.charCodeAt(charIndex) * (this.base ** charIndex);
    }

    return hash;
  }

  roll(prevHash, prevWord, newWord) {
    let hash = prevHash;

    const prevValue = prevWord.charCodeAt(0);
    const newValue = newWord.charCodeAt(newWord.length - 1);

    hash -= prevValue;
    hash /= this.base;
    hash += newValue * (this.base ** (newWord.length - 1));

    return hash;
  }
}