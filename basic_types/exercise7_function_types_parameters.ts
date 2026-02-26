// EXERCISE 7: Function Types and Parameters
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's function type system and parameter typing
// Understand how to type function parameters with different types
// Practice function type annotations and type inference
// Learn about function overloading and generic functions
//
// WHAT WE DID:
// - Demonstrated function type annotations with parameters and return types
// - Showed function type inference and type safety
// - Demonstrated function overloading for different parameter combinations
// - Showed generic functions for flexible type handling
// - Explained practical applications of function types in real scenarios

// Basic Function Type Examples
// Function with explicit parameter and return type annotations
function addNumbers(a: number, b: number): number {
  return a + b;
}

function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

function checkIfAdult(age: number): boolean {
  return age >= 18;
}

console.log("Add:", addNumbers(5, 3));
console.log("Greet:", greetUser("Alice"));
console.log("Is adult:", checkIfAdult(25));

// Function with type inference
// TypeScript can infer return types automatically
function multiplyNumbers(a: number, b: number): number {
  return a * b;
}

function joinStrings(str1: string, str2: string): string {
  return `${str1} ${str2}`;
}

console.log("Multiply:", multiplyNumbers(4, 6));
console.log("Combine:", joinStrings("Hello", "World"));

// Function Type Expressions
// Using function type expressions to define function types
type MathOperation = (a: number, b: number) => number;
type StringProcessor = (input: string) => string;
type Predicate<T> = (value: T) => boolean;

// Using function type expressions
let addition: MathOperation = function (a: number, b: number): number {
  return a + b;
};

let subtraction: MathOperation = (a, b) => a - b; // Arrow function with type inference

let upperCase: StringProcessor = (input) => input.toUpperCase();

let isEven: Predicate<number> = (num) => num % 2 === 0;

console.log("Addition:", addition(10, 5));
console.log("Subtraction:", subtraction(10, 5));
console.log("Upper case:", upperCase("hello"));
console.log("Is even:", isEven(4));

// Function Parameters with Complex Types
// Arrays as parameters
function sumArray(numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

function findLongestString(strings: string[]): string {
  return strings.reduce(
    (longest, current) => (current.length > longest.length ? current : longest),
    "",
  );
}

console.log("Sum array:", sumArray([1, 2, 3, 4, 5]));
console.log(
  "Longest string:",
  findLongestString(["apple", "banana", "cherry", "date"]),
);

// Objects as parameters
interface FunctionPerson {
  name: string;
  age: number;
  email: string;
}

function showPersonInfo(person: FunctionPerson): void {
  console.log(
    `Person: ${person.name}, Age: ${person.age}, Email: ${person.email}`,
  );
}

function changePersonAge(
  person: FunctionPerson,
  newAge: number,
): FunctionPerson {
  return { ...person, age: newAge };
}

let functionPerson1: FunctionPerson = {
  name: "John Doe",
  age: 30,
  email: "john@example.com",
};

showPersonInfo(functionPerson1);
let changedPerson = changePersonAge(functionPerson1, 31);
showPersonInfo(changedPerson);

// Union types as parameters
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else {
    return value.toString();
  }
}

function getLength(value: string | number | any[]): number {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  } else {
    return value.toString().length;
  }
}

console.log("Process string:", processValue("hello"));
console.log("Process number:", processValue(42));
console.log("String length:", getLength("typescript"));
console.log("Number length:", getLength(12345));
console.log("Array length:", getLength([1, 2, 3, 4, 5]));

// Optional Parameters
// Parameters that may or may not be provided
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

function makeFunctionUser(
  name: string,
  age?: number,
  email?: string,
): FunctionPerson {
  return {
    name,
    age: age || 0,
    email: email || "",
  };
}

console.log("Build name with last:", buildName("John", "Doe"));
console.log("Build name without last:", buildName("John"));

let functionUser1 = makeFunctionUser("Alice", 28, "alice@example.com");
let functionUser2 = makeFunctionUser("Bob"); // Only required parameter
showPersonInfo(functionUser1);
showPersonInfo(functionUser2);

// Default Parameters
// Parameters with default values
function calculatePrice(
  price: number,
  tax: number = 0.1,
  discount: number = 0,
): number {
  return price * (1 + tax) * (1 - discount);
}

function logMessage(
  message: string,
  level: "info" | "warn" | "error" = "info",
  timestamp: Date = new Date(),
): void {
  console.log(
    `[${timestamp.toISOString()}] [${level.toUpperCase()}] ${message}`,
  );
}

console.log("Price with defaults:", calculatePrice(100));
console.log("Price with custom tax:", calculatePrice(100, 0.2));
console.log("Price with tax and discount:", calculatePrice(100, 0.2, 0.1));

logMessage("Application started");
logMessage("Warning detected", "warn");
logMessage("Error occurred", "error", new Date());

// Rest Parameters
// Functions that accept multiple arguments
function sumAllNumbers(...numbers: number[]): number {
  return numbers.reduce((sum, num) => sum + num, 0);
}

function combineStrings(separator: string, ...strings: string[]): string {
  return strings.join(separator);
}

function createArray<T>(...items: T[]): T[] {
  return items;
}

console.log("Sum all:", sumAllNumbers(1, 2, 3, 4, 5));
console.log(
  "Combine strings:",
  combineStrings(", ", "apple", "banana", "cherry"),
);
console.log(
  "Create array:",
  createArray<number | string | boolean | null>(1, "hello", true, null),
);

// Function Overloading
// Multiple function signatures for different parameter combinations
// Overload signatures
function formatDateString(date: Date): string;
function formatDateString(date: string): string;
function formatDateString(date: number): string;
function formatDateString(date: Date | string | number): string {
  if (date instanceof Date) {
    return date.toLocaleDateString();
  } else if (typeof date === "string") {
    return new Date(date).toLocaleDateString();
  } else {
    return new Date(date).toLocaleDateString();
  }
}

// Overload signatures for different return types
function makeHTMLElement(tag: string): HTMLElement;
function makeHTMLElement(tag: string, text: string): HTMLElement;
function makeHTMLElement(
  tag: string,
  attributes: Record<string, string>,
): HTMLElement;
function makeHTMLElement(
  tag: string,
  textOrAttributes?: string | Record<string, string>,
): HTMLElement {
  const element = document.createElement(tag);

  if (typeof textOrAttributes === "string") {
    element.textContent = textOrAttributes;
  } else if (typeof textOrAttributes === "object") {
    Object.keys(textOrAttributes).forEach((key) => {
      element.setAttribute(key, textOrAttributes[key]);
    });
  }

  return element;
}

console.log("Format date (Date):", formatDateString(new Date()));
console.log("Format date (string):", formatDateString("2024-02-26"));
console.log("Format date (timestamp):", formatDateString(1708934400000));

// Generic Functions
// Functions that work with multiple types
function identity<T>(value: T): T {
  return value;
}

function getFirstElement<T>(array: T[]): T | undefined {
  return array[0];
}

function getLastElement<T>(array: T[]): T | undefined {
  return array[array.length - 1];
}

function reverseGenericArray<T>(array: T[]): T[] {
  return [...array].reverse();
}

console.log("Identity string:", identity("hello"));
console.log("Identity number:", identity(42));
console.log("First element:", getFirstElement([1, 2, 3, 4, 5]));
console.log("Last element:", getLastElement(["apple", "banana", "cherry"]));
console.log("Reversed array:", reverseGenericArray([1, 2, 3, 4, 5]));

// Generic functions with constraints
interface Lengthwise {
  length: number;
}

function getItemLength<T extends Lengthwise>(item: T): number {
  return item.length;
}

function logItemWithLength<T extends Lengthwise>(item: T): void {
  console.log(`Item: ${JSON.stringify(item)}, Length: ${item.length}`);
}

console.log("String length:", getItemLength("hello"));
console.log("Array length:", getItemLength([1, 2, 3, 4, 5]));

logItemWithLength("typescript");
logItemWithLength([1, 2, 3]);

// Practical Examples

// Example 1: Event Handler Types
type EventHandler<T = any> = (event: T) => void;
type ClickEvent = { type: "click"; x: number; y: number };
type KeyEvent = { type: "keydown" | "keyup"; key: string; code: string };

function addEventListener<T>(
  eventType: string,
  handler: EventHandler<T>,
): void {
  console.log(`Added listener for ${eventType}`);
}

const functionClickHandler: EventHandler<ClickEvent> = (event) => {
  console.log(`Clicked at (${event.x}, ${event.y})`);
};

const functionKeyHandler: EventHandler<KeyEvent> = (event) => {
  console.log(`Key ${event.key} pressed (${event.type})`);
};

addEventListener("click", functionClickHandler);
addEventListener("keydown", functionKeyHandler);

// Example 2: API Request Functions
type FunctionApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

type FunctionHttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function makeFunctionApiRequest<T>(
  url: string,
  method: FunctionHttpMethod = "GET",
  data?: any,
): Promise<FunctionApiResponse<T>> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (url === "/users" && method === "GET") {
        resolve({
          success: true,
          data: [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" },
          ] as T,
        });
      } else if (url === "/users" && method === "POST") {
        resolve({
          success: true,
          data: { id: 3, name: data.name } as T,
        });
      } else {
        resolve({
          success: false,
          error: "Not found",
        });
      }
    }, 1000);
  });
}

// Usage
makeFunctionApiRequest<any[]>("/users", "GET").then((response) => {
  console.log("Users:", response.data);
});

makeFunctionApiRequest<{ id: number; name: string }>("/users", "POST", {
  name: "Alice",
}).then((response) => {
  console.log("Created user:", response.data);
});

// Example 3: Validation Functions
type FunctionValidationRule<T> = (value: T) => boolean;
type FunctionValidationResult = { isValid: boolean; errors: string[] };

function createFunctionValidator<T>(
  rules: FunctionValidationRule<T>[],
  errorMessages: string[],
): (value: T) => FunctionValidationResult {
  return (value: T): FunctionValidationResult => {
    const errors: string[] = [];

    rules.forEach((rule, index) => {
      if (!rule(value)) {
        errors.push(errorMessages[index]);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
    };
  };
}

// Email validator
const functionEmailValidator = createFunctionValidator<string>(
  [
    (email: string) => email.includes("@"),
    (email: string) => email.includes("."),
    (email: string) => email.length > 5,
  ],
  [
    "Email must contain @",
    "Email must contain .",
    "Email must be at least 6 characters",
  ],
);

// Password validator
const functionPasswordValidator = createFunctionValidator<string>(
  [
    (password: string) => password.length >= 8,
    (password: string) => /[A-Z]/.test(password),
    (password: string) => /[0-9]/.test(password),
  ],
  [
    "Password must be at least 8 characters",
    "Password must contain uppercase letter",
    "Password must contain number",
  ],
);

console.log("Email validation:", functionEmailValidator("test@example.com"));
console.log("Password validation:", functionPasswordValidator("Password123"));

// Example 4: Data Transformation Functions
type FunctionTransformer<T, U> = (input: T) => U;
type AsyncFunctionTransformer<T, U> = (input: T) => Promise<U>;

function pipeFunction<T, U, V>(
  transformer1: FunctionTransformer<T, U>,
  transformer2: FunctionTransformer<U, V>,
): FunctionTransformer<T, V> {
  return (input: T): V => transformer2(transformer1(input));
}

function composeFunction<T, U, V>(
  transformer2: FunctionTransformer<U, V>,
  transformer1: FunctionTransformer<T, U>,
): FunctionTransformer<T, V> {
  return (input: T): V => transformer2(transformer1(input));
}

// Transformers
const stringToNumberTransformer: FunctionTransformer<string, number> = (
  str: string,
) => parseInt(str, 10);
const numberToStringTransformer: FunctionTransformer<number, string> = (
  num: number,
) => num.toString();
const doubleNumberTransformer: FunctionTransformer<number, number> = (
  num: number,
) => num * 2;
const uppercaseStringTransformer: FunctionTransformer<string, string> = (
  str: string,
) => str.toUpperCase();

// Composed functions
const stringToDoubledNumber = pipeFunction(
  stringToNumberTransformer,
  doubleNumberTransformer,
);
const stringToUppercasedNumberString = pipeFunction(
  stringToNumberTransformer,
  pipeFunction(doubleNumberTransformer, numberToStringTransformer),
);

console.log("String to doubled number:", stringToDoubledNumber("42"));
console.log(
  "String to uppercased number string:",
  stringToUppercasedNumberString("42"),
);

// Example 5: Higher-Order Functions
function withFunctionLogging<T extends any[], R>(
  fn: (...args: T) => R,
  name: string,
): (...args: T) => R {
  return (...args: T): R => {
    console.log(`[${name}] Called with args:`, args);
    const result = fn(...args);
    console.log(`[${name}] Returned:`, result);
    return result;
  };
}

function withFunctionErrorHandling<T extends any[], R>(
  fn: (...args: T) => R,
  errorHandler: (error: Error) => R,
): (...args: T) => R {
  return (...args: T): R => {
    try {
      return fn(...args);
    } catch (error) {
      return errorHandler(error as Error);
    }
  };
}

// Original functions
function divideNumbers(a: number, b: number): number {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
}

function parseFunctionJson(json: string): any {
  return JSON.parse(json);
}

// Enhanced functions
const loggedDivide = withFunctionLogging(divideNumbers, "divide");
const safeDivide = withFunctionErrorHandling(divideNumbers, (error) => {
  console.error("Division error:", error.message);
  return 0;
});

const loggedParseJson = withFunctionLogging(parseFunctionJson, "parseJson");
const safeParseJson = withFunctionErrorHandling(parseFunctionJson, (error) => {
  console.error("JSON parse error:", error.message);
  return null;
});

console.log("Logged divide:", loggedDivide(10, 2));
console.log("Safe divide (zero):", safeDivide(10, 0));
console.log("Safe divide (normal):", safeDivide(10, 2));

console.log("Logged JSON:", loggedParseJson('{"name": "John"}'));
console.log("Safe JSON (invalid):", safeParseJson("invalid json"));
console.log("Safe JSON (valid):", safeParseJson('{"name": "Alice"}'));

// Summary: This exercise demonstrates:
// - Function type annotations with parameters and return types
// - Function type inference and type safety
// - Function type expressions and aliases
// - Complex parameter types (arrays, objects, unions)
// - Optional and default parameters
// - Rest parameters for variable arguments
// - Function overloading for different parameter combinations
// - Generic functions for flexible type handling
// - Practical applications in event handling, API requests, validation, data transformation, and higher-order functions
