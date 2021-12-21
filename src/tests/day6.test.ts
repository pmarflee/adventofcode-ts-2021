import Day6 from '../days/day6/day6'

const input = [3,4,3,1,2];

test('Test Part 1', () => {
    expect(Day6.calculate(input, 80)).toBe(5934);
});

test('Test Part 2', () => {
    expect(Day6.calculate(input, 256)).toBe(26984457539);
});