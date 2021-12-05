import Day from '../days/day2/day2'

const instructions = [
    "forward 5",
    "down 5",
    "forward 8",
    "up 3",
    "down 8",
    "forward 2"
];

test('Test Part 1', () => {
    expect(Day.calculatePart1(instructions)).toBe(150);
});