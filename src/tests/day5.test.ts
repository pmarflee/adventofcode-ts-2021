import { Day5 as Day, LineSegment } from '../days/day5/day5'
import { readLines } from '../util'

const input = readLines('src/tests/day5.test.input.txt');

const expected : LineSegment[] = [
    { x1: 0, y1: 9, x2: 5, y2: 9 },
    { x1: 8, y1: 0, x2: 0, y2: 8 },
    { x1: 9, y1: 4, x2: 3, y2: 4 },
    { x1: 2, y1: 2, x2: 2, y2: 1 },
    { x1: 7, y1: 0, x2: 7, y2: 4 },
    { x1: 6, y1: 4, x2: 2, y2: 0 },
    { x1: 0, y1: 9, x2: 2, y2: 9 },
    { x1: 3, y1: 4, x2: 1, y2: 4 },
    { x1: 0, y1: 0, x2: 8, y2: 8 },
    { x1: 5, y1: 5, x2: 8, y2: 2 }
];

test('Test Parse Line Segments', () => {
    expect(Day.parse(input)).toEqual(expected);
});