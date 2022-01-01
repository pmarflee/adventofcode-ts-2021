import { parseAsInt } from '../../util'

const digitSegments = [
    [0,1,2,4,5,6],
    [2,5],
    [0,2,3,4,6],
    [0,2,3,5,6],
    [1,2,3,5],
    [0,1,3,5,6],
    [0,1,3,4,5,6],
    [0,2,5],
    [0,1,2,3,4,5,6],
    [0,1,2,3,5,6]
];

function findPermutations (input: string) : string[] {
    if (!!input.length && input.length < 2) {
        return [ input ];
    }

    const permutations : string[] = [];

    for (let i = 0; i < input.length; i++) {
        const char = input[i];

        if (input.indexOf(char) != i) continue;

        const remainder = input.slice(0, i) + input.slice(i + 1, input.length)

        for (const permutation of findPermutations(remainder)){
            permutations.push(char + permutation);
        }
    }

    return permutations;
}

function areEqual(array1: string[], array2: string[]) : boolean {
    for (let i = 0; i < array1.length; i++) {
        let found = false;
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                found = true;
                break;
            }
        }
        if (!found) return false;
    }
    return true;
}

function parse(input: string[]) : Entry[] {
    return input.map(line => {
        const parts = line.split('|'),
            sort = (str: string) => [...str].sort().join('');
        return { 
            patterns: parts[0].trimEnd().split(' ').map(sort), 
            outputValue: parts[1].trimStart().split(' ').map(sort) };
    });
}

function part1(entries: Entry[]) : number {
    const lengths = [2, 3, 4, 7];
    return entries.reduce((acc, entry) => acc + entry.outputValue.filter(v => lengths.includes(v.length)).length, 0);
}

function part2(entries: Entry[]) : number {
    const permutations = findPermutations('abcdefg');
    let sum = 0;
    for (const entry of entries) {
        for (const permutation of permutations) {
            const digits = digitSegments.map(s => [...permutation].filter((_, i) => s.includes(i)).sort().join(''));
            if (areEqual(digits, entry.patterns)) {
                sum += parseAsInt(entry.outputValue.reduce((acc, v) => acc + digits.indexOf(v).toString(10), ''));
            }
        }
    }
    return sum;
}

const parts = [ part1, part2 ];

export default function calculate(input: string[], part: number) : number {
    return parts[part - 1](parse(input));
}

interface Entry {
    patterns: string[];
    outputValue: string[]
}