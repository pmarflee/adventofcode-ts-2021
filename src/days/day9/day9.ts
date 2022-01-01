import { parseAsInt } from '../../util'

function parse(input: string[]) : number[][] {
    return input.map(line => line.split('').map(parseAsInt));
}

const offsets : [number, number][] = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];

function getAdjacentValues(heightMap: number[][], row: number, column: number) : [number, number, number][] {
    return offsets
        .map(([offsetY, offsetX]) => [row + offsetY, column + offsetX])
        .filter(([row, column]) => row >= 0 && row < heightMap.length && column >= 0 && column < heightMap[row].length)
        .map(([row, column]) => [heightMap[row][column], row, column]);
}

function isLowPoint(value: number, adjacentValues: [number, number, number][]) : boolean {
    return adjacentValues.every(([v, _row, _column]) => v > value);
}

function getBasinSize(start: [number, number], heightMap: number[][]) : number {
    const queue = [ start ],
        visited = heightMap.map(line => new Array<boolean>(line.length));
    let sum = 0;

    while (queue.length > 0) {
        const point = queue.shift();
        if (point === undefined) break;
        const [row, column] = point;
        if (visited[row][column]) continue;
        const value = heightMap[row][column];
        visited[row][column] = true;
        if (value === 9) continue;
        sum++
        getAdjacentValues(heightMap, row, column)
            .forEach(([_, row1, column1]) => queue.push([row1, column1]));
    }

    return sum;
}

function calculatePart1(lowPoints: [number, number][], heightMap: number[][]) : number {
    return lowPoints.reduce((sum, [row, column]) => sum + heightMap[row][column] + 1, 0);
}

function calculatePart2(lowPoints: [number, number][], heightMap: number[][]) : number {
    return lowPoints
        .map(point => getBasinSize(point, heightMap))
        .sort((a, b) => b - a)
        .slice(0, 3)
        .reduce((sum, value) => sum * value);
}

const parts = [ calculatePart1, calculatePart2 ];

export default function calculate(input: string[], part: number) : number {
    const heightMap = parse(input),
        calculate = parts[part - 1],
        lowPoints = [] as [number, number][];
    
    for (let row = 0; row < heightMap.length; row++) {
        for (let column = 0; column < heightMap[row].length; column++) {
            const current = heightMap[row][column],
                adjacentValues = getAdjacentValues(heightMap, row, column);
            if (isLowPoint(current, adjacentValues)) {
                lowPoints.push([row, column]);
            }
        }
    }

    return calculate(lowPoints, heightMap);
}