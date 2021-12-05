export default class Day3 {
    public static calculatePart1(input: string[]) : number {
        const binaries = input.map(Day3.parse),
              counts = binaries
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

    public static calculatePart2(input: string[]) : number {
        const binaries = input.map(Day3.parse),
              oxygen = Day3.calculateRating(binaries, (count, length) => count >= length - count),
              co2 = Day3.calculateRating(binaries, (count, length) => count < length - count);
        return oxygen * co2;
    }

    private static calculateRating(
        binaries: boolean[][], 
        filterBy: (count: number, items: number) => boolean) : number {
            const range = (n: number) => Array.from({length: n}, (_, key) => key),
                  binary = range(binaries[0].length).reduce((acc, i) => {
                    if (acc.length === 1) return acc;
                    const count = acc.filter(binary => binary[i] === true).length,
                          valueToFilterBy = filterBy(count, acc.length);
                    return acc.filter(value => value[i] === valueToFilterBy);
                }, binaries)[0];

            return Day3.toDecimal(binary);
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