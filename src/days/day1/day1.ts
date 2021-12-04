export default class Day1 {
    public static calculatePart1(numbers: number[]) : number {
        return Day1.countIncrements(numbers);
    }

    public static calculatePart2(numbers: number[]) : number {
        return Day1.countIncrements(Day1.windows(3, numbers).map((w: number[]) => w.reduce((acc, n) => acc + n, 0)));
    }

    private static countIncrements(numbers: number[]) : number {
        return Day1.windows(2, numbers).filter((w: number[]) => w[1] > w[0]).length;
    }

    private static windows(length: number, numbers: number[]) : number[][] {
        return numbers.flatMap((_, i) =>
            i <= numbers.length - length
            ? [numbers.slice(i, i + length)]
            : []);
    }
}