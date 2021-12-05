import { readFileSync } from 'fs'

export function readNumbers(path: string) : number[] {
    return readLines(path).map((s: string) => parseInt(s, 10));
}

export function readLines(path: string) : string[] {
    return readFileSync(path).toString("utf-8").split("\r\n");
}