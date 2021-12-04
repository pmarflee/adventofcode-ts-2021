import { readFileSync } from 'fs'

export function readNumbers(path: string) : number[] {
    return readFileSync(path).toString("utf-8").split("\n").map((s: string) => parseInt(s, 10));
}