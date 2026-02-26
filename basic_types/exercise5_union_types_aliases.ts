// EXERCISE 5: Union Types and Type Aliases
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's union types for combining multiple types
// Understand how to create type aliases for reusable type definitions
// Practice using union types in real-world scenarios
// Learn about type narrowing with union types
//
// WHAT WE DID:
// - Demonstrated union types with the pipe (|) operator
// - Created type aliases for complex type definitions
// - Showed type narrowing techniques for union types
// - Demonstrated discriminant unions for better type safety
// - Showed practical examples of union types and aliases in real scenarios

// Union Type Examples
// Basic union types using the pipe (|) operator
let stringOrNumber: string | number = "hello";
stringOrNumber = 42; // Valid: can be string or number
// stringOrNumber = true; // Error: Type 'boolean' is not assignable to type 'string | number'

console.log("String or number:", stringOrNumber);

// Union types with multiple options
let multiType: string | number | boolean | null = null;
multiType = "text";
multiType = 123;
multiType = true;
multiType = null;

console.log("Multi-type value:", multiType);

// Union types in function parameters
function processValue(value: string | number): void {
  console.log("Processing value:", value);
}

processValue("hello");
processValue(42);

// Type Aliases Examples
// Creating type aliases with the 'type' keyword
type ID = string | number;
type TaskStatus = "pending" | "in-progress" | "completed" | "failed";
type Callback = (result: string) => void;

// Using type aliases
let userId: ID = "user123";
let orderId: ID = 456;
let taskStatus: TaskStatus = "pending";
let onComplete: Callback = (result) => console.log("Completed:", result);

console.log("User ID:", userId);
console.log("Order ID:", orderId);
console.log("Task status:", taskStatus);
onComplete("Task finished");

// Complex type aliases
type UnionUser = {
  id: ID;
  name: string;
  email: string;
  status: TaskStatus;
};

let unionUser: UnionUser = {
  id: "user123",
  name: "John Doe",
  email: "john@example.com",
  status: "pending",
};

console.log("User:", unionUser);

// Type Narrowing with Union Types
// Using typeof for type narrowing
function displayValue(value: string | number): void {
  if (typeof value === "string") {
    // TypeScript knows value is string here
    console.log(`String value: ${value.toUpperCase()}`);
  } else {
    // TypeScript knows value is number here
    console.log(`Number value: ${value.toFixed(2)}`);
  }
}

displayValue("hello world");
displayValue(3.14159);

// Using instanceof for type narrowing
class Car {
  drive() {
    console.log("Driving a car");
  }
}

class Boat {
  sail() {
    console.log("Sailing a boat");
  }
}

function operateVehicle(vehicle: Car | Boat): void {
  if (vehicle instanceof Car) {
    vehicle.drive();
  } else {
    vehicle.sail();
  }
}

operateVehicle(new Car());
operateVehicle(new Boat());

// Using in operator for type narrowing
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

function moveAnimal(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly();
  } else {
    animal.swim();
  }
}

let bird: Bird = {
  fly: () => console.log("Flying"),
  layEggs: () => console.log("Laying eggs"),
};

let fish: Fish = {
  swim: () => console.log("Swimming"),
  layEggs: () => console.log("Laying eggs"),
};

moveAnimal(bird);
moveAnimal(fish);

// Discriminant Unions
// Using a common property to discriminate between types
interface LoadingState {
  status: "loading";
  data?: null;
}

interface SuccessState {
  status: "success";
  data: string;
}

interface ErrorState {
  status: "error";
  error: string;
}

type ApiState = LoadingState | SuccessState | ErrorState;

function processApiState(state: ApiState): void {
  switch (state.status) {
    case "loading":
      console.log("Loading data...");
      break;
    case "success":
      console.log("Data loaded successfully:", state.data);
      break;
    case "error":
      console.log("Error loading data:", state.error);
      break;
  }
}

processApiState({ status: "loading" });
processApiState({ status: "success", data: "User data" });
processApiState({ status: "error", error: "Network error" });

// Union Types with Arrays
// Array of union types
let mixedArray: (string | number)[] = [1, "hello", 2, "world", 3];

mixedArray.forEach((item) => {
  if (typeof item === "string") {
    console.log(`String: ${item.toUpperCase()}`);
  } else {
    console.log(`Number: ${item * 2}`);
  }
});

// Union types in function return types
function getRandomElement<T>(array: T[]): T | undefined {
  return array[Math.floor(Math.random() * array.length)];
}

let randomNumbers = [1, 2, 3, 4, 5];
let randomStrings = ["a", "b", "c"];

console.log("Random number:", getRandomElement(randomNumbers));
console.log("Random string:", getRandomElement(randomStrings));

// Practical Examples

// Example 1: Form field validation
type ValidationResult = {
  isValid: boolean;
  errors: string[];
};

type Validator = (value: string) => ValidationResult;

type FieldType = "text" | "email" | "password" | "number";

interface SimpleFormField {
  name: string;
  type: FieldType;
  value: string;
  label: string;
  required: boolean;
  validator?: Validator;
}

// Validators
const emailValidator: Validator = (value: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: emailRegex.test(value),
    errors: emailRegex.test(value) ? [] : ["Invalid email format"],
  };
};

const passwordValidator: Validator = (value: string): ValidationResult => {
  return {
    isValid: value.length >= 8,
    errors: value.length >= 8 ? [] : ["Password must be at least 8 characters"],
  };
};

// Form fields
const loginFormFields: SimpleFormField[] = [
  {
    name: "email",
    type: "email",
    value: "",
    label: "Email",
    required: true,
    validator: emailValidator,
  },
  {
    name: "password",
    type: "password",
    value: "",
    label: "Password",
    required: true,
    validator: passwordValidator,
  },
];

console.log("Login form:", loginFormFields);

// Example 2: API response handling
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface GenericApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

type RequestConfig = {
  method: HttpMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
};

// Simulated API function
async function makeRequest<T>(
  config: RequestConfig,
): Promise<GenericApiResponse<T>> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      if (config.method === "GET" && config.url === "/users") {
        resolve({
          success: true,
          data: [
            { id: 1, name: "John" },
            { id: 2, name: "Jane" },
          ] as T,
          status: 200,
        });
      } else if (config.method === "POST" && config.url === "/users") {
        resolve({
          success: true,
          data: { id: 3, name: config.data.name } as T,
          status: 201,
        });
      } else {
        resolve({
          success: false,
          error: "Not found",
          status: 404,
        });
      }
    }, 1000);
  });
}

// Usage examples
const getUserRequest: RequestConfig = {
  method: "GET",
  url: "/users",
};

const createUserRequest: RequestConfig = {
  method: "POST",
  url: "/users",
  data: { name: "Alice" },
  headers: { "Content-Type": "application/json" },
};

console.log("Get user request:", getUserRequest);
console.log("Create user request:", createUserRequest);

// Example 3: Event handling
type EventType = "click" | "hover" | "focus" | "blur" | "change";

type CustomEventHandler<T = any> = (event: {
  type: EventType;
  data?: T;
  element?: string;
}) => void;

interface CustomEventListener {
  eventType: EventType;
  handler: CustomEventHandler;
  element: string;
}

// Event handlers
const clickHandler: CustomEventHandler = (event) => {
  console.log(`Clicked on ${event.element}`);
};

const changeHandler: CustomEventHandler<string> = (event) => {
  console.log(`Changed value to: ${event.data}`);
};

// Event listeners
const customEventListeners: CustomEventListener[] = [
  {
    eventType: "click",
    handler: clickHandler,
    element: "button",
  },
  {
    eventType: "change",
    handler: changeHandler,
    element: "input",
  },
];

console.log("Event listeners:", customEventListeners);

// Example 4: Configuration management
type LogLevel = "debug" | "info" | "warn" | "error";

type Environment = "development" | "staging" | "production";

interface Config {
  app: {
    name: string;
    version: string;
    environment: Environment;
  };
  server: {
    host: string;
    port: number;
    ssl: boolean;
  };
  logging: {
    level: LogLevel;
    console: boolean;
    file: boolean;
  };
  database: {
    type: "mysql" | "postgresql" | "mongodb";
    host: string;
    port: number;
    name: string;
  };
}

const devConfig: Config = {
  app: {
    name: "MyApp",
    version: "1.0.0",
    environment: "development",
  },
  server: {
    host: "localhost",
    port: 3000,
    ssl: false,
  },
  logging: {
    level: "debug",
    console: true,
    file: false,
  },
  database: {
    type: "mysql",
    host: "localhost",
    port: 3306,
    name: "myapp_dev",
  },
};

console.log("Development config:", devConfig);

// Example 5: Generic union types
type Optional<T> = T | null | undefined;

type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

interface PartialUser {
  id?: number;
  name?: string;
  email?: string;
  age?: number;
}

// Make certain fields required
type CompleteUser = RequiredFields<PartialUser, "id" | "name">;

const completeUser: CompleteUser = {
  id: 1,
  name: "John Doe",
  email: "john@example.com", // Optional
  age: 30, // Optional
};

console.log("Complete user:", completeUser);

// Union type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processUnknown(value: unknown): void {
  if (isString(value)) {
    console.log(`String: ${value.toUpperCase()}`);
  } else if (isNumber(value)) {
    console.log(`Number: ${value.toFixed(2)}`);
  } else {
    console.log("Unknown type");
  }
}

processUnknown("hello");
processUnknown(42);
processUnknown(true);

// Summary: This exercise demonstrates:
// - Union types using the pipe (|) operator
// - Type aliases with the 'type' keyword
// - Type narrowing techniques (typeof, instanceof, in operator)
// - Discriminant unions for better type safety
// - Union types with arrays and function parameters
// - Practical applications in forms, API responses, events, and configuration
// - Generic union types and type guards
// - Creating reusable type definitions with aliases
