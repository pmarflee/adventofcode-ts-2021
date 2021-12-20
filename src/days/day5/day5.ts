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

    public static calculate(input: string[], part: number) : number {
        const map = Day5.parse(input)
            .reduce((map, segment) => {
                return segment.getPath(part)
                    .reduce((map, location) => {
                        const key = `${location[0]},${location[1]}`,
                            value = map.get(key) ?? 0;
                        map.set(key, value + 1);
                        return map;
                    }, map);
            }, new Map<string, number>());
        return [...map.values()]
            .filter(value => value > 1)
            .length;
    }
}

export class LineSegment {
    private readonly isDiagonal: boolean;

    constructor(
        readonly x1: number, 
        readonly y1: number, 
        readonly x2: number,
        readonly y2: number
        ) {
            this.isDiagonal = this.x1 !== this.x2 && this.y1 !== this.y2;
        }

    getPath(part: number) : [number, number][] {
        return part === 2 || !this.isDiagonal
            ? this.getRange()
            : [];
    }

    private getRange() : [number, number][] {
        const to = (this.x1 !== this.x2
            ? Math.max(this.x1, this.x2) - Math.min(this.x1, this.x2)
            : Math.max(this.y1, this.y2) - Math.min(this.y1, this.y2)) + 1,
            parts = new Array<[number, number]>(to);
        let x = this.x1, 
            y = this.y1,
            xIncrement: number,
            yIncrement: number;
        if (this.x1 < this.x2) {
            xIncrement = 1;
        } else if (this.x1 > this.x2) {
            xIncrement = -1;
        } else {
            xIncrement = 0;
        }
        if (this.y1 < this.y2) {
            yIncrement = 1;
        } else if (this.y1 > this.y2) {
            yIncrement = -1;
        } else {
            yIncrement = 0;
        }
        for (let from = 0; from < to; from++, x+=xIncrement, y+=yIncrement) {
            parts.push([x, y]);
        }
        return parts;
    }
}