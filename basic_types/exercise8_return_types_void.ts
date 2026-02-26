// EXERCISE 8: Return Types and Void
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's return type system and the void type
// Understand how to specify and infer return types
// Practice using void for functions that don't return values
// Learn about never, undefined, and other special return types
//
// WHAT WE DID:
// - Demonstrated explicit return type annotations
// - Showed return type inference and type safety
// - Explained the void type for functions without return values
// - Demonstrated never, undefined, and other special return types
// - Showed practical applications of return types in real scenarios

// Basic Return Type Examples
// Functions with explicit return type annotations
function addNumbers(a: number, b: number): number {
  return a + b;
}

function greetUser(name: string): string {
  return `Hello, ${name}!`;
}

function checkIfEven(num: number): boolean {
  return num % 2 === 0;
}

console.log("Add:", addNumbers(5, 3));
console.log("Greet:", greetUser("Alice"));
console.log("Is even:", checkIfEven(4));

// Return Type Inference
// TypeScript automatically infers return types
function multiply(a: number, b: number) {
  return a * b; // TypeScript infers return type as number
}

function getFirstChar(str: string) {
  return str[0]; // TypeScript infers return type as string
}

function getRandomNumber() {
  return Math.random(); // TypeScript infers return type as number
}

console.log("Multiply:", multiply(4, 6));
console.log("First char:", getFirstChar("hello"));
console.log("Random number:", getRandomNumber());

// Void Return Type
// Functions that don't return a value
function logMessage(message: string): void {
  console.log(message);
  // No return statement - returns undefined
}

function clearConsole(): void {
  console.clear();
  // Implicitly returns undefined
}

function showAlert(message: string): void {
  alert(message);
  // Explicitly returns undefined
  return undefined;
}

logMessage("This is a log message");
clearConsole();
showAlert("This is an alert");

// Void vs Undefined Return Types
// Explicit void annotation
function processVoid(): void {
  console.log("Processing...");
  // Can return undefined explicitly or implicitly
}

// Explicit undefined annotation
function processUndefined(): undefined {
  console.log("Processing...");
  return undefined; // Must explicitly return undefined
}

// Void function can return undefined
let voidResult: void = processVoid();
let undefinedResult: undefined = processUndefined();

console.log("Void result:", voidResult);
console.log("Undefined result:", undefinedResult);

// Functions with Different Return Types
// Functions that return arrays
function getNumbers(): number[] {
  return [1, 2, 3, 4, 5];
}

function getStrings(): string[] {
  return ["apple", "banana", "cherry"];
}

console.log("Numbers:", getNumbers());
console.log("Strings:", getStrings());

// Functions that return objects
interface Person {
  name: string;
  age: number;
}

function createPerson(name: string, age: number): Person {
  return { name, age };
}

function getDefaultPerson(): Person {
  return {
    name: "John Doe",
    age: 30,
  };
}

let person1 = createPerson("Alice", 28);
let person2 = getDefaultPerson();

console.log("Created person:", person1);
console.log("Default person:", person2);

// Functions that return union types
function getValue(value: string | number): string | number {
  return value;
}

function getRandomValue(): string | number | boolean {
  const values = ["hello", 42, true];
  return values[Math.floor(Math.random() * values.length)];
}

console.log("Get value:", getValue("test"));
console.log("Random value:", getRandomValue());

// Functions with Conditional Return Types
// Return type depends on input
function processInput(input: string | number): string {
  if (typeof input === "string") {
    return input.toUpperCase();
  } else {
    return input.toString();
  }
}

function getLength(input: string | any[]): number {
  if (typeof input === "string") {
    return input.length;
  } else {
    return input.length;
  }
}

console.log("Process string:", processInput("hello"));
console.log("Process number:", processInput(42));
console.log("String length:", getLength("typescript"));
console.log("Array length:", getLength([1, 2, 3]));

// Generic Return Types
// Functions that work with multiple types
function identity<T>(value: T): T {
  return value;
}

function wrapInArray<T>(value: T): T[] {
  return [value];
}

function getFirstArrayElement<T>(array: T[]): T | undefined {
  return array[0];
}

console.log("Identity string:", identity("hello"));
console.log("Identity number:", identity(42));
console.log("Wrapped array:", wrapInArray("test"));
console.log("First element:", getFirstArrayElement([1, 2, 3]));

// Async Functions and Promise Return Types
// Functions that return promises
function fetchData(url: string): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
}

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: "sample" } as T);
    }, 500);
  });
}

// Usage with async/await
async function demonstrateAsync() {
  const data = await fetchData("/api/data");
  console.log("Fetched data:", data);

  const json = await fetchJson<{ data: string }>("/api/json");
  console.log("Fetched JSON:", json);
}

demonstrateAsync();

// Never Return Type
// Functions that never return
function throwError(message: string): never {
  throw new Error(message);
  // This function never returns - it always throws
}

function infiniteLoop(): never {
  while (true) {
    // Infinite loop - never returns
  }
}

// Function that can return never in some cases
function processValue(value: string | number): string {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value.toString();
  } else {
    // This branch is never reached due to type checking
    return value; // Error: Type 'never' is not assignable to type 'string'
  }
}

// Using never for exhaustive checking
type Shape =
  | { type: "circle"; radius: number }
  | { type: "square"; side: number }
  | { type: "triangle"; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.type) {
    case "circle":
      return Math.PI * shape.radius * shape.radius;
    case "square":
      return shape.side * shape.side;
    case "triangle":
      return (shape.base * shape.height) / 2;
    default:
      // This ensures all cases are handled
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

console.log("Circle area:", getArea({ type: "circle", radius: 5 }));
console.log("Square area:", getArea({ type: "square", side: 4 }));
console.log(
  "Triangle area:",
  getArea({ type: "triangle", base: 6, height: 3 }),
);

// Practical Examples

// Example 1: API Service Functions
interface ReturnApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ReturnUser {
  id: number;
  name: string;
  email: string;
}

class ReturnUserService {
  // Returns a promise with user data
  async getUser(id: number): Promise<ReturnApiResponse<ReturnUser>> {
    try {
      // Simulate API call
      const user: ReturnUser = {
        id,
        name: "John Doe",
        email: "john@example.com",
      };
      return { success: true, data: user };
    } catch (error) {
      return { success: false, error: "User not found" };
    }
  }

  // Returns void - just logs the action
  logUserAction(action: string, userId: number): void {
    console.log(`User ${userId} performed action: ${action}`);
  }

  // Returns boolean - indicates success/failure
  validateUser(user: ReturnUser): boolean {
    return user.email.includes("@") && user.name.length > 0;
  }

  // Returns never - always throws an error
  userNotFound(id: number): never {
    throw new Error(`User with ID ${id} not found`);
  }
}

const returnUserService = new ReturnUserService();

// Demonstrate the methods
returnUserService.getUser(1).then((response) => {
  if (response.success && response.data) {
    console.log("User found:", response.data);
    returnUserService.logUserAction("login", response.data.id);

    if (returnUserService.validateUser(response.data)) {
      console.log("User is valid");
    } else {
      console.log("User is invalid");
    }
  } else {
    console.log("Error:", response.error);
  }
});

// Example 2: Validation Functions
type ReturnValidationResult = {
  isValid: boolean;
  errors: string[];
};

interface ReturnValidator<T> {
  validate(value: T): ReturnValidationResult;
  getErrorMessage(): string;
}

class ReturnEmailValidator implements ReturnValidator<string> {
  validate(email: string): ReturnValidationResult {
    const errors: string[] = [];

    if (!email.includes("@")) {
      errors.push("Email must contain @");
    }

    if (!email.includes(".")) {
      errors.push("Email must contain .");
    }

    if (email.length < 5) {
      errors.push("Email must be at least 5 characters");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getErrorMessage(): string {
    return "Please provide a valid email address";
  }
}

class ReturnPasswordValidator implements ReturnValidator<string> {
  validate(password: string): ReturnValidationResult {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain uppercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain number");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  getErrorMessage(): string {
    return "Password must be at least 8 characters with uppercase and number";
  }
}

function validateField<T>(
  value: T,
  validator: ReturnValidator<T>,
): ReturnValidationResult {
  return validator.validate(value);
}

// Usage
const returnEmailValidator = new ReturnEmailValidator();
const returnPasswordValidator = new ReturnPasswordValidator();

const emailValidationResult = validateField(
  "test@example.com",
  returnEmailValidator,
);
const passwordValidationResult = validateField(
  "Password123",
  returnPasswordValidator,
);

console.log("Email validation:", emailValidationResult);
console.log("Password validation:", passwordValidationResult);

// Example 3: Data Processing Pipeline
type ReturnProcessor<T, U> = (input: T) => U;
type AsyncReturnProcessor<T, U> = (input: T) => Promise<U>;

class ReturnDataPipeline<T, U> {
  constructor(
    private processors: ReturnProcessor<any, any>[],
    private errorHandler?: (error: Error) => void,
  ) {}

  // Returns processed data
  process(input: T): U {
    try {
      return this.processors.reduce((result, processor) => {
        return processor(result);
      }, input as any);
    } catch (error) {
      if (this.errorHandler) {
        this.errorHandler(error as Error);
      }
      throw error;
    }
  }

  // Returns void - just logs the pipeline info
  describe(): void {
    console.log(`Pipeline with ${this.processors.length} processors`);
    this.processors.forEach((processor, index) => {
      console.log(
        `  Step ${index + 1}: ${processor.name || "Anonymous processor"}`,
      );
    });
  }

  // Returns boolean - indicates if pipeline is empty
  isEmpty(): boolean {
    return this.processors.length === 0;
  }
}

// Create processors
const toStringProcessor: ReturnProcessor<number, string> = (num) =>
  num.toString();
const toUpperCaseProcessor: ReturnProcessor<string, string> = (str) =>
  str.toUpperCase();
const addPrefixProcessor: ReturnProcessor<string, string> = (str) =>
  `PREFIX_${str}`;

// Create pipeline
const returnPipeline = new ReturnDataPipeline(
  [toStringProcessor, toUpperCaseProcessor, addPrefixProcessor],
  (error) => console.error("Pipeline error:", error.message),
);

// Use pipeline
returnPipeline.describe();
const pipelineResult = returnPipeline.process(42);
console.log("Pipeline result:", pipelineResult);
console.log("Is pipeline empty?:", returnPipeline.isEmpty());

// Example 4: Event Emitter
type EventCallback<T = any> = (data: T) => void;

class EventEmitter {
  private events: Map<string, EventCallback[]> = new Map();

  // Returns void - just registers the listener
  on<T>(event: string, callback: EventCallback<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  // Returns void - just emits the event
  emit<T>(event: string, data?: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  // Returns boolean - indicates if event has listeners
  hasListeners(event: string): boolean {
    const callbacks = this.events.get(event);
    return callbacks ? callbacks.length > 0 : false;
  }

  // Returns number - count of listeners
  getListenerCount(event: string): number {
    const callbacks = this.events.get(event);
    return callbacks ? callbacks.length : 0;
  }

  // Returns void - removes all listeners
  removeAllListeners(event?: string): void {
    if (event) {
      this.events.delete(event);
    } else {
      this.events.clear();
    }
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on<string>("message", (message) => {
  console.log("Received message:", message);
});

emitter.on<number>("count", (count) => {
  console.log("Count updated:", count);
});

emitter.emit("message", "Hello, World!");
emitter.emit("count", 42);

console.log("Has message listeners:", emitter.hasListeners("message"));
console.log("Message listener count:", emitter.getListenerCount("message"));

// Example 5: State Management
type State = {
  count: number;
  name: string;
  isLoading: boolean;
};

type Action =
  | { type: "INCREMENT" }
  | { type: "DECREMENT" }
  | { type: "SET_NAME"; payload: string }
  | { type: "SET_LOADING"; payload: boolean };

class Store {
  private state: State = {
    count: 0,
    name: "",
    isLoading: false,
  };

  // Returns current state
  getState(): State {
    return this.state;
  }

  // Returns void - just dispatches the action
  dispatch(action: Action): void {
    switch (action.type) {
      case "INCREMENT":
        this.state.count++;
        break;
      case "DECREMENT":
        this.state.count--;
        break;
      case "SET_NAME":
        this.state.name = action.payload;
        break;
      case "SET_LOADING":
        this.state.isLoading = action.payload;
        break;
    }
  }

  // Returns boolean - checks if action is valid
  canDispatch(action: Action): boolean {
    return true; // Simplified validation
  }

  // Returns void - resets state
  reset(): void {
    this.state = {
      count: 0,
      name: "",
      isLoading: false,
    };
  }
}

// Usage
const store = new Store();

console.log("Initial state:", store.getState());

store.dispatch({ type: "INCREMENT" });
store.dispatch({ type: "SET_NAME", payload: "John Doe" });

console.log("Updated state:", store.getState());
console.log(
  "Can dispatch increment:",
  store.canDispatch({ type: "INCREMENT" }),
);

store.reset();
console.log("Reset state:", store.getState());

// Summary: This exercise demonstrates:
// - Explicit return type annotations and type inference
// - The void type for functions without return values
// - Difference between void and undefined return types
// - Functions with complex return types (arrays, objects, unions)
// - Conditional return types based on input
// - Generic return types for flexible functions
// - Async functions and Promise return types
// - The never return type for functions that never complete
// - Practical applications in API services, validation, data processing, events, and state management
