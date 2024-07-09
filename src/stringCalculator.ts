// src/stringCalculator.ts

export function add(numbers: string): number {
    if (numbers === "") return 0;

    let delimiter = /,|\n/;
    if (numbers.startsWith("//")) {
        const delimiterEndIndex = numbers.indexOf("\n");
        delimiter = new RegExp(numbers.substring(2, delimiterEndIndex));
        numbers = numbers.substring(delimiterEndIndex + 1);
    }

    const numberArray = numbers.split(delimiter);
    let sum = 0;
    let negatives: number[] = [];

    for (const num of numberArray) {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) continue;
        if (parsedNum < 0) {
            negatives.push(parsedNum);
        } else {
            sum += parsedNum;
        }
    }

    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return sum;
}
