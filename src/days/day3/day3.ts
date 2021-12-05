export default class Day3 {
    public static calculatePart1(input: string[]) : number {
        const counts = input
            .map(Day3.parse)
            .reduce((acc: number[], current: boolean[]) => {
                for (let i = 0; i < current.length; i++) {
                    if (current[i] === true) {
                        acc[i] = (acc[i] ?? 0) + 1;
                    }
                }
                return acc;
            }, new Array<number>(input[0].length)),
             gamma = counts.map(value => value > input.length - value),
             epsilon = gamma.map(value => !value);

        return Day3.toDecimal(gamma) * Day3.toDecimal(epsilon);
    }

    private static parse(input: string) : boolean[] {
        return [...input].map(value => {
            switch (value) {
                case "0":
                    return false;
                case "1":
                    return true;
                default:
                    throw new RangeError(`Invalid value '${value}': should be '0' or '1'`);
            }
        });
    }

    private static toDecimal(binary: boolean[]) : number {
        return parseInt(binary.map(value => value ? "1" : "0").join(''), 2);
    }
}