import calculate from '../days/day11/day11'
import { readLines } from '../util'

const input = readLines('src/tests/day11.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input, 1)).toBe(1656);
});

test('Test Part 2', () => {
    expect(calculate(input, 2)).toBe(195);
});