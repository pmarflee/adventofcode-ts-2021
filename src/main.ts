import * as Days from './days/index'
import { readNumbers, readNumbersCsv, readLines } from './util'

export function runAllDays() : void  {
  day1();
  day2();
  day3();
  day4();
  day5();
  day6();
  day7();
  day8();
  day9();
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

function day5() {
  const input = readLines('./input/day5.txt');
  execute(5, 1, () => Days.Day5.calculate(input, 1));
  execute(5, 2, () => Days.Day5.calculate(input, 2));
}

function day6() {
  const input = readNumbersCsv('./input/day6.txt');
  execute(6, 1, () => Days.Day6.calculate(input, 80));
  execute(6, 2, () => Days.Day6.calculate(input, 256));
}

function day7() {
  const input = readNumbersCsv('./input/day7.txt');
  execute(7, 1, () => Days.Day7(input, 1));
  execute(7, 2, () => Days.Day7(input, 2));
}

function day8() {
  const input = readLines('./input/day8.txt');
  execute(8, 1, () => Days.Day8(input, 1));
  execute(8, 2, () => Days.Day8(input, 2));
}

function day9() {
  const input = readLines('./input/day9.txt');
  execute(9, 1, () => Days.Day9(input, 1));
  execute(9, 2, () => Days.Day9(input, 2));
}

function execute(day: number, part: number, fn: () => number) {
  const startTime = performance.now(),
        result = fn(),
        endTime = performance.now();

  console.log(`Day ${day} Part ${part}: ${result} (${(endTime - startTime).toFixed(3)}ms)`);
}
