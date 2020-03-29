import codenameCards from '../codenameCards';

describe('codenameCards', () => {
  it('has 200 cards to choose from', () => {
    expect(codenameCards.length).toBe(200);
  });

  it('have a word on the front and back', () => {
    codenameCards.forEach(c => {
      expect('front' in c).toBe(true);
      expect('back' in c).toBe(true);
      expect(typeof c.front).toBe('string');
      expect(typeof c.back).toBe('string');
    });
  });
});
