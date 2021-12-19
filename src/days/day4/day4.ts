export class Day4 {
    public static parse(input: string[]) : Input {
        const numbers = input[0].split(',').map(s => parseInt(s, 10));
        const [boards, _] = input.slice(2)
            .filter(line => line.length > 0)
            .reduce((acc, current) => {
                const [boards, lines] = acc;
                const numbers = current.split(' ')
                    .filter(n => n != '')
                    .map(n => parseInt(n, 10));
                lines.push(numbers);
                if (lines.length === 5) {
                    boards.push(new Board(...lines));
                    return [boards, []];
                } else {
                    return [boards, lines];
                }
        }, [Array<Board>(), Array<number[]>()]);
        return { Numbers: numbers, Boards: boards };
    }
}

export class Board {
    public readonly numbers: number[][];

    constructor(...args: number[][]) {
        this.numbers = args;
    }
}

export interface Input {
    Numbers: number[];
    Boards: Board[]
}