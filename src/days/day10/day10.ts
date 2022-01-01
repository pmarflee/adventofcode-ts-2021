interface Match {
    bracket: string;
    score: number;
}

class State {
    private _isValid = true;
    private readonly _stack: string[] = [];
    private _score = 0;
    private _message = '';

    static readonly brackets = new Map<string, Match>([
        [')', { bracket: '(', score: 3 }],
        [']', { bracket: '[', score: 57 }],
        ['}', { bracket: '{', score: 1197 }],
        ['>', { bracket: '<', score: 25137 }]
    ]);

    public get score() : number {
        return this._score;
    }

    public get isValid() : boolean {
        return this._isValid;
    }

    public get message() : string {
        return this._message;
    }

    private push(bracket: string) : void {
        this._stack.push(bracket);
    }

    private peek() : string | undefined {
        const top = this._stack.slice(-1);
        return top === [] ? undefined : top[0];
    }

    private pop() : void {
        this._stack.pop();
    }

    private markInvalid(expected: string, actual: string, score: number) : void {
        this._isValid = false;
        this._score = score;
        this._message = `Expected ${expected}, but found ${actual} instead.`;
    }

    public processInput(bracket: string) : State {
        switch (bracket) {
            case '(':
            case '[':
            case '{':
            case '<':
                this.push(bracket);
                break;
            case ')':
            case ']':
            case '}':
            case '>':
                this.validateClosingBracket(bracket);
                break;
            }
        
        return this;
    }

    private validateClosingBracket(bracket: string) : void {
        const previous = this.peek();
        if (previous === undefined) {
            throw new Error('No bracket on stack');
        }
        const match = State.brackets.get(bracket);
        if (match === undefined) {
            throw new Error(`Unable to match bracket '${bracket}'`);
        }
        if (match.bracket === previous) {
            this.pop();
        } else {
            this.markInvalid(match.bracket, bracket, match.score);
        }
    }
}

function process(line: string) : number {
    return line.split('')
        .reduce((state, bracket) => state.isValid ? state.processInput(bracket) : state, new State())
        .score;
}

export default function calculate(input: string[], _part: number) : number {
    return input
        .map(process)
        .reduce((sum, score) => sum + score);
}