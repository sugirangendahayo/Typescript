// EXERCISE 3: Array Types and Tuple Types
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's array type system and tuple types
// Understand how to type arrays with different element types
// Practice using array methods with type safety
// Learn about tuples for fixed-length arrays with specific types
//
// WHAT WE DID:
// - Demonstrated array type annotations with different syntaxes
// - Showed array methods and their type safety
// - Explained tuple types for fixed-length arrays
// - Demonstrated array destructuring with type safety
// - Showed practical examples of arrays and tuples in real scenarios

// Array Type Examples
// Method 1: Using square brackets syntax (most common)
let numberArray: number[] = [1, 2, 3, 4, 5];
let stringArray: string[] = ["apple", "banana", "cherry"];
let booleanArray: boolean[] = [true, false, true];

// Method 2: Using Array generic syntax
let numbersGeneric: Array<number> = [10, 20, 30];
let stringsGeneric: Array<string> = ["hello", "world"];

// Type inference for arrays
let inferredNumbers = [1, 2, 3]; // TypeScript infers number[]
let inferredStrings = ["a", "b", "c"]; // TypeScript infers string[]
let mixed = [1, "hello", true]; // TypeScript infers (string | number | boolean)[]

console.log("Numbers:", numberArray);
console.log("Strings:", stringArray);
console.log("Booleans:", booleanArray);
console.log("Mixed array:", mixed);

// Array Methods with Type Safety
// Push method - TypeScript ensures type compatibility
numberArray.push(6); // Valid: pushing number to number[]
// numbers.push("seven"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'

stringArray.push("date"); // Valid: pushing string to string[]
// strings.push(123); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

// Pop method - returns the element type or undefined
let poppedNumber: number | undefined = numberArray.pop();
let poppedString: string | undefined = stringArray.pop();

console.log("Popped number:", poppedNumber);
console.log("Popped string:", poppedString);

// Map method - transforms array elements while maintaining type safety
let doubledNumbers: number[] = numberArray.map((n) => n * 2);
let uppercasedStrings: string[] = stringArray.map((s) => s.toUpperCase());

console.log("Doubled numbers:", doubledNumbers);
console.log("Uppercased strings:", uppercasedStrings);

// Filter method - filters elements, maintains same type
let evenNumbers: number[] = numberArray.filter((n) => n % 2 === 0);
let longStrings: string[] = stringArray.filter((s) => s.length > 5);

console.log("Even numbers:", evenNumbers);
console.log("Long strings:", longStrings);

// Reduce method - accumulates values
let sum: number = numberArray.reduce((acc, curr) => acc + curr, 0);
let concatenated: string = stringArray.reduce((acc, curr) => acc + curr, "");

console.log("Sum of numbers:", sum);
console.log("Concatenated strings:", concatenated);

// Multi-dimensional arrays
let matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Matrix:", matrix);

// Accessing nested arrays
let firstRow: number[] = matrix[0];
let firstElement: number = matrix[0][0];

console.log("First row:", firstRow);
console.log("First element:", firstElement);

// Array destructuring with type annotations
let [firstNum, secondNum, ...restOfNumbers] = numberArray;
console.log("First number:", firstNum);
console.log("Second number:", secondNum);
console.log("Rest of numbers:", restOfNumbers);

// Tuple Type Examples
// Tuples are fixed-length arrays with specific types for each position
let personTuple: [string, number, boolean] = ["John", 30, true];
let coordinates: [number, number] = [10.5, 20.3];
let rgbColor: [number, number, number] = [255, 0, 0];

console.log("Person tuple:", personTuple);
console.log("Coordinates:", coordinates);
console.log("RGB color:", rgbColor);

// Accessing tuple elements by index
let personName: string = personTuple[0];
let personAge: number = personTuple[1];
let personActive: boolean = personTuple[2];

console.log(`Name: ${personName}, Age: ${personAge}, Active: ${personActive}`);

// Tuple destructuring
let [destructuredName, personAge2, personStatus] = personTuple;
let [x, y] = coordinates;
let [red, green, blue] = rgbColor;

console.log(
  `Destructured - Name: ${destructuredName}, Age: ${personAge2}, Status: ${personStatus}`,
);
console.log(`Coordinates: x=${x}, y=${y}`);
console.log(`Color: R=${red}, G=${green}, B=${blue}`);

// Optional tuple elements (using union with undefined)
let optionalTuple: [string, number?, boolean?] = ["hello"];
let completeTuple: [string, number, boolean] = ["world", 42, true];

console.log("Optional tuple:", optionalTuple);
console.log("Complete tuple:", completeTuple);

// Tuple with rest elements
let flexibleTuple: [string, ...number[]] = ["scores", 100, 95, 87, 92];
let [label, ...scores] = flexibleTuple;

console.log("Label:", label);
console.log("Scores:", scores);

// Practical Examples

// Example 1: User data with array of skills
interface User {
  id: number;
  name: string;
  skills: string[];
  scores: number[];
}

let user: User = {
  id: 1,
  name: "Alice",
  skills: ["JavaScript", "TypeScript", "React"],
  scores: [85, 92, 78, 95],
};

// Calculate average score
let userAverageScore: number =
  user.scores.reduce((acc, score) => acc + score, 0) / user.scores.length;
console.log(`${user.name}'s skills: ${user.skills.join(", ")}`);
console.log(`${user.name}'s average score: ${userAverageScore.toFixed(2)}`);

// Example 2: Product inventory using tuples
type Product = [string, number, number]; // [name, price, quantity]

let inventory: Product[] = [
  ["Laptop", 999.99, 10],
  ["Mouse", 29.99, 50],
  ["Keyboard", 79.99, 25],
];

// Calculate total inventory value
let totalValue: number = inventory.reduce((total, [name, price, quantity]) => {
  return total + price * quantity;
}, 0);

console.log("Inventory:", inventory);
console.log(`Total inventory value: $${totalValue.toFixed(2)}`);

// Example 3: Date handling with tuple
type DateTuple = [number, number, number]; // [year, month, day]

let birthDate: DateTuple = [1990, 5, 15];
let currentDate: DateTuple = [2024, 2, 26];

function calculateAge(birth: DateTuple, current: DateTuple): number {
  let [birthYear, birthMonth, birthDay] = birth;
  let [currentYear, currentMonth, currentDay] = current;

  let age = currentYear - birthYear;

  // Adjust age if birthday hasn't occurred yet this year
  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
}

let calculatedAge = calculateAge(birthDate, currentDate);
console.log(
  `Birth date: ${birthDate.join("/")}, Current date: ${currentDate.join("/")}`,
);
console.log(`Age: ${calculatedAge} years`);

// Example 4: API response handling
interface ApiResponse {
  success: boolean;
  data: [string, any][]; // Array of [key, value] tuples
  errors?: string[];
}

let apiResponse: ApiResponse = {
  success: true,
  data: [
    ["username", "john_doe"],
    ["email", "john@example.com"],
    ["lastLogin", new Date()],
  ],
};

// Process API response data
apiResponse.data.forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// Array type guards
function isStringArray(arr: any[]): arr is string[] {
  return arr.every((item) => typeof item === "string");
}

function processArray(arr: string[] | number[]): void {
  if (isStringArray(arr)) {
    // TypeScript knows arr is string[] here
    console.log("String array length:", arr.length);
    console.log("First element uppercase:", arr[0]?.toUpperCase());
  } else {
    // TypeScript knows arr is number[] here
    console.log(
      "Number array sum:",
      arr.reduce((a, b) => a + b, 0),
    );
  }
}

processArray(["hello", "world"]);
processArray([1, 2, 3, 4, 5]);

// Summary: This exercise demonstrates:
// - Array type annotations with [] and Array<T> syntax
// - Type-safe array methods (push, pop, map, filter, reduce)
// - Multi-dimensional arrays
// - Tuple types for fixed-length arrays with specific types
// - Tuple destructuring and optional elements
// - Practical applications of arrays and tuples
// - Type guards for array type checking
