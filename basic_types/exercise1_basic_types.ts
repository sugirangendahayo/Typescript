// EXERCISE 1: Basic String and Number Types
// 
// WHAT WE ARE ASKED TO DO:
// Learn the fundamental primitive types in TypeScript - string and number
// Understand how TypeScript provides type safety for basic data types
// Practice declaring variables with explicit type annotations
//
// WHAT WE DID:
// - Declared string variables with explicit type annotations
// - Declared number variables (both integers and floating point)
// - Demonstrated type safety by showing what operations are allowed/forbidden
// - Showed how TypeScript infers types when annotations are omitted
// - Demonstrated string interpolation and basic arithmetic operations

// String type examples
// Explicit type annotation
let firstName: string = "John";
let lastName: string = "Doe";

// Type inference (TypeScript automatically knows this is a string)
let greeting = "Hello, World!";

// String concatenation and interpolation
let fullName: string = firstName + " " + lastName;
let welcomeMessage: string = `${greeting} My name is ${fullName}.`;

console.log(welcomeMessage); // Output: Hello, World! My name is John Doe.

// Number type examples
// TypeScript uses 'number' for all numeric values (integers, floats, etc.)
let age: number = 25;
let height: number = 5.9;
let weight: number = 150.5;

// Type inference for numbers
let score = 100;

// Arithmetic operations with type safety
let totalYears: number = age + 5; // Valid: number + number
let averageScore: number = score / 2; // Valid: number / number

console.log(`Age: ${age}, Height: ${height}, Weight: ${weight}`);
console.log(`Total years in 5 years: ${totalYears}`);
console.log(`Average score: ${averageScore}`);

// Type safety demonstration - these would cause TypeScript errors:
// let invalidString: string = 42; // Error: Type 'number' is not assignable to type 'string'
// let invalidNumber: number = "hello"; // Error: Type 'string' is not assignable to type 'number'

// Mixed operations that TypeScript allows:
let stringNumber: string = "The answer is ";
let answer: number = 42;
let result: string = stringNumber + answer; // Valid: string + number results in string

console.log(result); // Output: The answer is 42

// Additional number types:
let integer: number = 42; // Integer
let floatingPoint: number = 3.14; // Float
let negative: number = -10; // Negative number
let zero: number = 0; // Zero

console.log(`Integer: ${integer}, Float: ${floatingPoint}, Negative: ${negative}, Zero: ${zero}`);

// String methods that TypeScript recognizes:
let upperCaseName: string = firstName.toUpperCase();
let lowerCaseName: string = lastName.toLowerCase();
let nameLength: number = fullName.length;

console.log(`Upper case: ${upperCaseName}, Lower case: ${lowerCaseName}, Length: ${nameLength}`);

// Number methods and properties:
let maxNumber: number = Number.MAX_VALUE;
let minNumber: number = Number.MIN_VALUE;
let parsedNumber: number = parseInt("123"); // Parse string to number

console.log(`Max number: ${maxNumber}`);
console.log(`Min number: ${minNumber}`);
console.log(`Parsed number: ${parsedNumber}`);

// Summary: This exercise demonstrates TypeScript's basic primitive types
// - string: for textual data
// - number: for all numeric values (integers, floats, etc.)
// - Type annotations vs type inference
// - Type safety prevents mixing incompatible types
// - TypeScript provides IntelliSense for type-specific methods
