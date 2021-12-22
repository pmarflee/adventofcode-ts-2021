import calculate from '../days/day7/day7'

const input = [16,1,2,0,4,2,7,1,2,14];

test('Test Part 1', () => {
    expect(calculate(input)).toBe(37);
});