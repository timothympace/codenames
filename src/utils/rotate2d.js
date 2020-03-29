/**
 * Rotates a 1d array in a 2d array space. The input array length must be
 * a perfect square.
 * @param input
 * @param rotations
 * @returns {[]|Array<T>}
 */
export default function rotate2d(input, rotations = 1) {
  const length = Math.sqrt(input.length);
  if (length % 1 !== 0) {
    throw new Error('input array is not a perfect square');
  }

  rotations %= 4;

  if (rotations === 0) {
    return input;
  }

  const index2d = (i, j) => length * i + j;
  const rot90 = (i, j) => length * j - i + (length - 1);
  const rot180 = (i, j) => input.length - 1 - index2d(i, j);
  const rot270 = (i, j) => input.length - 1 - rot90(i, j);

  const rotated = [];
  const rotFn = [null, rot90, rot180, rot270][rotations];

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      rotated[rotFn(i, j)] = input[index2d(i, j)];
    }
  }

  return rotated;
}
