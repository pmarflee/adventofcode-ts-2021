import Day1 from '../days/day1/day1'

let numbers = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

test('Test Part 1', () => {
    expect(Day1.calculatePart1(numbers)).toBe(7);
});

test('Test Part 2', () => {
    expect(Day1.calculatePart2(numbers)).toBe(5);
});