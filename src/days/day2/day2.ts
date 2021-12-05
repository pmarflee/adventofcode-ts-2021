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
        };
        
        return Day2.calculate(input, reducer, { horizontal: 0, depth: 0 });
    }

    public static calculatePart2(input: string[]) : number {
        const reducer = (state: Position, i: Instruction) : Position =>
        {
            const aim = state.aim ?? 0;

            switch (i.direction) {
                case Direction.Forward:
                    return { horizontal: state.horizontal + i.distance, 
                             depth: state.depth + (aim * i.distance), 
                             aim: aim };
                case Direction.Down:
                    return { horizontal: state.horizontal, depth: state.depth, aim: aim + i.distance };
                case Direction.Up:
                    return { horizontal: state.horizontal, depth: state.depth, aim: aim - i.distance };
            }
        };
        
        return Day2.calculate(input, reducer, { horizontal: 0, depth: 0, aim: 0 });
    }

    private static calculate(
        input: string[], 
        reducer: (state: Position, i: Instruction) => Position,
        initialState: Position) : number {
        const position = input
            .map(Day2.parse)
            .reduce(reducer, initialState);

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
    aim?: number;
}