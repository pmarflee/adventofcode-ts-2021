import { readFileSync } from 'fs'

export function readNumbers(path: string) : number[] {
    return readLines(path).map(parseAsInt);
}

export function readNumbersCsv(path: string) : number[] {
    return readFile(path).split(',').map(parseAsInt);
}

export function readLines(path: string) : string[] {
    return readFile(path).split(/\r?\n/);
}

export function parseAsInt(string: string) : number {
    return parseInt(string, 10);
}

function readFile(path: string) : string {
    return readFileSync(path).toString("utf-8");
}