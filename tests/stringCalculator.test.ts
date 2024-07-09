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

});
