import rotate2d from '../rotate2d';

describe('rotate2d', () => {
  const input = [
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
    expect(rotate2d(input, 0)).toEqual(input);
  });

  it('rotates by 90 degrees', () => {
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

    expect(rotate2d(input, 1)).toEqual(expected);
    expect(rotate2d(input, 5)).toEqual(expected);
  });

  it('rotates by 180 degrees', () => {
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

    expect(rotate2d(input, 2)).toEqual(expected);
    expect(rotate2d(input, 6)).toEqual(expected);
  });

  it('rotates by 270 degrees', () => {
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

    expect(rotate2d(input, 3)).toEqual(expected);
    expect(rotate2d(input, 7)).toEqual(expected);
  });
});
