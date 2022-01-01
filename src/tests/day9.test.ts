import calculate from '../days/day9/day9'
import { readLines } from '../util'

const input = readLines('src/tests/day9.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input, 1)).toBe(15);
});

test('Test Part 2', () => {
    expect(calculate(input, 2)).toBe(1134);
});