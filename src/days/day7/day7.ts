export default function calculate(input: number[], part: number) : number {
    input.sort((a, b) => a - b);
    let low = 0, 
        high = input.length - 1;

    while (low <= high) {
        const mid = low + ((high - low) >>> 1),
            midValue = input[mid],
            midFuel = calculateFuel(input, midValue, part),
            lowerFuel = calculateFuel(input, midValue - 1, part),
            upperFuel = calculateFuel(input, midValue + 1, part);

        if (lowerFuel < midFuel) {
            high = mid - 1;
        } else if (upperFuel < midFuel) {
            low = mid + 1;
        } else return midFuel;

        if (low > high) {
            return Math.min(lowerFuel, upperFuel);
        }
    }

    throw new Error('Unable to calculate lowest fuel');
}

function calculateFuel(input: number[], value: number, part: number) : number {
    return input.reduce((sum, v) => {
        const distance = Math.abs(v - value);

        if (part === 1) return sum + distance;

        let fuel = distanceFuelLookup.get(distance);
        
        if (typeof fuel !== 'number') {
            fuel = 0;
            for (let i = 1; i <= distance; i++) {
                fuel += i;
            }
            distanceFuelLookup.set(distance, fuel);
        }

        return sum + fuel;
    }, 0);
}

const distanceFuelLookup = new Map<number, number>();