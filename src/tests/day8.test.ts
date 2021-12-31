import calculate from '../days/day8/day8'
import { readLines } from '../util'

const input = readLines('src/tests/day8.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input)).toBe(26);
});