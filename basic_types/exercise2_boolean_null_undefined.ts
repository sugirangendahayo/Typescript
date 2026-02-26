// EXERCISE 2: Boolean, Null, and Undefined Types
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's boolean type and the special types null and undefined
// Understand the difference between null and undefined
// Practice using these types in real-world scenarios
// Learn about TypeScript's strict null checks feature
//
// WHAT WE DID:
// - Demonstrated boolean type usage with explicit annotations and inference
// - Explained the difference between null and undefined
// - Showed how to use these types in conditional logic
// - Demonstrated type guards for null/undefined checking
// - Showed practical examples of when to use each type

// Boolean type examples
// Explicit type annotation
let isLoggedIn: boolean = true;
let userHasPermission: boolean = false;

// Type inference
let isCompleted = true; // TypeScript knows this is boolean
let isLoading = false;

console.log(`User logged in: ${isLoggedIn}`);
console.log(`Has permission: ${userHasPermission}`);

// Boolean operations and expressions
let canEdit: boolean = isLoggedIn && userHasPermission;
let canView: boolean = isLoggedIn || userHasPermission;
let isGuest: boolean = !isLoggedIn;

console.log(`Can edit: ${canEdit}`);
console.log(`Can view: ${canView}`);
console.log(`Is guest: ${isGuest}`);

// Boolean from comparisons
let userAge: number = 25;
let isAdult: boolean = userAge >= 18;
let isTeenager: boolean = userAge >= 13 && userAge < 18;

console.log(`Is adult: ${isAdult}`);
console.log(`Is teenager: ${isTeenager}`);

// Boolean from function calls
function hasValidEmail(email: string): boolean {
  return email.includes("@");
}

let userEmail: string = "user@example.com";
let emailIsValid: boolean = hasValidEmail(userEmail);

console.log(`Email is valid: ${emailIsValid}`);

// Undefined type examples
// Undefined means a variable has been declared but not assigned a value
let uninitializedVariable: undefined;
let optionalName: string | undefined; // Can be string or undefined

console.log(`Uninitialized variable: ${uninitializedVariable}`);
console.log(`Optional name: ${optionalName}`);

// Function that returns undefined
function logMessage(message: string): undefined {
  console.log(message);
  // Implicitly returns undefined
}

let logResult: undefined = logMessage("This is a log message");
console.log(`Log function returned: ${logResult}`);

// Null type examples
// Null represents the intentional absence of any object value
let emptyValue: null = null;
let noData: null = null;

console.log(`Empty value: ${emptyValue}`);
console.log(`No data: ${noData}`);

// Function that might return null
function findUserById(id: number): { name: string } | null {
  // Simulate database lookup
  if (id === 1) {
    return { name: "John Doe" };
  }
  return null; // User not found
}

let user1 = findUserById(1);
let user2 = findUserById(999);

console.log("User 1:", user1);
console.log("User 2:", user2);

// Type guards for null and undefined checking
function processUser(user: { name: string } | null | undefined): void {
  // Type guard: check if user is not null and not undefined
  if (user !== null && user !== undefined) {
    // TypeScript knows user is { name: string } in this block
    console.log(`Processing user: ${user.name}`);
  } else {
    console.log("No user to process");
  }
}

processUser(user1);
processUser(user2);
processUser(null);
processUser(undefined);

// More concise type guard using optional chaining
function getUserName(user: { name: string } | null | undefined): string {
  // Optional chaining (?.) returns undefined if user is null/undefined
  // Nullish coalescing (??) provides fallback value
  return user?.name ?? "Anonymous";
}

console.log(`User 1 name: ${getUserName(user1)}`);
console.log(`User 2 name: ${getUserName(user2)}`);
console.log(`Null user name: ${getUserName(null)}`);
console.log(`Undefined user name: ${getUserName(undefined)}`);

// Practical example: Configuration object
interface Config {
  apiUrl?: string; // Optional property (can be undefined)
  timeout?: number; // Optional property (can be undefined)
  retries?: number; // Optional property (can be undefined)
}

function createConfig(config: Config): void {
  // Provide default values for undefined properties
  const finalConfig = {
    apiUrl: config.apiUrl ?? "https://api.example.com",
    timeout: config.timeout ?? 5000,
    retries: config.retries ?? 3,
  };

  console.log("Final configuration:", finalConfig);
}

// Test with different configurations
createConfig({}); // All undefined, uses defaults
createConfig({ apiUrl: "https://custom.api.com" }); // Partial config
createConfig({ timeout: 10000, retries: 5 }); // Another partial config

// Boolean conversion examples
// Truthy and falsy values
let valuesToTest = [
  true, // true
  false, // false
  0, // false
  1, // true
  "", // false (empty string)
  "hello", // true (non-empty string)
  [], // true (empty array)
  {}, // true (empty object)
  null, // false
  undefined, // false
];

console.log("Truthy/falsy test results:");
valuesToTest.forEach((value, index) => {
  console.log(`Value ${index}: ${value} -> Boolean: ${Boolean(value)}`);
});

// Strict null checking demonstration
// With strictNullChecks enabled, TypeScript prevents common errors
function strictNullExample(maybeString: string | null): number {
  // This would cause an error without null checking:
  // return maybeString.length; // Error: Object is possibly 'null'

  // Correct way with null check:
  if (maybeString !== null) {
    return maybeString.length;
  }
  return 0; // Default length for null
}

console.log(`Length of "hello": ${strictNullExample("hello")}`);
console.log(`Length of null: ${strictNullExample(null)}`);

// Summary: This exercise demonstrates:
// - boolean: for true/false values
// - undefined: for variables that haven't been assigned a value
// - null: for intentional absence of value
// - Type guards for safe null/undefined checking
// - Optional chaining and nullish coalescing operators
// - Importance of strict null checking in TypeScript
