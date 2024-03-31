import { expect, test } from 'vitest';
import { sum } from './sum';

test('adds 2 + 2 equals 4', () => {
  expect(sum(2, 2)).equal(4);
});
