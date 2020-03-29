import keyCards from '../keyCards';
import { ASSASSIN, BLUE_AGENT, INNOCENT_BYSTANDER, RED_AGENT } from '../constants';

describe('keyCards', () => {
  it('has 40 cards to choose from', () => {
    expect(keyCards.length).toBe(40);
  });

  it('are all 5x5', () => {
    keyCards.forEach(c => {
      expect(c.length).toBe(25);
    });
  });

  it('all have the correct distribution of agents', () => {
    keyCards.forEach(cards => {
      const cardCounts = cards.reduce((acc, card) => {
        acc[card] = (acc[card] || 0) + 1;
        return acc;
      }, {});

      expect(cardCounts[ASSASSIN]).toBe(1);
      expect(cardCounts[INNOCENT_BYSTANDER]).toBe(7);
      expect(cardCounts[RED_AGENT] + cardCounts[BLUE_AGENT]).toBe(17);
      expect(Math.abs(cardCounts[RED_AGENT] - cardCounts[BLUE_AGENT])).toBe(1);
    });
  });
});
