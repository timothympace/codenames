/**
 * Rotates a 1d array in a 2d array space. The input array length must be
 * a perfect square.
 * @param input
 * @param rotations
 * @returns {[]|Array<T>}
 */
export default function rotate2d(input, rotations) {
  rotations %= 4;

  if (rotations === 0) {
    return input;
  }

  const index2d = (i, j) => 5 * i + j;
  const rot90 = (i, j) => 5 * j - i + 4;
  const rot180 = (i, j) => input.length - 1 - index2d(i, j);
  const rot270 = (i, j) => input.length - 1 - rot90(i, j);

  const rotated = [];
  const rotFn = [null, rot90, rot180, rot270][rotations];

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      rotated[rotFn(i, j)] = input[index2d(i, j)];
    }
  }

  return rotated;
}
