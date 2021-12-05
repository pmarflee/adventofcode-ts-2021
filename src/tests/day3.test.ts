import Day from '../days/day3/day3'

const numbers = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010"
];

test('Test Part 1', () => {
    expect(Day.calculatePart1(numbers)).toBe(198);
});

test('Test Part 2', () => {
    expect(Day.calculatePart2(numbers)).toBe(230);
});