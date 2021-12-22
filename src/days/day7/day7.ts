export default function calculate(input: number[]) : number {
    return findLowestFuel(input.sort((a, b) => a - b));
}

function findLowestFuel(input: number[]) : number {
    const low = 0, 
        high = input.length - 1,
        initialIncrement = 1;
    let index = low + ((high - low) >>> 1),
        value = input[index],
        fuel = calculateFuel(input, value),
        increment = 1,
        next, nextValue, nextFuel;

    while (index >= low && index <= high) {
        next = index + increment;
        nextValue = input[next];
        nextFuel = calculateFuel(input, nextValue);
        
        if (fuel <= nextFuel) {
            if (increment !== initialIncrement) break;
            increment = -increment;
        } else {
            index = next;
            value = nextValue;
            fuel = nextFuel;
        }
    }

    return fuel;
}

function calculateFuel(input: number[], value: number) : number {
    return input.reduce((sum, v) => sum + Math.abs(v - value), 0);
}