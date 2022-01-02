interface Brackets {
    open: string;
    close: string;
    scoreInvalid: number;
    scoreIncomplete: number;
}

class State {
    private _isValid = true;
    private readonly _stack: string[] = [];
    private _score = 0;
    private _message = '';

    static readonly brackets: Brackets[] = [
        { open: '(', close: ')', scoreInvalid: 3, scoreIncomplete: 1 },
        { open: '[', close: ']', scoreInvalid: 57, scoreIncomplete: 2 },
        { open: '{', close: '}', scoreInvalid: 1197, scoreIncomplete: 3 },
        { open: '<', close: '>', scoreInvalid: 25137, scoreIncomplete: 4 }
    ];

    public get score() : number {
        if (!this._isValid) {
            return this._score;
        } else if (!this.isComplete) {
            return this.scoreIncomplete();
        } else {
            return 0;
        }
    }

    public get isValid() : boolean {
        return this._isValid;
    }

    public get isComplete() : boolean {
        return this._stack.length === 0;
    }

    public get message() : string {
        return this._message;
    }

    private push(bracket: string) : void {
        this._stack.push(bracket);
    }

    private peek() : string {
        return this._stack.slice(-1)[0];
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
        if (this.isValid) {
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
        }
        
        return this;
    }

    private validateClosingBracket(bracket: string) : void {
        const previous = this.peek(),
            match = this.matchClosingBracket(bracket);
        if (match.open === previous) {
            this.pop();
        } else {
            this.markInvalid(
                this.matchOpeningBracket(previous).close, 
                bracket, 
                match.scoreInvalid);
        }
    }

    private scoreIncomplete() : number {
        return this._stack.reduceRight((score, bracket) => {
            const match = State.brackets.find(b => b.open === bracket),
                newScore = match !== undefined
                    ? match.scoreIncomplete
                    : 0;
            return score * 5 + newScore;
        }, 0);
    }

    private matchOpeningBracket(bracket: string) : Brackets {
        const match = State.brackets.find(b => b.open === bracket);
        if (match === undefined) {
            throw new Error(`Unable to match bracket '${bracket}'`);
        }
        return match;
    }

    private matchClosingBracket(bracket: string) : Brackets {
        const match = State.brackets.find(b => b.close === bracket);
        if (match === undefined) {
            throw new Error(`Unable to match bracket '${bracket}'`);
        }
        return match;
    }
}

interface PartScorer {
    canHandle(state: State) : boolean;
    score(states: State[]) : number;
}

class Part1Scorer implements PartScorer {
    canHandle(state: State): boolean {
        return !state.isValid;
    }
    score(states: State[]): number {
        return states.reduce((sum, state) => sum + state.score, 0);
    }
    
}

class Part2Scorer implements PartScorer {
    canHandle(state: State): boolean {
        return state.isValid && !state.isComplete;
    }
    score(states: State[]): number {
        const scores = states.map(state => state.score).sort((a, b) => a - b);
        return scores[(scores.length - 1) / 2];
    }
}

function process(line: string) : State {
    return line.split('')
        .reduce((state, bracket) => state.processInput(bracket), new State())
}

function getScorer(part: number) : PartScorer {
    switch (part) {
        case 1:
            return new Part1Scorer();
        case 2:
            return new Part2Scorer();
        default:
            throw new Error('Invalid part number. Should be 1 or 2.');
    }
}

export default function calculate(input: string[], part: number) : number {
    const scorer = getScorer(part),
        scores = input.map(process).filter(scorer.canHandle);

    return scorer.score(scores);
}