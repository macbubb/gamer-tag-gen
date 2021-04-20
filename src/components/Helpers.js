export function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

export function getRandomFloat(min, max) {
    return chopDecimal((Math.random() * (max - min) + min),2);
}

//chops off decimal to places argument, doesn't round because not necessary with randomly generated numbers
export function chopDecimal(num,places) {
  return Math.round(num * 10**places)/10**places;
}

export function getRandomSign() {
	return Math.random() < .5 ? -1 : 1;
}