export default class Day2 {
    public static calculatePart1(input: string[]) : number {
        const reducer = (state: Position, i: Instruction) : Position =>
        {
            switch (i.direction) {
                case Direction.Forward:
                    return { horizontal: state.horizontal + i.distance, depth: state.depth };
                case Direction.Down:
                    return { horizontal: state.horizontal, depth: state.depth + i.distance };
                case Direction.Up:
                    return { horizontal: state.horizontal, depth: state.depth - i.distance };
            }
        },
        position = input
            .map(Day2.parse)
            .reduce(reducer, { horizontal: 0, depth: 0});

        return position.horizontal * position.depth;
    }

    private static parse(input: string) : Instruction {
        const parts = input.split(' ');
        return {
            direction: parts[0] as Direction,
            distance: parseInt(parts[1], 10)
        };
    }
}

enum Direction {
    Forward = "forward",
    Down = "down",
    Up = "up"
}

interface Instruction {
    direction: Direction;
    distance: number;
}

interface Position {
    horizontal: number;
    depth: number;
}