import rotate2d from '../rotate2d';

describe('rotate2d', () => {
  const input3x3 = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const input5x5 = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h',
    'i',
    'j',
    'k',
    'l',
    'm',
    'n',
    'o',
    'p',
    'q',
    'r',
    's',
    't',
    'u',
    'v',
    'w',
    'x',
    'y',
  ];

  it('ignores 0 rorations', () => {
    expect(rotate2d(input5x5, 0)).toEqual(input5x5);
  });

  it('rotates a 5x5 by 90 degrees', () => {
    const expected = [
      'u',
      'p',
      'k',
      'f',
      'a',
      'v',
      'q',
      'l',
      'g',
      'b',
      'w',
      'r',
      'm',
      'h',
      'c',
      'x',
      's',
      'n',
      'i',
      'd',
      'y',
      't',
      'o',
      'j',
      'e',
    ];

    expect(rotate2d(input5x5, 1)).toEqual(expected);
    expect(rotate2d(input5x5, 5)).toEqual(expected);
  });

  it('rotates a 5x5 by 180 degrees', () => {
    const expected = [
      'y',
      'x',
      'w',
      'v',
      'u',
      't',
      's',
      'r',
      'q',
      'p',
      'o',
      'n',
      'm',
      'l',
      'k',
      'j',
      'i',
      'h',
      'g',
      'f',
      'e',
      'd',
      'c',
      'b',
      'a',
    ];

    expect(rotate2d(input5x5, 2)).toEqual(expected);
    expect(rotate2d(input5x5, 6)).toEqual(expected);
  });

  it('rotates a 5x5 by 270 degrees', () => {
    const expected = [
      'e',
      'j',
      'o',
      't',
      'y',
      'd',
      'i',
      'n',
      's',
      'x',
      'c',
      'h',
      'm',
      'r',
      'w',
      'b',
      'g',
      'l',
      'q',
      'v',
      'a',
      'f',
      'k',
      'p',
      'u',
    ];

    expect(rotate2d(input5x5, 3)).toEqual(expected);
    expect(rotate2d(input5x5, 7)).toEqual(expected);
  });

  it('rotates a 3x3 by 90 degrees', () => {
    const expected = [7, 4, 1, 8, 5, 2, 9, 6, 3];
    expect(rotate2d(input3x3, 1)).toEqual(expected);
  });

  it('rotates a 3x3 by 180 degrees', () => {
    const expected = [9, 8, 7, 6, 5, 4, 3, 2, 1];
    expect(rotate2d(input3x3, 2)).toEqual(expected);
  });

  it('rotates a 3x3 by 270 degrees', () => {
    const expected = [3, 6, 9, 2, 5, 8, 1, 4, 7];
    expect(rotate2d(input3x3, 3)).toEqual(expected);
  });
});
