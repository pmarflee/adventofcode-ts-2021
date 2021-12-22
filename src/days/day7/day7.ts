export default function calculate(input: number[], part: number) : number {
    input.sort((a, b) => a - b);
    const low = 0, 
        high = input.length - 1,
        mid = low + ((high - low) >>> 1),
        initialIncrement = 1;
    let index = mid,
        value = input[index],
        fuel = calculateFuel(input, value, part),
        increment = 1,
        nextValue, nextFuel;

    while (index >= low && index <= high) {
        nextValue = value + increment;
        nextFuel = calculateFuel(input, nextValue, part);

        if (fuel <= nextFuel) {
            if (index != mid || increment !== initialIncrement) break;
            increment = -increment;
        } else {
            index += increment;
            value = nextValue;
            fuel = nextFuel;
        }
    }

    return fuel;
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