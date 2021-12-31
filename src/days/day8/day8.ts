export default function calculate(input: string[]) : number {
    const lengths = [2, 3, 4, 7];
    return parse(input).reduce((acc, entry) => acc + entry.outputValue.filter(v => lengths.includes(v.length)).length, 0);
}


function parse(input: string[]) : Entry[] {
    return input.map(line => {
        const parts = line.split('|');
        return { patterns: parts[0].split(' '), outputValue: parts[1].split(' ') };
    });
}

interface Entry {
    patterns: string[];
    outputValue: string[]
}