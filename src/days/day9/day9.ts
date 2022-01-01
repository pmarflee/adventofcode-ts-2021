import { parseAsInt } from '../../util'

function parse(input: string[]) : number[][] {
    return input.map(line => line.split('').map(parseAsInt));
}

const offsets : [number, number][] = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
];

function getAdjacentValues(heightMap: number[][], row: number, column: number) : number[] {
    return offsets
        .map(([offsetY, offsetX]) => [row + offsetY, column + offsetX])
        .filter(([row, column]) => row >= 0 && row < heightMap.length && column >= 0 && column < heightMap[row].length)
        .map(([row, column]) => heightMap[row][column]);
}

function calculatePart1(heightMap: number[][], row: number, column: number, current: number, sum: number) : number {
    return getAdjacentValues(heightMap, row, column).every(value => value > current)
        ? sum + current + 1
        : sum;
}

const parts = [ calculatePart1 ];

export default function calculate(input: string[], part: number) : number {
    const heightMap = parse(input),
        calculate = parts[part - 1];
    let sum = 0;
    
    for (let row = 0; row < heightMap.length; row++) {
        for (let column = 0; column < heightMap[row].length; column++) {
            const current = heightMap[row][column];
            sum = calculate(heightMap, row, column, current, sum);
        }
    }

    return sum;
}