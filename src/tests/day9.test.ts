import calculate from '../days/day9/day9'
import { readLines } from '../util'

const input = readLines('src/tests/day9.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input)).toBe(15);
});