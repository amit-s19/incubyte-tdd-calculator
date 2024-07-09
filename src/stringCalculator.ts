// src/stringCalculator.ts

export function add(numbers: string): number {
    if (numbers === "") return 0;

    const numberArray = numbers.split(',');
    let sum = 0;

    for (const num of numberArray) {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) continue;
        sum += parsedNum;
    }

    return sum;
}
