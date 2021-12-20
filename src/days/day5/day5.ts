import { parseAsInt } from '../../util'

export class Day5 {
    public static parse(input: string[]) : LineSegment[] {
        const regexp = /(\d+),(\d+)\s->\s(\d+),(\d+)/g;
        return input.map(line => {
            const matches = [...line.matchAll(regexp)][0];
            return {
               x1: parseAsInt(matches[1]),
               y1: parseAsInt(matches[2]),
               x2: parseAsInt(matches[3]),
               y2: parseAsInt(matches[4])
            };
        });
    }
}

export interface LineSegment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}