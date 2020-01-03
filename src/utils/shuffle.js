export default function shuffle(array) {
  const shuffled = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    // random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // swap elements array[i] and array[j]
    // we use "destructuring assignment" syntax to achieve that
    // you'll find more details about that syntax in later chapters
    // same can be written as:
    // let t = array[i]; array[i] = array[j]; array[j] = t
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};
