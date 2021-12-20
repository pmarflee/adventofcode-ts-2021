import { Day5 as Day, LineSegment } from '../days/day5/day5'
import { readLines } from '../util'

const input = readLines('src/tests/day5.test.input.txt');

const expected : LineSegment[] = [
    new LineSegment(0, 9, 5, 9),
    new LineSegment(8, 0, 0, 8),
    new LineSegment(9, 4, 3, 4),
    new LineSegment(2, 2, 2, 1),
    new LineSegment(7, 0, 7, 4),
    new LineSegment(6, 4, 2, 0),
    new LineSegment(0, 9, 2, 9),
    new LineSegment(3, 4, 1, 4),
    new LineSegment(0, 0, 8, 8),
    new LineSegment(5, 5, 8, 2) ];

test('Test Parse Line Segments', () => {
    expect(Day.parse(input)).toEqual(expected);
});

test('Test Part 1', () => {
    expect(Day.calculatePart1(input)).toBe(5);
})