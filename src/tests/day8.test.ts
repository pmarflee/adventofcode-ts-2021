import calculate from '../days/day8/day8'
import { readLines } from '../util'

const input = readLines('src/tests/day8.test.input.txt');

test('Test Part 1', () => {
    expect(calculate(input, 1)).toBe(26);
});

test('Test Part 2', () => {
    expect(calculate(input, 2)).toBe(61229);
});

test('Test Part 2 (1)', () => {
    expect(calculate(['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'], 2)).toBe(5353);
});