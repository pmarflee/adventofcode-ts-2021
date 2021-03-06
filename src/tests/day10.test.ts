import calculate from '../days/day10/day10'
import { readLines } from '../util'

const input = readLines('src/tests/day10.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input, 1)).toBe(26397);
});

test('Test Part 2', () => {
    expect(calculate(input, 2)).toBe(288957);
});