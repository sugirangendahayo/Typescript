// EXERCISE 4: Object Types and Interfaces
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's object type system and interface definitions
// Understand how to define and use interfaces for type safety
// Practice object property types, optional properties, and readonly properties
// Learn about interface inheritance and implementation
//
// WHAT WE DID:
// - Demonstrated object type annotations with inline types
// - Created interfaces for reusable type definitions
// - Showed optional and readonly properties
// - Demonstrated interface inheritance and extension
// - Showed practical examples of objects and interfaces in real scenarios

// Object Type Examples
// Inline object type annotation
let person: {
  name: string;
  age: number;
  isActive: boolean;
} = {
  name: "John Doe",
  age: 30,
  isActive: true,
};

console.log("Person:", person);

// Object with optional properties
let product: {
  id: number;
  title: string;
  price: number;
  description?: string; // Optional property
  inStock?: boolean; // Optional property
} = {
  id: 1,
  title: "Laptop",
  price: 999.99,
  description: "High-performance laptop",
  // inStock is optional, so we can omit it
};

console.log("Product:", product);

// Object with readonly properties
let configuration: {
  readonly apiKey: string;
  readonly apiUrl: string;
  timeout: number; // Mutable property
} = {
  apiKey: "abc123",
  apiUrl: "https://api.example.com",
  timeout: 5000,
};

console.log("Configuration:", configuration);
// configuration.apiKey = "def456"; // Error: Cannot assign to 'apiKey' because it is read-only
configuration.timeout = 10000; // Valid: timeout is mutable

// Interface Examples
// Basic interface definition
interface BasicUser {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Using the interface
let basicUser1: BasicUser = {
  id: 1,
  name: "Alice Smith",
  email: "alice@example.com",
  age: 28,
};

let basicUser2: BasicUser = {
  id: 2,
  name: "Bob Johnson",
  email: "bob@example.com",
  age: 35,
};

console.log("User 1:", basicUser1);
console.log("User 2:", basicUser2);

// Interface with optional properties
interface Employee {
  id: number;
  name: string;
  department: string;
  position: string;
  salary?: number; // Optional
  startDate?: Date; // Optional
  manager?: Employee; // Optional self-reference
}

let employee: Employee = {
  id: 101,
  name: "Carol Williams",
  department: "Engineering",
  position: "Senior Developer",
  // salary and startDate are optional
};

console.log("Employee:", employee);

// Interface with readonly properties
interface AppConfig {
  readonly appName: string;
  readonly version: string;
  readonly buildDate: Date;
  debugMode: boolean;
  logLevel: "error" | "warn" | "info" | "debug";
}

let appConfig: AppConfig = {
  appName: "MyApp",
  version: "1.0.0",
  buildDate: new Date(),
  debugMode: false,
  logLevel: "info",
};

console.log("App Config:", appConfig);
// appConfig.appName = "NewApp"; // Error: Cannot assign to 'appName' because it is read-only
appConfig.debugMode = true; // Valid: debugMode is mutable

// Interface with methods
interface Calculator {
  add(a: number, b: number): number;
  subtract(a: number, b: number): number;
  multiply(a: number, b: number): number;
  divide(a: number, b: number): number;
  clear(): void;
  getCurrentResult(): number;
}

// Creating an object that implements the Calculator interface
let scientificCalculator: Calculator = {
  add: function (a: number, b: number): number {
    return a + b;
  },
  subtract: function (a: number, b: number): number {
    return a - b;
  },
  multiply: function (a: number, b: number): number {
    return a * b;
  },
  divide: function (a: number, b: number): number {
    if (b === 0) throw new Error("Division by zero");
    return a / b;
  },
  clear: function (): void {
    // Implementation would clear the current result
    console.log("Calculator cleared");
  },
  getCurrentResult: function (): number {
    // Implementation would return current result
    return 0;
  },
};

console.log("Calculator operations:");
console.log("5 + 3 =", scientificCalculator.add(5, 3));
console.log("10 - 4 =", scientificCalculator.subtract(10, 4));
console.log("6 * 7 =", scientificCalculator.multiply(6, 7));
console.log("15 / 3 =", scientificCalculator.divide(15, 3));

// Interface Inheritance
// Base interface
interface Vehicle {
  brand: string;
  model: string;
  year: number;
  start(): void;
  stop(): void;
}

// Extended interface
interface Car extends Vehicle {
  numberOfDoors: number;
  trunkCapacity: number;
  honk(): void;
}

// Further extended interface
interface ElectricCar extends Car {
  batteryCapacity: number;
  range: number;
  charge(): void;
}

// Implementing the interfaces
let myElectricCar: ElectricCar = {
  brand: "Tesla",
  model: "Model 3",
  year: 2023,
  numberOfDoors: 4,
  trunkCapacity: 15,
  batteryCapacity: 75,
  range: 350,
  start: function (): void {
    console.log("Electric car started silently");
  },
  stop: function (): void {
    console.log("Electric car stopped");
  },
  honk: function (): void {
    console.log("Beep beep!");
  },
  charge: function (): void {
    console.log("Charging battery...");
  },
};

console.log("Electric Car:", myElectricCar);
myElectricCar.start();
myElectricCar.honk();
myElectricCar.charge();
myElectricCar.stop();

// Interface with index signatures
interface Dictionary {
  [key: string]: string | number; // Index signature
}

let dictionary: Dictionary = {
  name: "John",
  age: 30,
  city: "New York",
  zipCode: 10001,
};

console.log("Dictionary:", dictionary);

// Accessing properties dynamically
function getPropertyValue(obj: Dictionary, key: string): string | number {
  return obj[key];
}

console.log("Name:", getPropertyValue(dictionary, "name"));
console.log("Age:", getPropertyValue(dictionary, "age"));

// Practical Examples

// Example 1: API response interfaces
interface UserProfileApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  errors?: string[];
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar?: string;
    bio?: string;
  };
  preferences: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
}

// Simulated API response
let userApiResponse: UserProfileApiResponse<UserProfile> = {
  success: true,
  data: {
    id: 123,
    username: "johndoe",
    email: "john@example.com",
    profile: {
      firstName: "John",
      lastName: "Doe",
      avatar: "https://example.com/avatar.jpg",
      bio: "Software developer",
    },
    preferences: {
      theme: "dark",
      notifications: true,
      language: "en",
    },
  },
  message: "User profile retrieved successfully",
};

console.log("API Response:", userApiResponse);

// Example 2: Form validation interfaces
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "password" | "number";
  value: string;
  rules: ValidationRule;
  errors: string[];
}

interface FormConfig {
  fields: FormField[];
  submitButton: {
    text: string;
    disabled: boolean;
  };
  onSubmit: (data: Record<string, string>) => void;
}

let registrationForm: FormConfig = {
  fields: [
    {
      name: "username",
      label: "Username",
      type: "text",
      value: "",
      rules: {
        required: true,
        minLength: 3,
        maxLength: 20,
        pattern: /^[a-zA-Z0-9_]+$/,
      },
      errors: [],
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      value: "",
      rules: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      },
      errors: [],
    },
  ],
  submitButton: {
    text: "Register",
    disabled: true,
  },
  onSubmit: function (data: Record<string, string>): void {
    console.log("Form submitted with data:", data);
  },
};

console.log("Registration Form:", registrationForm);

// Example 3: Database entity interfaces
interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

interface UserEntity extends BaseEntity {
  username: string;
  email: string;
  passwordHash: string;
  isActive: boolean;
  lastLoginAt?: Date;
}

interface PostEntity extends BaseEntity {
  title: string;
  content: string;
  authorId: number;
  publishedAt?: Date;
  tags: string[];
  metadata: {
    views: number;
    likes: number;
    comments: number;
  };
}

// Creating instances
let dbUser: UserEntity = {
  id: 1,
  username: "alice",
  email: "alice@example.com",
  passwordHash: "hashed_password_here",
  isActive: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-02-20"),
  lastLoginAt: new Date("2024-02-26"),
};

let dbPost: PostEntity = {
  id: 101,
  title: "Understanding TypeScript Interfaces",
  content: "Interfaces are a powerful feature in TypeScript...",
  authorId: 1,
  createdAt: new Date("2024-02-25"),
  updatedAt: new Date("2024-02-25"),
  publishedAt: new Date("2024-02-26"),
  tags: ["typescript", "programming", "tutorial"],
  metadata: {
    views: 150,
    likes: 25,
    comments: 8,
  },
};

console.log("Database User:", dbUser);
console.log("Database Post:", dbPost);

// Example 4: Type guards with interfaces
function isUser(obj: any): obj is BasicUser {
  return (
    obj &&
    typeof obj === "object" &&
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.age === "number"
  );
}

function processUserObject(obj: any): void {
  if (isUser(obj)) {
    // TypeScript knows obj is BasicUser here
    console.log(`Processing user: ${obj.name} (${obj.email})`);
    console.log(`User ID: ${obj.id}, Age: ${obj.age}`);
  } else {
    console.log("Object is not a valid User");
  }
}

processUserObject(basicUser1); // Valid user
processUserObject({ invalid: "object" }); // Invalid object

// Object destructuring with interfaces
function displayUserInfo({ id, name, email, age }: BasicUser): void {
  console.log(`User Profile:`);
  console.log(`  ID: ${id}`);
  console.log(`  Name: ${name}`);
  console.log(`  Email: ${email}`);
  console.log(`  Age: ${age}`);
}

displayUserInfo(basicUser2);

// Summary: This exercise demonstrates:
// - Object type annotations with inline types
// - Interface definitions for reusable types
// - Optional and readonly properties
// - Interface methods and index signatures
// - Interface inheritance and extension
// - Generic interfaces for flexible type definitions
// - Practical applications in API responses, forms, and database entities
// - Type guards for interface checking
// - Object destructuring with typed interfaces
