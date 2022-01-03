import { EventEmitter } from 'events'
import { parseAsInt } from '../../util'

class Grid extends EventEmitter {
    private readonly locations: Octopus[][];
    private readonly offsets: [number, number][] = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1]
    ];
    private readonly height: number;
    private readonly width: number;
    private _flashes = 0;

    constructor(energyValues: number[][]) {
        super();
        this.setMaxListeners(energyValues.reduce((sum, line) => sum + line.length, 0));
        this.locations = this.createOctopuses(energyValues);
        this.height = energyValues.length;
        this.width = energyValues[0].length;
    }

    public step() {
        for (const octopus of this.octopuses()) {
            octopus.increaseEnergy();
        }
        this.emit('stepComplete');
    }

    public get flashes() {
        return this._flashes;
    }

    public get energyValues() : number[][] {
        return this.locations.map(line => line.map(o => o.energy));
    }

    public get isSynchronized() : boolean {
        for (const octopus of this.octopuses()) {
            if (octopus.energy !== 0) {
                return false;
            }
        }
        return true;
    }

    private createOctopuses(energyValues: number[][]) : Octopus[][] {
        return energyValues.map((line, i) => line.map((value, j) => {
            const octopus = new Octopus(j, i, value, this);
            octopus.on('flash', (o: Octopus) => this.onFlash(o));
            return octopus;
        }));
    }

    private onFlash(octopus: Octopus) {
        this._flashes++;
        for (const adj of this.adjacentOctopuses(octopus)) {
            adj.increaseEnergy();
        }
    }

    private *octopuses() : IterableIterator<Octopus> {
        for (const row of this.locations) {
            for (const octopus of row) {
                yield octopus;
            }
        }
    }

    private *adjacentOctopuses(octopus: Octopus) : IterableIterator<Octopus> {
        for (const [offsetY, offsetX] of this.offsets) {
            const x = octopus.x + offsetX, y = octopus.y + offsetY;
            if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                yield this.locations[y][x];
            }
        }
    }
}

class Octopus extends EventEmitter {
    private _energy = 0;
    private hasFlashed = false;

    constructor(public readonly x: number, public readonly y: number, energy: number, grid: Grid) {
        super();
        this._energy = energy;

        grid.on('stepComplete', () => {
            if (this.hasFlashed) {
                this.hasFlashed = false;
                this._energy = 0;
            }
        })
    }

    public get energy() {
        return this._energy;
    }

    public increaseEnergy() : void {
        this._energy++;
        if (this._energy > 9 && !this.hasFlashed) {
            this.flash();
        }
    }

    private flash() : void {
        this.hasFlashed = true;
        this.emit('flash', this);
    }
}

function calculatePart1(grid: Grid) : number {
    logState(0, grid);

    for (let i = 1; i <= 100; i++) {
        grid.step();
        logState(i, grid)
    }

    return grid.flashes;
}

function calculatePart2(grid: Grid) : number {
    let step = 0;

    do {
        grid.step();
        step++;
    } while (!grid.isSynchronized);

    return step;
}

export default function calculate(input: string[], part: number) : number {
    const energyValues = input.map(line => line.split('').map(parseAsInt)),
        grid = new Grid(energyValues);

    switch (part) {
        case 1:
            return calculatePart1(grid);
        case 2:
            return calculatePart2(grid);
        default:
            throw new Error('Invalid part. Should be 1 or 2');
    }
}

function logState(step: number, grid: Grid) : void {
    if (!shouldLog) return;
    const state = grid.energyValues
        .map(line => line.join(''))
        .join('\n');
    console.log(state, step)
}

const shouldLog = false;