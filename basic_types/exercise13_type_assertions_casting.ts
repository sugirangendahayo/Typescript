// EXERCISE 13: Type Assertions and Type Casting
// 
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's type assertions (as operator and angle brackets)
// Understand type casting and conversion techniques
// Practice safe type assertion patterns and runtime validation
// Learn about the differences between assertions and type guards
//
// WHAT WE DID:
// - Demonstrated type assertions using 'as' and angle bracket syntax
// - Showed type casting techniques and conversion patterns
// - Explained safe vs unsafe type assertions
// - Demonstrated runtime validation with assertions
// - Showed practical applications and best practices

// ===== BASIC TYPE ASSERTIONS =====
//
// QUESTION 1: Basic Type Assertions
// Create examples showing basic type assertions using both 'as' operator and angle brackets.
// Demonstrate when to use each syntax and their limitations.

// SOLUTION 1: Basic Type Assertions
// Using 'as' operator (preferred in JSX/TSX)
let someValue: unknown = "hello world";
let strLength: number = (someValue as string).length;

// Using angle bracket syntax (not allowed in JSX/TSX)
let anotherValue: unknown = "typescript";
let strLength2: number = (<string>anotherValue).length;

console.log("String lengths:", strLength, strLength2);

// Assertions with different types
let unknownValue: unknown = 42;
let numValue: number = unknownValue as number;
let strValue: string = unknownValue as string; // Unsafe - will crash at runtime

console.log("Number value:", numValue);
// console.log("String value:", strValue); // This would crash at runtime

// Assertions with interfaces
interface Person {
    name: string;
    age: number;
}

let unknownPerson: unknown = { name: "John", age: 30 };
let person: Person = unknownPerson as Person;

console.log("Person:", person);

// QUESTION 2: Type Assertions with Arrays
// Create examples showing type assertions with arrays and complex data structures.
// Demonstrate how to assert array types and nested structures.

// SOLUTION 2: Type Assertions with Arrays
// Asserting array types
let unknownArray: unknown = [1, 2, 3, 4, 5];
let numberArray: number[] = unknownArray as number[];

let mixedArray: unknown = ["hello", 42, true, { name: "John" }];
let anyArray: any[] = mixedArray as any[];

console.log("Number array:", numberArray);
console.log("Mixed array:", anyArray);

// Asserting nested structures
interface User {
    id: number;
    name: string;
    profile: {
        email: string;
        settings: {
            theme: string;
            notifications: boolean;
        };
    };
}

let unknownUser: unknown = {
    id: 1,
    name: "Jane",
    profile: {
        email: "jane@example.com",
        settings: {
            theme: "dark",
            notifications: true
        }
    }
};

let user: User = unknownUser as User;
console.log("User theme:", user.profile.settings.theme);

// QUESTION 3: Type Assertions with Functions
// Create examples showing type assertions in function contexts.
// Demonstrate assertions with function parameters and return values.

// SOLUTION 3: Type Assertions with Functions
// Function parameter assertions
function processApiResponse(data: unknown): void {
    const response = data as { success: boolean; data?: any; error?: string };
    
    if (response.success && response.data) {
        console.log("Success:", response.data);
    } else if (response.error) {
        console.log("Error:", response.error);
    }
}

// Function return type assertions
function getRandomElement<T>(array: unknown[]): T {
    return (array as T[])[Math.floor(Math.random() * array.length)];
}

// Usage examples
const apiResponse = {
    success: true,
    data: { message: "Operation completed" }
};

processApiResponse(apiResponse);

const stringArray = ["apple", "banana", "cherry"];
const randomFruit = getRandomElement<string>(stringArray);
console.log("Random fruit:", randomFruit);

// ===== INTERMEDIATE TYPE CASTING =====
//
// QUESTION 1: Safe Type Casting
// Create examples showing safe type casting with runtime validation.
// Demonstrate how to combine type assertions with runtime checks.

// SOLUTION 1: Safe Type Casting
// Safe casting function with validation
function safeCast<T>(
    value: unknown,
    validator: (val: unknown) => val is T
): T | null {
    return validator(value) ? value : null;
}

// Type guard functions
function isString(value: unknown): value is string {
    return typeof value === "string";
}

function isNumber(value: unknown): value is number {
    return typeof value === "number" && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
    return typeof value === "boolean";
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Usage examples
const unknownValue1: unknown = "hello";
const unknownValue2: unknown = 42;
const unknownValue3: unknown = { name: "John", age: 30 };

const safeString = safeCast(unknownValue1, isString);
const safeNumber = safeCast(unknownValue2, isNumber);
const safeObject = safeCast(unknownValue3, isObject);

console.log("Safe casts:", safeString, safeNumber, safeObject);

// QUESTION 2: Type Casting with Union Types
// Create examples showing type casting with union types.
// Demonstrate discriminated unions and type narrowing.

// SOLUTION 2: Type Casting with Union Types
interface LoadingState {
    status: "loading";
}

interface SuccessState<T> {
    status: "success";
    data: T;
}

interface ErrorState {
    status: "error";
    error: string;
}

type AsyncState<T> = LoadingState | SuccessState<T> | ErrorState;

// Safe casting with discriminated unions
function castToSuccessState<T>(
    state: AsyncState<T>
): SuccessState<T> | null {
    return state.status === "success" ? state : null;
}

function castToErrorState<T>(
    state: AsyncState<T>
): ErrorState | null {
    return state.status === "error" ? state : null;
}

// Usage examples
const loadingState: AsyncState<string> = { status: "loading" };
const successState: AsyncState<string> = { status: "success", data: "Hello" };
const errorState: AsyncState<string> = { status: "error", error: "Failed" };

console.log("Success state:", castToSuccessState(successState));
console.log("Error state:", castToErrorState(errorState));
console.log("Loading as success:", castToSuccessState(loadingState));

// QUESTION 3: Type Casting with Generics
// Create examples showing type casting in generic contexts.
// Demonstrate generic casting functions and constraints.

// SOLUTION 3: Type Casting with Generics
// Generic casting function
function castToType<T>(value: unknown): T {
    return value as T;
}

// Generic casting with validation
function safeCastToType<T>(
    value: unknown,
    typeCheck: (val: unknown) => boolean
): T | null {
    return typeCheck(value) ? (value as T) : null;
}

// Generic interface for casting
interface Castable<T> {
    cast<U>(this: T, type: new (...args: any[]) => U): U;
    safeCast<U>(this: T, validator: (val: unknown) => val is U): U | null;
}

// Implement castable interface
declare global {
    interface Unknown extends Castable<unknown> {}
}

// Usage examples
const unknownData: unknown = { message: "Hello, World!" };

// Unsafe casting
const castedObject = castToType<{ message: string }>(unknownData);
console.log("Casted object:", castedObject);

// Safe casting
const safeCastedObject = safeCastToType<{ message: string }>(
    unknownData,
    (val): val is { message: string } => 
        typeof val === "object" && val !== null && "message" in val
);

console.log("Safely casted object:", safeCastedObject);

// ===== ADVANCED TYPE ASSERTIONS =====
//
// QUESTION 1: Assertion Functions
// Create examples showing assertion functions for runtime validation.
// Demonstrate custom assertion functions and error handling.

// SOLUTION 1: Assertion Functions
// Basic assertion function
function assert(condition: boolean, message: string): asserts condition {
    if (!condition) {
        throw new Error(message);
    }
}

// Type assertion function
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== "string") {
        throw new Error("Value is not a string");
    }
}

function assertIsNumber(value: unknown): asserts value is number {
    if (typeof value !== "number" || isNaN(value)) {
        throw new Error("Value is not a valid number");
    }
}

function assertIsArray<T>(value: unknown, itemGuard: (item: unknown) => item is T): asserts value is T[] {
    if (!Array.isArray(value)) {
        throw new Error("Value is not an array");
    }
    if (!value.every(itemGuard)) {
        throw new Error("Array contains invalid items");
    }
}

// Usage examples
function processValue(value: unknown): void {
    assertIsString(value);
    // After this assertion, TypeScript knows value is string
    console.log("Uppercase:", value.toUpperCase());
}

function processNumber(value: unknown): number {
    assertIsNumber(value);
    // After this assertion, TypeScript knows value is number
    return value * 2;
}

function processStringArray(value: unknown): string[] {
    assertIsArray(value, isString);
    // After this assertion, TypeScript knows value is string[]
    return value.map(s => s.toUpperCase());
}

// Usage
try {
    processValue("hello");
    console.log("Doubled number:", processNumber(21));
    console.log("Processed array:", processStringArray(["a", "b", "c"]));
    
    // These would throw errors:
    // processValue(42);
    // processNumber("not a number");
    // processStringArray([1, 2, 3]);
} catch (error) {
    console.error("Assertion error:", error);
}

// QUESTION 2: Const Assertions
// Create examples showing const assertions for immutable types.
// Demonstrate readonly arrays, objects, and literal types.

// SOLUTION 2: Const Assertions
// Regular array (mutable)
const regularArray = [1, 2, 3];
regularArray.push(4); // Allowed

// Const assertion (immutable)
const constArray = [1, 2, 3] as const;
// constArray.push(4); // Error: Property 'push' does not exist on readonly

// Regular object (mutable)
const regularObject = { x: 1, y: 2 };
regularObject.x = 3; // Allowed

// Const assertion object (immutable)
const constObject = { x: 1, y: 2 } as const;
// constObject.x = 3; // Error: Cannot assign to 'x' because it is read-only

// Const assertions with literal types
const regularString = "hello";
let mutableString: string = regularString; // Allowed

const constString = "hello" as const;
let immutableString: "hello" = constString; // Must be exactly "hello"

// Const assertions with unions
const directions = ["north", "south", "east", "west"] as const;
type Direction = typeof directions[number]; // "north" | "south" | "east" | "west"

function getDirection(dir: Direction): void {
    console.log("Direction:", dir);
}

getDirection("north");
// getDirection("northeast"); // Error: Argument of type '"northeast"' is not assignable to parameter of type 'Direction'

// QUESTION 3: Type Assertion Patterns
// Create examples showing advanced type assertion patterns.
// Demonstrate assertion chains, conditional assertions, and assertion utilities.

// SOLUTION 3: Type Assertion Patterns
// Assertion chain utility
class AssertionChain<T> {
    constructor(private value: T) {}

    is<U>(guard: (value: T) => value is U): AssertionChain<U> {
        assert(guard(this.value), "Type assertion failed");
        return new AssertionChain(this.value);
    }

    notNull(): AssertionChain<NonNullable<T>> {
        assert(this.value != null, "Value is null or undefined");
        return new AssertionChain(this.value!);
    }

    get(): T {
        return this.value;
    }
}

// Usage
function processComplexValue(value: unknown): string {
    return new AssertionChain(value)
        .notNull()
        .is((v): v is Record<string, unknown> => typeof v === "object" && v !== null)
        .is((v): v is { name: string; age: number } => 
            typeof v.name === "string" && typeof v.age === "number"
        )
        .get()
        .name
        .toUpperCase();
}

// Conditional assertion utility
function conditionalAssert<T, U>(
    value: T,
    condition: (value: T) => value is U,
    errorMessage: string
): U {
    assert(condition(value), errorMessage);
    return value;
}

// Assertion factory
function createValidator<T>(validator: (value: unknown) => value is T) {
    return (value: unknown): T => {
        assert(validator(value), "Validation failed");
        return value;
    };
}

// Usage examples
const validateString = createValidator(isString);
const validateNumber = createValidator(isNumber);
const validateObject = createValidator(isObject);

try {
    const validatedString = validateString("hello");
    const validatedNumber = validateNumber(42);
    const validatedObject = validateObject({ key: "value" });
    
    console.log("Validated:", validatedString, validatedNumber, validatedObject);
    
    console.log("Complex processing:", processComplexValue({ name: "John", age: 30 }));
} catch (error) {
    console.error("Validation error:", error);
}

// ===== PRACTICAL EXAMPLES =====

// Example 1: API Response Handler
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    timestamp?: string;
}

class ApiHandler {
    static handleResponse<T>(response: unknown): ApiResponse<T> {
        // Assert response is object
        assert(typeof response === "object" && response !== null, "Response must be an object");
        
        const obj = response as Record<string, unknown>;
        
        // Assert required properties
        assert(typeof obj.success === "boolean", "Response must have success property");
        
        const apiResponse: ApiResponse<T> = {
            success: obj.success
        };
        
        // Add data if present
        if (obj.data !== undefined) {
            apiResponse.data = obj.data as T;
        }
        
        // Add error if present
        if (obj.error !== undefined) {
            assert(typeof obj.error === "string", "Error must be string");
            apiResponse.error = obj.error;
        }
        
        // Add timestamp if present
        if (obj.timestamp !== undefined) {
            assert(typeof obj.timestamp === "string", "Timestamp must be string");
            apiResponse.timestamp = obj.timestamp;
        }
        
        return apiResponse;
    }
    
    static extractData<T>(response: unknown): T {
        const apiResponse = this.handleResponse<T>(response);
        assert(apiResponse.success, "Response must be successful");
        assert(apiResponse.data !== undefined, "Response must have data");
        return apiResponse.data;
    }
}

// Usage
const rawResponse = {
    success: true,
    data: { id: 1, name: "John" },
    timestamp: "2024-01-01T00:00:00Z"
};

const handledResponse = ApiHandler.handleResponse<{ id: number; name: string }>(rawResponse);
console.log("Handled response:", handledResponse);

const extractedData = ApiHandler.extractData<{ id: number; name: string }>(rawResponse);
console.log("Extracted data:", extractedData);

// Example 2: Configuration Manager
interface Config {
    apiUrl: string;
    timeout: number;
    retries: number;
    features: {
        analytics: boolean;
        notifications: boolean;
    };
}

class ConfigManager {
    private static validateConfig(config: unknown): Config {
        assert(typeof config === "object" && config !== null, "Config must be object");
        
        const obj = config as Record<string, unknown>;
        
        // Validate required properties
        assert(typeof obj.apiUrl === "string", "apiUrl must be string");
        assert(typeof obj.timeout === "number", "timeout must be number");
        assert(typeof obj.retries === "number", "retries must be number");
        assert(typeof obj.features === "object" && obj.features !== null, "features must be object");
        
        const features = obj.features as Record<string, unknown>;
        assert(typeof features.analytics === "boolean", "analytics must be boolean");
        assert(typeof features.notifications === "boolean", "notifications must be boolean");
        
        return {
            apiUrl: obj.apiUrl,
            timeout: obj.timeout,
            retries: obj.retries,
            features: {
                analytics: features.analytics,
                notifications: features.notifications
            }
        };
    }
    
    static load(config: unknown): Config {
        return this.validateConfig(config);
    }
    
    static merge(base: Config, override: unknown): Config {
        const overrideConfig = this.validateConfig(override);
        
        return {
            ...base,
            ...overrideConfig,
            features: {
                ...base.features,
                ...overrideConfig.features
            }
        };
    }
}

// Usage
const baseConfig: Config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3,
    features: {
        analytics: false,
        notifications: true
    }
};

const configOverride = {
    timeout: 10000,
    features: {
        analytics: true
    }
};

const mergedConfig = ConfigManager.merge(baseConfig, configOverride);
console.log("Merged config:", mergedConfig);

// Example 3: Type-Safe Event System
type EventData = Record<string, unknown>;

interface Event<T extends EventData = EventData> {
    type: string;
    payload: T;
    timestamp: number;
}

class EventValidator {
    static validateEvent<T extends EventData>(
        event: unknown,
        expectedType: string,
        payloadValidator: (payload: unknown) => payload is T
    ): Event<T> {
        assert(typeof event === "object" && event !== null, "Event must be object");
        
        const obj = event as Record<string, unknown>;
        
        assert(typeof obj.type === "string", "Event must have type");
        assert(obj.type === expectedType, `Event type must be ${expectedType}`);
        assert(typeof obj.payload !== "undefined", "Event must have payload");
        assert(typeof obj.timestamp === "number", "Event must have timestamp");
        
        assert(payloadValidator(obj.payload), "Invalid payload");
        
        return {
            type: obj.type,
            payload: obj.payload as T,
            timestamp: obj.timestamp
        };
    }
}

// Usage
interface UserEventPayload {
    userId: string;
    action: string;
}

interface SystemEventPayload {
    component: string;
    status: string;
}

const userEvent = {
    type: "user_action",
    payload: { userId: "123", action: "login" },
    timestamp: Date.now()
};

const systemEvent = {
    type: "system_status",
    payload: { component: "database", status: "online" },
    timestamp: Date.now()
};

const validatedUserEvent = EventValidator.validateEvent<UserEventPayload>(
    userEvent,
    "user_action",
    (payload): payload is UserEventPayload =>
        typeof payload === "object" &&
        typeof (payload as any).userId === "string" &&
        typeof (payload as any).action === "string"
);

const validatedSystemEvent = EventValidator.validateEvent<SystemEventPayload>(
    systemEvent,
    "system_status",
    (payload): payload is SystemEventPayload =>
        typeof payload === "object" &&
        typeof (payload as any).component === "string" &&
        typeof (payload as any).status === "string"
);

console.log("Validated user event:", validatedUserEvent);
console.log("Validated system event:", validatedSystemEvent);

// Example 4: Type-Safe Form Handler
interface FormData {
    [key: string]: unknown;
}

interface ValidationRule<T> {
    validate: (value: unknown) => value is T;
    transform?: (value: T) => T;
    message: string;
}

interface FormSchema<T extends Record<string, unknown>> {
    [K in keyof T]: ValidationRule<T[K]>;
}

class FormHandler<T extends Record<string, unknown>> {
    constructor(private schema: FormSchema<T>) {}
    
    validate(data: FormData): T {
        const result: Partial<T> = {};
        
        for (const key in this.schema) {
            const rule = this.schema[key];
            const value = data[key];
            
            if (!rule.validate(value)) {
                throw new Error(`${key}: ${rule.message}`);
            }
            
            const validatedValue = value as T[Extract<keyof T, string>];
            result[key] = rule.transform ? rule.transform(validatedValue) : validatedValue;
        }
        
        return result as T;
    }
    
    safeValidate(data: FormData): T | { error: string; field: string } {
        try {
            return this.validate(data);
        } catch (error) {
            if (error instanceof Error) {
                const [field, message] = error.message.split(": ");
                return { error: message, field };
            }
            return { error: "Unknown validation error", field: "unknown" };
        }
    }
}

// Usage
interface UserForm {
    name: string;
    age: number;
    email: string;
    subscribe: boolean;
}

const userFormSchema: FormSchema<UserForm> = {
    name: {
        validate: (value): value is string => typeof value === "string" && value.length > 0,
        transform: (value) => value.trim(),
        message: "Name is required and must be non-empty"
    },
    age: {
        validate: (value): value is number => typeof value === "number" && value >= 18 && value <= 120,
        message: "Age must be between 18 and 120"
    },
    email: {
        validate: (value): value is string => 
            typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        transform: (value) => value.toLowerCase(),
        message: "Valid email is required"
    },
    subscribe: {
        validate: (value): value is boolean => typeof value === "boolean",
        message: "Subscribe must be a boolean"
    }
};

const formHandler = new FormHandler(userFormSchema);

const formData: FormData = {
    name: "  John Doe  ",
    age: 25,
    email: "John@EXAMPLE.COM",
    subscribe: true
};

try {
    const validatedForm = formHandler.validate(formData);
    console.log("Validated form:", validatedForm);
} catch (error) {
    console.error("Form validation error:", error);
}

// Example 5: Type-Safe Database Query Builder
interface QueryResult<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
}

class QueryBuilder<T> {
    private conditions: ((item: T) => boolean)[] = [];
    
    where(condition: (item: T) => boolean): this {
        this.conditions.push(condition);
        return this;
    }
    
    execute(data: unknown[]): QueryResult<T> {
        assert(Array.isArray(data), "Data must be an array");
        
        const typedData = data as unknown[];
        
        // Filter data using conditions
        const filteredData = typedData.filter(item => {
            try {
                return this.conditions.every(condition => condition(item as T));
            } catch {
                return false;
            }
        }) as T[];
        
        return {
            data: filteredData,
            total: filteredData.length,
            page: 1,
            limit: filteredData.length
        };
    }
}

// Usage
interface Product {
    id: number;
    name: string;
    price: number;
    category: string;
    inStock: boolean;
}

const queryBuilder = new QueryBuilder<Product>();

const products: unknown[] = [
    { id: 1, name: "Laptop", price: 999, category: "Electronics", inStock: true },
    { id: 2, name: "Mouse", price: 29, category: "Electronics", inStock: false },
    { id: 3, name: "Book", price: 19, category: "Books", inStock: true }
];

const result = queryBuilder
    .where(product => (product as Product).price > 50)
    .where(product => (product as Product).inStock)
    .execute(products);

console.log("Query result:", result);

// Summary: This exercise demonstrates:
// - Basic type assertions using 'as' operator and angle brackets
// - Type casting with runtime validation and safety checks
// - Assertion functions for compile-time and runtime validation
// - Const assertions for immutable types and literal types
// - Advanced assertion patterns and utility functions
// - Practical applications in API handling, configuration, events, forms, and queries
// - Safe vs unsafe type assertions and best practices
// - Type assertion chains and conditional assertions
