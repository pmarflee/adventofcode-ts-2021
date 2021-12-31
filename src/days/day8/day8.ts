export default function calculate(input: string[]) : number {
    const lengths = [2, 3, 4, 7];
    return parse(input).reduce((acc, entry) => acc + entry.outputValue.filter(v => lengths.includes(v.length)).length, 0);
}


function parse(input: string[]) : Entry[] {
    const regexp = /[a-z]+/g;
    return input.map(line => {
        const values = [...line.matchAll(regexp)].flatMap(e => e[0]);
        return { patterns: values.slice(0, 10), outputValue: values.slice(10) };
    });
}

interface Entry {
    patterns: string[];
    outputValue: string[]
}