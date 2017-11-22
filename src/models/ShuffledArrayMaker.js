const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
const makeShuffledDeck = (length) => {
const firstHalf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2);

const secondHalf = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-+'
    .split('').slice(0, length / 2);

return shuffleArray(firstHalf.concat(secondHalf));
}

export default makeShuffledDeck;