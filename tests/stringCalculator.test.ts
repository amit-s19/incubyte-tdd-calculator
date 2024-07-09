import { add } from '../src/stringCalculator';

describe('StringCalculator', () => {
    test('should return 0 for an empty string', () => {
        expect(add("")).toBe(0);
    });

    test('should return the number itself for a single number', () => {
        expect(add("1")).toBe(1);
        expect(add("100")).toBe(100);
    });

    test('should return the sum for two numbers', () => {
        expect(add("1,5")).toBe(6);
        expect(add("10,20")).toBe(30);
    });

    test('should return the sum for multiple numbers', () => {
        expect(add("1,2,3,4,5")).toBe(15);
        expect(add("10,20,30,40,50")).toBe(150);
    });

    test('should handle new lines between numbers', () => {
        expect(add("1\n2,3")).toBe(6);
        expect(add("1\n2\n3")).toBe(6);
        expect(add("1,\n")).toBe(1); // Handle a number followed by new line and comma
    });

    test('should handle different delimiters', () => {
        expect(add("//;\n1;2")).toBe(3);
        expect(add("//|\n1|2|3")).toBe(6);
        expect(add("//sep\n1sep2")).toBe(3);
        expect(add("//[***]\n1***2***3")).toBe(6);
    });

    test('should throw an exception for negative numbers', () => {
        expect(() => add("1,-2,3,-4")).toThrow("Negative numbers not allowed: -2, -4");
        expect(() => add("-1")).toThrow("Negative numbers not allowed: -1");
    });

    test('should throw an exception with all negative numbers listed', () => {
        expect(() => add("-1,-2,-3")).toThrow("Negative numbers not allowed: -1, -2, -3");
        expect(() => add("-10,-20,-30")).toThrow("Negative numbers not allowed: -10, -20, -30");
    });

    test('should handle large amounts of numbers', () => {
        const numbers = Array.from({ length: 1000 }, (_, i) => i + 1).join(",");
        const expectedSum = (1000 * (1000 + 1)) / 2; // Sum of first 1000 natural numbers
        expect(add(numbers)).toBe(expectedSum);
    });

    test('should handle inputs with spaces and unusual formats', () => {
        expect(add(" 1, 2 , 3 ")).toBe(6);
        expect(add("  4 \n  5, 6  ")).toBe(15);
        expect(add("   ")).toBe(0);
    });

    test('should handle non-numeric input gracefully', () => {
        expect(add("1,a")).toBe(1);
        expect(add("1,2,b,3")).toBe(6);
        expect(add("x,y,z")).toBe(0);
    });

    test('should handle zeroes', () => {
        expect(add("0,1,2")).toBe(3);
        expect(add("0,0,0")).toBe(0);
    });
});
