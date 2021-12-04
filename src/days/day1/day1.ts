export default class Day1 {
    static calculatePart1(numbers: number[]) : number {
        let count = 0;
        for (var i = 1; i < numbers.length; i++) {
            if (numbers[i] > numbers[i - 1]) {
                count++;
            }
        }
        return count;
    }
}