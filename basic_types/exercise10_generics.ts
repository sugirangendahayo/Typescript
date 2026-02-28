// EXERCISE 10: Generics - Basic to Advanced
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript generics from basic to advanced concepts
// Understand how to create reusable, type-safe components
// Practice using generics in functions, classes, and interfaces
// Learn about generic constraints, conditional types, and utility types
//
// WHAT WE DID:
// - Demonstrated basic generic functions and type parameters
// - Showed intermediate generic classes and interfaces
// - Explored advanced generic constraints and conditional types
// - Provided practical examples with real-world applications
// - Included questions for each difficulty level

// ===== BASIC GENERICS =====
//
// QUESTION 1: Basic Generic Function
// Create a generic function called 'identity' that takes any type and returns the same type.
// The function should maintain type safety - if you pass a string, it should return a string.
// This demonstrates the most basic use of generics for type preservation.

// SOLUTION 1: Basic Generic Function
function identity<T>(value: T): T {
  return value;
}

// Usage examples
const stringResult: string = identity("hello");
const numberResult: number = identity(42);
const booleanResult: boolean = identity(true);
const arrayResult: string[] = identity(["apple", "banana"]);

console.log("String identity:", stringResult);
console.log("Number identity:", numberResult);
console.log("Boolean identity:", booleanResult);
console.log("Array identity:", arrayResult);

// QUESTION 2: Generic Array Function
// Create a generic function called 'getFirstElement' that takes an array of any type
// and returns the first element of that array. Handle the case where the array might be empty.
// This demonstrates generics with array types and optional return values.

// SOLUTION 2: Generic Array Function
function getFirstElement<T>(array: T[]): T | undefined {
  return array.length > 0 ? array[0] : undefined;
}

// Usage examples
const firstString = getFirstElement(["hello", "world"]);
const firstNumber = getFirstElement([1, 2, 3, 4, 5]);
const firstObject = getFirstElement([{ name: "John" }, { name: "Jane" }]);
const emptyArray = getFirstElement([]);

console.log("First string:", firstString);
console.log("First number:", firstNumber);
console.log("First object:", firstObject);
console.log("Empty array result:", emptyArray);

// QUESTION 3: Generic Pair Function
// Create a generic function called 'createPair' that takes two values of potentially different types
// and returns them as a tuple [first, second]. This demonstrates generics with multiple type parameters.

// SOLUTION 3: Generic Pair Function
function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Usage examples
const stringNumberPair = createPair("hello", 42);
const booleanStringPair = createPair(true, "world");
const objectArrayPair = createPair({ id: 1 }, [1, 2, 3]);

console.log("String-number pair:", stringNumberPair);
console.log("Boolean-string pair:", booleanStringPair);
console.log("Object-array pair:", objectArrayPair);

// ===== INTERMEDIATE GENERICS =====
//
// QUESTION 1: Generic Class
// Create a generic class called 'Box' that can hold any type of value.
// The class should have methods to get the value, set the value, and check if the box is empty.
// This demonstrates generics in class definitions and method signatures.

// SOLUTION 1: Generic Class
class Box<T> {
  private content: T | undefined;

  constructor(initialContent?: T) {
    this.content = initialContent;
  }

  getValue(): T | undefined {
    return this.content;
  }

  setValue(newValue: T): void {
    this.content = newValue;
  }

  isEmpty(): boolean {
    return this.content === undefined;
  }

  clear(): void {
    this.content = undefined;
  }
}

// Usage examples
const stringBox = new Box<string>("hello");
const numberBox = new Box<number>(42);
const emptyBox = new Box<boolean>();

console.log("String box value:", stringBox.getValue());
console.log("Number box value:", numberBox.getValue());
console.log("Empty box is empty:", emptyBox.isEmpty());

stringBox.setValue("world");
emptyBox.setValue(true);

console.log("Updated string box:", stringBox.getValue());
console.log(
  "Empty box after setting:",
  emptyBox.getValue(),
  "Is empty:",
  emptyBox.isEmpty(),
);

// QUESTION 2: Generic Interface
// Create a generic interface called 'Repository' that defines CRUD operations
// for any entity type. Then implement a 'MemoryRepository' class that implements this interface.
// This demonstrates generic interfaces and their implementations.

// SOLUTION 2: Generic Interface and Implementation
interface Repository<T> {
  create(entity: T): T;
  findById(id: string): T | undefined;
  findAll(): T[];
  update(id: string, updates: Partial<T>): T | undefined;
  delete(id: string): boolean;
}

interface GenericIdentifiable {
  id: string;
}

class GenericMemoryRepository<
  T extends GenericIdentifiable,
> implements Repository<T> {
  private entities: Map<string, T> = new Map();

  create(entity: T): T {
    if (!entity.id) {
      entity.id = this.generateId();
    }
    this.entities.set(entity.id, entity);
    return entity;
  }

  findById(id: string): T | undefined {
    return this.entities.get(id);
  }

  findAll(): T[] {
    return Array.from(this.entities.values());
  }

  update(id: string, updates: Partial<T>): T | undefined {
    const entity = this.entities.get(id);
    if (entity) {
      const updatedEntity = { ...entity, ...updates };
      this.entities.set(id, updatedEntity);
      return updatedEntity;
    }
    return undefined;
  }

  delete(id: string): boolean {
    return this.entities.delete(id);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}

// Usage examples
interface GenericUser extends GenericIdentifiable {
  name: string;
  email: string;
  age?: number;
}

const genericUserRepository = new GenericMemoryRepository<GenericUser>();

const genericUser1 = genericUserRepository.create({
  id: "generated-id-1",
  name: "John Doe",
  email: "john@example.com",
  age: 30,
});

const genericUser2 = genericUserRepository.create({
  id: "custom-id",
  name: "Jane Smith",
  email: "jane@example.com",
});

console.log("Created users:", genericUserRepository.findAll());
console.log(
  "Found user by ID:",
  genericUserRepository.findById(genericUser1.id),
);
console.log(
  "Updated user:",
  genericUserRepository.update(genericUser1.id, { age: 31 }),
);
console.log("Delete user:", genericUserRepository.delete(genericUser2.id));
console.log("Remaining users:", genericUserRepository.findAll());

// QUESTION 3: Generic Function with Constraints
// Create a generic function called 'calculateTotal' that works with any type
// that has a 'price' property of type number. The function should accept an array
// of such items and return the total price. This demonstrates generic constraints.

// SOLUTION 3: Generic Function with Constraints
interface Priced {
  price: number;
}

function calculateTotal<T extends Priced>(items: T[]): number {
  return items.reduce((total, item) => total + item.price, 0);
}

// Usage examples
interface GenericProduct extends Priced {
  name: string;
  category: string;
}

interface GenericService extends Priced {
  name: string;
  duration: number;
}

const genericProducts: GenericProduct[] = [
  { name: "Laptop", price: 999.99, category: "Electronics" },
  { name: "Mouse", price: 29.99, category: "Electronics" },
  { name: "Keyboard", price: 79.99, category: "Electronics" },
];

const genericServices: GenericService[] = [
  { name: "Consulting", price: 150, duration: 60 },
  { name: "Support", price: 50, duration: 30 },
];

console.log("Products total:", calculateTotal(genericProducts));
console.log("Services total:", calculateTotal(genericServices));

// ===== ADVANCED GENERICS =====
//
// QUESTION 1: Generic Utility Types
// Create generic utility types: 'Partial<T>', 'Required<T>', and 'Pick<T, K>'.
// Then create a function that uses these utility types to update objects safely.
// This demonstrates advanced generic type manipulation and utility type creation.

// SOLUTION 1: Generic Utility Types
// TypeScript already provides these, but let's create our own versions for understanding

type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};

type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Function using utility types
function updateEntity<T, K extends keyof T>(
  entity: T,
  updates: MyPick<T, K>,
): T {
  return { ...entity, ...updates };
}

function makePartial<T>(entity: T): MyPartial<T> {
  return entity;
}

function makeRequired<T>(partial: MyPartial<T>): MyRequired<T> {
  // In real usage, this would validate that all required fields are present
  return partial as MyRequired<T>;
}

// Usage examples
interface GenericUserProfile {
  id: string;
  name: string;
  email: string;
  age?: number;
  address?: {
    street: string;
    city: string;
    country: string;
  };
}

const genericUserProfile: GenericUserProfile = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
};

// Update using Pick utility
const genericUpdatedProfile = updateEntity(genericUserProfile, {
  name: "Jane Doe",
  age: 25,
});

console.log("Updated profile:", genericUpdatedProfile);

// Create partial
const genericPartialProfile = makePartial(genericUserProfile);
genericPartialProfile.age = 30;
genericPartialProfile.address = {
  street: "123 Main St",
  city: "New York",
  country: "USA",
};

console.log("Partial profile:", genericPartialProfile);

// QUESTION 2: Conditional Generic Types
// Create a generic type called 'ApiResponse' that changes its structure based on
// whether the operation was successful or not. Use conditional types to handle
// success and error cases differently. This demonstrates conditional generic types.

// SOLUTION 2: Conditional Generic Types
type GenericApiResponse<T, E = string> =
  | {
      success: true;
      data: T;
      message?: string;
    }
  | {
      success: false;
      error: E;
      message?: string;
    };

// Conditional type based on success
type GenericSuccessResponse<T> = GenericApiResponse<T> & { success: true };
type GenericErrorResponse<E = string> = GenericApiResponse<never, E> & {
  success: false;
};

// Helper functions to create responses
function createGenericSuccessResponse<T>(
  data: T,
  message?: string,
): GenericSuccessResponse<T> {
  return {
    success: true,
    data,
    message,
  };
}

function createGenericErrorResponse<E>(
  error: E,
  message?: string,
): GenericErrorResponse<E> {
  const response: GenericErrorResponse<E> = {
    success: false,
    error,
  };
  if (message) {
    response.message = message;
  }
  return response;
}

// Generic function that handles responses
function handleGenericApiResponse<T, E>(
  response: GenericApiResponse<T, E>,
  onSuccess: (data: T) => void,
  onError: (error: E) => void,
): void {
  if (response.success) {
    onSuccess(response.data);
  } else {
    onError(response.error);
  }
}

// Usage examples
interface GenericApiUser {
  id: string;
  name: string;
  email: string;
}

const genericSuccessResponse = createGenericSuccessResponse<GenericApiUser>(
  { id: "1", name: "John Doe", email: "john@example.com" },
  "User retrieved successfully",
);

const genericErrorResponse = createGenericErrorResponse<string>(
  "User not found",
  "Failed to retrieve user",
);

console.log("Success response:", genericSuccessResponse);
console.log("Error response:", genericErrorResponse);

// Handle responses
handleGenericApiResponse(
  genericSuccessResponse,
  (user) => console.log("User data:", user),
  (error) => console.log("Error:", error),
);

handleGenericApiResponse(
  genericErrorResponse,
  (user) => console.log("User data:", user),
  (error) => console.log("Error:", error),
);

// QUESTION 3: Advanced Generic Constraints and Mapped Types
// Create a generic function called 'validateObject' that validates an object against
// a schema defined as a generic type. Use advanced generic constraints and mapped types
// to ensure type safety. This demonstrates complex generic type manipulation.

// SOLUTION 3: Advanced Generic Constraints and Mapped Types

// Define validation schema type
type ValidationSchema<T> = {
  [K in keyof T]: {
    required?: boolean;
    type?: "string" | "number" | "boolean" | "object" | "array";
    validator?: (value: any) => boolean;
    message?: string;
  };
};

// Validation result type
type GenericValidationResult<T> = {
  isValid: boolean;
  errors: Partial<Record<keyof T, string[]>>;
  data?: T;
};

// Generic validation function
function validateGenericObject<T extends Record<string, any>>(
  obj: any,
  schema: ValidationSchema<T>,
): GenericValidationResult<T> {
  const errors: Partial<Record<keyof T, string[]>> = {};
  const validatedData: Partial<T> = {};

  // Check each field in the schema
  for (const key in schema) {
    const fieldSchema = schema[key];
    const value = obj[key];

    // Check if required field is missing
    if (fieldSchema.required && (value === undefined || value === null)) {
      if (!errors[key]) errors[key] = [];
      errors[key]!.push(fieldSchema.message || `${key} is required`);
      continue;
    }

    // Skip validation if field is not provided and not required
    if (value === undefined || value === null) {
      continue;
    }

    // Type validation
    if (fieldSchema.type) {
      const expectedType = fieldSchema.type;
      let isValidType = false;

      switch (expectedType) {
        case "string":
          isValidType = typeof value === "string";
          break;
        case "number":
          isValidType = typeof value === "number" && !isNaN(value);
          break;
        case "boolean":
          isValidType = typeof value === "boolean";
          break;
        case "object":
          isValidType = typeof value === "object" && !Array.isArray(value);
          break;
        case "array":
          isValidType = Array.isArray(value);
          break;
      }

      if (!isValidType) {
        if (!errors[key]) errors[key] = [];
        errors[key]!.push(
          fieldSchema.message || `${key} must be of type ${expectedType}`,
        );
        continue;
      }
    }

    // Custom validator
    if (fieldSchema.validator && !fieldSchema.validator(value)) {
      if (!errors[key]) errors[key] = [];
      errors[key]!.push(fieldSchema.message || `${key} failed validation`);
      continue;
    }

    // If all validations pass, add to validated data
    (validatedData as any)[key] = value;
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    data: isValid ? (validatedData as T) : undefined,
  };
}

// Usage examples
interface RegistrationForm {
  username: string;
  email: string;
  age: number;
  password: string;
  preferences?: {
    newsletter: boolean;
    theme: string;
  };
}

const registrationSchema: ValidationSchema<RegistrationForm> = {
  username: {
    required: true,
    type: "string",
    validator: (value) => value.length >= 3,
    message: "Username must be at least 3 characters long",
  },
  email: {
    required: true,
    type: "string",
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: "Invalid email format",
  },
  age: {
    required: true,
    type: "number",
    validator: (value) => value >= 18 && value <= 120,
    message: "Age must be between 18 and 120",
  },
  password: {
    required: true,
    type: "string",
    validator: (value) => value.length >= 8,
    message: "Password must be at least 8 characters long",
  },
  preferences: {
    required: false,
    type: "object",
  },
};

// Test validation
const validForm = {
  username: "johndoe",
  email: "john@example.com",
  age: 25,
  password: "securepassword123",
  preferences: {
    newsletter: true,
    theme: "dark",
  },
};

const invalidForm = {
  username: "jd",
  email: "invalid-email",
  age: 15,
  password: "123",
};

console.log(
  "Valid form validation:",
  validateGenericObject(validForm, registrationSchema),
);
console.log(
  "Invalid form validation:",
  validateGenericObject(invalidForm, registrationSchema),
);

// ===== PRACTICAL EXAMPLES =====

// Example 1: Generic API Client
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<GenericApiResponse<T>> {
    try {
      // Simulate API call
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      const data = await response.json();

      if (response.ok) {
        return createGenericSuccessResponse(data);
      } else {
        return createGenericErrorResponse(data.error || "Request failed");
      }
    } catch (error) {
      return createGenericErrorResponse(error as string);
    }
  }

  async post<T, B = any>(
    endpoint: string,
    body: B,
  ): Promise<GenericApiResponse<T>> {
    try {
      // Simulate API call
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (response.ok) {
        return createGenericSuccessResponse(data);
      } else {
        return createGenericErrorResponse(data.error || "Request failed");
      }
    } catch (error) {
      return createGenericErrorResponse(error as string);
    }
  }
}

// Example 2: Generic Event System
type GenericEventCallback<T = any> = (data: T) => void;

class GenericEventEmitter {
  private events: Map<string, GenericEventCallback[]> = new Map();

  on<T>(event: string, callback: GenericEventCallback<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)!.push(callback);
  }

  emit<T>(event: string, data: T): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      callbacks.forEach((callback) => callback(data));
    }
  }

  off(event: string, callback: GenericEventCallback): void {
    const callbacks = this.events.get(event);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }
}

// Example 3: Generic Cache
class GenericCache<K, V> {
  private cache: Map<K, V> = new Map();
  private maxSize: number;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
  }

  set(key: K, value: V): void {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  get(key: K): V | undefined {
    return this.cache.get(key);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

// Usage examples for practical examples
const genericUserCache = new GenericCache<string, GenericApiUser>();
genericUserCache.set("user1", {
  id: "1",
  name: "John",
  email: "john@example.com",
});
console.log("Cached user:", genericUserCache.get("user1"));

const genericEventEmitter = new GenericEventEmitter();
genericEventEmitter.on<{ message: string }>("message", (data) => {
  console.log("Received message:", data.message);
});
genericEventEmitter.emit("message", { message: "Hello, generics!" });

// Summary: This exercise demonstrates:
// - Basic generics: type parameters, generic functions, multiple type parameters
// - Intermediate generics: generic classes, interfaces, constraints
// - Advanced generics: utility types, conditional types, mapped types
// - Practical applications: API clients, event systems, caching
// - Type safety and reusability through generics
// - Complex type manipulation and validation
