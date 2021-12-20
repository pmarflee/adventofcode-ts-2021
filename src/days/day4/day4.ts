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

    public static calculatePart1(input: string[]) : number {
        const data = Day4.parse(input);
        for (const number of data.Numbers) {
            for (const board of data.Boards) {
                board.mark(number);
                if (board.isComplete) {
                    return board.calculateScore();
                }
            }
        }
        return 0;
    }
}

export class Board {
    private readonly numbers: number[][];
    private readonly marked: number[] = [];

    constructor(...args: number[][]) {
        this.numbers = args;
    }

    public mark(number: number) : void {
        for (const row of this.numbers) {
            for (let i = 0; i < row.length; i++) {
                if (number === row[i]) {
                    row[i] = NaN;
                    this.marked.push(number);
                }
            }
        }
    }

    public get isComplete() {
        for (const range of this.rangesToCheck()) {
            if (range.every(number => isNaN(number))) {
                return true;
            }
        }
        return false;
    }

    public calculateScore() : number {
        let sum = 0;
        for (const row of this.numbers) {
            for (const number of row) {
                if (!isNaN(number)) {
                    sum += number;
                }
            }
        }
        return sum * this.marked[this.marked.length - 1];
    }

    private *rangesToCheck() : IterableIterator<number[]> {
        for (const row of this.numbers) {
            yield row;
        }
        const indexes = [...Array(this.numbers.length).keys()];
        for (const column of indexes.map(colIndex => indexes.map(rowIndex => this.numbers[rowIndex][colIndex]))) {
            yield column;
        }
    }
}

export interface Input {
    Numbers: number[];
    Boards: Board[]
}