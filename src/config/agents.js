export const RED_AGENT = 'red_agent';
export const BLUE_AGENT = 'blue_agent';
export const BYSTANDER = 'bystander';
export const ASSASSIN = 'assassin';
export default [
  ASSASSIN,
  ...Array.from(Array(7), () => BYSTANDER),
  ...Array.from(Array(8), () => RED_AGENT),
  ...Array.from(Array(8), () => BLUE_AGENT),
];
