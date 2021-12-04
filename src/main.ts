import * as Days from './days/index'
import { readNumbers } from './util'

export function runAllDays()  {
  day1();
}

function day1() {
  let numbers = readNumbers('./input/day1.txt');
  execute(1, 1, () => Days.Day1.calculatePart1(numbers));
  execute(1, 2, () => Days.Day1.calculatePart2(numbers));
}

function execute(day: number, part: number, fn: () => number) {
  let startTime = performance.now(),
      result = fn(),
      endTime = performance.now();

  console.log(`Day ${day} Part ${part}: ${result} (${(endTime - startTime).toFixed(3)}ms)`);
}
