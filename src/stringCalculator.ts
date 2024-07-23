// src/stringCalculator.ts

/*@desc helper function to extract delimiter from the input string
*@param {string} input - a string representing the list of numbers, eg . 1,3,5,6,1,3,-5,4,-4
*@returns {Object} - an object containing the delimiter as well as delimeter sliced input string.
*/
function extractDelimiter(input: string): { delimiter: RegExp, numbers: string } {
    let delimiter: RegExp = /,|\n/;
    let numbers = input;

    if (input.startsWith("//")) {
        const delimiterEndIndex = input.indexOf("\n");
        delimiter = new RegExp(input.substring(2, delimiterEndIndex));
        numbers = input.substring(delimiterEndIndex + 1);
    }

    return { delimiter, numbers };
}

/*@desc A function to add or multiply an array of numbers
*@param {string} input - a string representing the list of numbers, eg . 1,3,5,6,1,3,-5,4,-4
*@returns {number}
*/
export function addOrMultiply(input: string): number {
    if (input === "") return 0;

    const { delimiter, numbers } = extractDelimiter(input);
    const numberArray = numbers.split(delimiter);

    let val = delimiter.test("[*]") ? 1 : 0;
    let negatives: number[] = [];

    for (const num of numberArray) {
        const parsedNum = parseInt(num, 10);
        if (isNaN(parsedNum)) continue;
        if (parsedNum < 0) {
            negatives.push(parsedNum);
        } else {
            val = delimiter.test("[*]") ? val * parsedNum : val + parsedNum;
        }
    }

    if (negatives.length > 0) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return val;
}
