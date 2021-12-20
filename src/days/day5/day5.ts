import { parseAsInt } from '../../util'

export class Day5 {
    public static parse(input: string[]) : LineSegment[] {
        const regexp = /(\d+),(\d+)\s->\s(\d+),(\d+)/g;
        return input.map(line => {
            const matches = [...line.matchAll(regexp)][0];
            return new LineSegment(
               parseAsInt(matches[1]),
               parseAsInt(matches[2]),
               parseAsInt(matches[3]),
               parseAsInt(matches[4]));
        });
    }

    public static calculatePart1(input: string[]) : number {
        return [...Day5.parse(input)
            .reduce((map, segment) => {
                return segment.path
                    .reduce((map, location) => {
                        const key = `${location[0]},${location[1]}`,
                            value = map.get(key) ?? 0;
                        map.set(key, value + 1);
                        return map;
                    }, map);
            }, new Map<string, number>())
            .values()]
            .filter(value => value > 1)
            .length;
    }
}

export class LineSegment {
    constructor(
        readonly x1: number, 
        readonly y1: number, 
        readonly x2: number,
        readonly y2: number) {}

    get isDiagonal() : boolean {
        return this.x1 !== this.x2 && this.y1 !== this.y2;
    }

    get path() : [number, number][] {
        const locations: [number, number][] = [];
        if (!this.isDiagonal) {
            if (this.x1 === this.x2) {
                const yStart = this.y1 > this.y2 ? this.y2 : this.y1,
                    yEnd = this.y1 > this.y2 ? this.y1 : this.y2;
                for (let y = yStart; y <= yEnd; y++) {
                    locations.push([this.x1, y]);
                }
            } else {
                const xStart = this.x1 > this.x2 ? this.x2 : this.x1,
                    xEnd = this.x1 > this.x2 ? this.x1 : this.x2;
                for (let x = xStart; x <= xEnd; x++) {
                    locations.push([x, this.y1]);
                }
            }
        }
        return locations;
    }
}