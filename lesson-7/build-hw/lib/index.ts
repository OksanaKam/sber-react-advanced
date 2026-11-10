import { createElement } from 'react';

export { string } from './string.js';
export { math } from './math.js';

export const createGreeting = (name: string) => {
  return createElement('p', null, `Привет, ${name}!`);
};
