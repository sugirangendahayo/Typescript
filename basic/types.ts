// String
let username: string = "John";
let greeting: string = `Hello, ${username}`;

// Number (integers, floats, hex, binary all are 'number')
let age: number = 25;
let price: number = 99.99;
let hexColor: number = 0xFF0000;

// Boolean
let isActive: boolean = true;
let hasPermission: boolean = false;

// Null and Undefined
let data: null = null;
let notAssigned: undefined = undefined;

// Any (escape hatch - avoid when possible!)
let dynamic: any = "string";
dynamic = 42; // No error, but you lose type safety

// Unknown (safer than any)
let userInput: unknown = getUserInput();
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase()); // Type narrowing required
}

// Void (for functions that don't return)
function logMessage(message: string): void {
  console.log(message);
  // no return statement
}

// Never (for functions that never return)
function throwError(message: string): never {
  throw new Error(message);
}