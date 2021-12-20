import * as Days from './days/index'
import { readNumbers, readLines } from './util'

export function runAllDays() : void  {
  day1();
  day2();
  day3();
  day4();
}

function day1() {
  const numbers = readNumbers('./input/day1.txt');
  execute(1, 1, () => Days.Day1.calculatePart1(numbers));
  execute(1, 2, () => Days.Day1.calculatePart2(numbers));
}

function day2() {
  const input = readLines('./input/day2.txt');
  execute(2, 1, () => Days.Day2.calculatePart1(input));
  execute(2, 2, () => Days.Day2.calculatePart2(input));
}

function day3() {
  const input = readLines('./input/day3.txt');
  execute(3, 1, () => Days.Day3.calculatePart1(input));
  execute(3, 2, () => Days.Day3.calculatePart2(input));
}

function day4() {
  const input = readLines('./input/day4.txt');
  execute(4, 1, () => Days.Day4.calculatePart1(input));
  execute(4, 2, () => Days.Day4.calculatePart2(input));
}

function execute(day: number, part: number, fn: () => number) {
  const startTime = performance.now(),
        result = fn(),
        endTime = performance.now();

  console.log(`Day ${day} Part ${part}: ${result} (${(endTime - startTime).toFixed(3)}ms)`);
}
