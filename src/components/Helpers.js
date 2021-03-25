export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

export function getRandomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

export function getRandomSign() {
	return Math.random() < .5 ? -1 : 1;
}