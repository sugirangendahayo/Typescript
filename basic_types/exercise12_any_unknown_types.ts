// EXERCISE 12: Any and Unknown Types
// 
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's any and unknown types and their differences
// Understand when to use each type and their implications for type safety
// Practice type narrowing from unknown to specific types
// Learn about best practices and alternatives to using any
//
// WHAT WE DID:
// - Demonstrated the any type and its type-unsafe behavior
// - Showed the unknown type and its type-safe requirements
// - Explained type narrowing techniques from unknown
// - Demonstrated practical applications and best practices
// - Showed alternatives and when to avoid any

// ===== BASIC ANY TYPE =====
//
// QUESTION 1: Understanding Any Type
// Create examples showing how any type bypasses TypeScript's type checking.
// Demonstrate both the flexibility and the dangers of using any type.
// Explain when any might be appropriate and when it should be avoided.

// SOLUTION 1: Understanding Any Type
// Any type completely opts out of type checking
let anyValue: any = 42;

// You can assign any type to any
anyValue = "hello world";
anyValue = true;
anyValue = { name: "John", age: 30 };
anyValue = [1, 2, 3];
anyValue = () => console.log("function");

// You can access any property without type checking
console.log(anyValue.name); // No error, but might be undefined at runtime
console.log(anyValue.length); // No error, but might be undefined at runtime
anyValue.someRandomProperty(); // No error, but will crash at runtime

// You can call any value as a function
anyValue("some argument"); // No error, but will crash if not a function

// Function parameters with any
function processAnyData(data: any): any {
    // No type checking - can do anything with data
    console.log(data.someProperty); // No error
    return data.anotherProperty; // No error
}

// Usage examples
const result1 = processAnyData({ someProperty: "value", anotherProperty: 42 });
const result2 = processAnyData("string"); // Will return undefined
const result3 = processAnyData([1, 2, 3]); // Will return undefined

console.log("Any results:", result1, result2, result3);

// QUESTION 2: Any Type in Arrays and Objects
// Create examples showing any type in complex data structures.
// Demonstrate how any affects type safety in nested structures.

// SOLUTION 2: Any Type in Arrays and Objects
interface AnyConfig {
    settings: any;
    data: any[];
    metadata: Record<string, any>;
}

const anyConfig: AnyConfig = {
    settings: {
        theme: "dark",
        fontSize: 14,
        notifications: true
    },
    data: [
        "string",
        42,
        { nested: "object" },
        [1, 2, 3],
        () => "function"
    ],
    metadata: {
        version: "1.0.0",
        lastUpdated: new Date(),
        features: ["feature1", "feature2"]
    }
};

// No type checking when accessing properties
console.log(anyConfig.settings.invalidProperty); // No error
console.log(anyConfig.data[999]); // No error
console.log(anyConfig.metadata.someKey); // No error

// Function returning any[]
function getAnyData(): any[] {
    return [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" },
        "string item",
        42,
        true
    ];
}

const anyData = getAnyData();
anyData.forEach(item => {
    console.log(item.name); // No error, but might crash on non-objects
    console.log(item.toUpperCase()); // No error, but might crash on non-strings
});

// QUESTION 3: Any Type with Functions
// Create examples showing any type in function signatures and implementations.
// Demonstrate how any affects function parameter and return type safety.

// SOLUTION 3: Any Type with Functions
// Function with any parameters and return type
function anyFunction(param1: any, param2: any): any {
    // Can do anything with parameters
    if (typeof param1 === "string" && typeof param2 === "number") {
        return param1.repeat(param2);
    } else if (Array.isArray(param1)) {
        return param1.map(item => item);
    } else {
        return param1 + param2; // Might not work at runtime
    }
}

// Callback functions with any
function executeAnyCallback(callback: any): void {
    callback("argument1", "argument2"); // No type checking
}

// Usage examples
const anyResult1 = anyFunction("hello", 3);
const anyResult2 = anyFunction([1, 2, 3], "ignored");
const anyResult3 = anyFunction({ a: 1 }, { b: 2 });

console.log("Any function results:", anyResult1, anyResult2, anyResult3);

executeAnyCallback((a: string, b: string) => {
    console.log("Callback:", a, b);
});

executeAnyCallback((x: number, y: number) => {
    console.log("Wrong callback signature:", x + y);
});

// ===== BASIC UNKNOWN TYPE =====
//
// QUESTION 1: Understanding Unknown Type
// Create examples showing how unknown type enforces type checking.
// Demonstrate the difference between any and unknown.

// SOLUTION 1: Understanding Unknown Type
// Unknown type requires type checking before use
let unknownValue: unknown = 42;

// You can assign any type to unknown
unknownValue = "hello world";
unknownValue = true;
unknownValue = { name: "John", age: 30 };
unknownValue = [1, 2, 3];

// But you cannot use unknown without type checking
// console.log(unknownValue.name); // Error: Object is of type 'unknown'
// console.log(unknownValue.length); // Error: Object is of type 'unknown'
// unknownValue(); // Error: Object is of type 'unknown'

// Must use type guards or type assertions
if (typeof unknownValue === "string") {
    console.log(unknownValue.toUpperCase()); // OK: TypeScript knows it's string
} else if (typeof unknownValue === "number") {
    console.log(unknownValue.toFixed(2)); // OK: TypeScript knows it's number
}

// Function parameters with unknown
function processUnknownData(data: unknown): string {
    // Must check type before using data
    if (typeof data === "string") {
        return data.toUpperCase();
    } else if (typeof data === "number") {
        return data.toString();
    } else if (Array.isArray(data)) {
        return `Array with ${data.length} items`;
    } else {
        return "Unknown data type";
    }
}

// Usage examples
console.log(processUnknownData("hello"));
console.log(processUnknownData(42));
console.log(processUnknownData([1, 2, 3]));
console.log(processUnknownData({ name: "John" }));

// QUESTION 2: Type Narrowing from Unknown
// Create examples showing various techniques to narrow unknown types.
// Demonstrate typeof, instanceof, and custom type guards.

// SOLUTION 2: Type Narrowing from Unknown
function processComplexUnknown(data: unknown): void {
    // Using typeof for primitive types
    if (typeof data === "string") {
        console.log("String:", data.toUpperCase());
        return;
    }

    if (typeof data === "number") {
        console.log("Number:", data.toFixed(2));
        return;
    }

    if (typeof data === "boolean") {
        console.log("Boolean:", data ? "TRUE" : "FALSE");
        return;
    }

    // Using Array.isArray for arrays
    if (Array.isArray(data)) {
        console.log("Array:", data.length, "items");
        data.forEach(item => console.log("  Item:", item));
        return;
    }

    // Using instanceof for objects
    if (data instanceof Date) {
        console.log("Date:", data.toISOString());
        return;
    }

    if (data instanceof Error) {
        console.log("Error:", data.message);
        return;
    }

    // Custom type guard for objects
    if (isObject(data)) {
        console.log("Object:", Object.keys(data));
        return;
    }

    console.log("Unknown type:", typeof data);
}

function isObject(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

// Usage examples
processComplexUnknown("hello");
processComplexUnknown(42.567);
processComplexUnknown(true);
processComplexUnknown([1, 2, 3]);
processComplexUnknown(new Date());
processComplexUnknown(new Error("Something went wrong"));
processComplexUnknown({ name: "John", age: 30 });
processComplexUnknown(null);

// QUESTION 3: Unknown in Function Signatures
// Create examples showing unknown type in function parameters and return types.
// Demonstrate safe patterns for handling unknown values.

// SOLUTION 3: Unknown in Function Signatures
// Safe function that accepts unknown
function safeParseJSON(jsonString: unknown): unknown {
    if (typeof jsonString !== "string") {
        return { error: "Input must be a string" };
    }

    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return { error: "Invalid JSON", details: error };
    }
}

// Function returning unknown
function fetchDataFromAPI(): unknown {
    // Simulate API response that could be anything
    return {
        success: true,
        data: { users: ["John", "Jane"] },
        timestamp: new Date().toISOString()
    };
}

// Safe handler for unknown data
function handleAPIResponse(response: unknown): void {
    if (typeof response === "object" && response !== null) {
        const responseObject = response as Record<string, unknown>;
        
        if (responseObject.success === true && responseObject.data) {
            console.log("Success:", responseObject.data);
        } else if (responseObject.error) {
            console.log("Error:", responseObject.error);
        }
    } else {
        console.log("Invalid response format");
    }
}

// Usage examples
const jsonString = '{"name": "John", "age": 30}';
const invalidJson = "invalid json";
const nonString = 42;

console.log(safeParseJSON(jsonString));
console.log(safeParseJSON(invalidJson));
console.log(safeParseJSON(nonString));

const apiResponse = fetchDataFromAPI();
handleAPIResponse(apiResponse);

// ===== INTERMEDIATE ANY VS UNKNOWN =====
//
// QUESTION 1: Migration from Any to Unknown
// Create examples showing how to refactor code from any to unknown.
// Demonstrate the benefits of using unknown over any.

// SOLUTION 1: Migration from Any to Unknown
// Before: Using any (unsafe)
function processUserDataAny(userData: any): any {
    return {
        name: userData.name.toUpperCase(),
        age: userData.age + 1,
        email: userData.email || "no-email@example.com"
    };
}

// After: Using unknown (safe)
function processUserDataUnknown(userData: unknown): { name: string; age: number; email: string } | { error: string } {
    // Validate input structure
    if (!userData || typeof userData !== "object") {
        return { error: "Invalid user data" };
    }

    const user = userData as Record<string, unknown>;

    // Validate each property
    if (typeof user.name !== "string" || typeof user.age !== "number") {
        return { error: "Missing required fields" };
    }

    if (user.email !== undefined && typeof user.email !== "string") {
        return { error: "Invalid email format" };
    }

    return {
        name: user.name.toUpperCase(),
        age: user.age + 1,
        email: user.email || "no-email@example.com"
    };
}

// Usage examples
const validUser = { name: "John", age: 30, email: "john@example.com" };
const invalidUser = { name: "Jane", age: "twenty" };

console.log("Any processing:", processUserDataAny(validUser));
console.log("Any processing (invalid):", processUserDataAny(invalidUser)); // No error, but wrong result

console.log("Unknown processing:", processUserDataUnknown(validUser));
console.log("Unknown processing (invalid):", processUserDataUnknown(invalidUser));

// QUESTION 2: Unknown with Generics
// Create examples showing unknown type in generic functions.
// Demonstrate how unknown can be used safely with generics.

// SOLUTION 2: Unknown with Generics
// Generic function that safely handles unknown input
function safeParseJSONToType<T>(jsonString: unknown): T | { error: string } {
    if (typeof jsonString !== "string") {
        return { error: "Input must be a string" };
    }

    try {
        const parsed = JSON.parse(jsonString);
        return parsed as T;
    } catch (error) {
        return { error: "Invalid JSON", details: error };
    }
}

// Generic validator for unknown data
function validateUnknownType<T>(
    data: unknown,
    validator: (value: unknown) => value is T
): T | { error: string } {
    if (validator(data)) {
        return data;
    } else {
        return { error: "Invalid type" };
    }
}

// Type guard functions
function isUser(data: unknown): data is { name: string; age: number; email?: string } {
    return (
        typeof data === "object" &&
        data !== null &&
        "name" in data &&
        "age" in data &&
        typeof (data as any).name === "string" &&
        typeof (data as any).age === "number"
    );
}

function isProduct(data: unknown): data is { id: string; name: string; price: number } {
    return (
        typeof data === "object" &&
        data !== null &&
        "id" in data &&
        "name" in data &&
        "price" in data &&
        typeof (data as any).id === "string" &&
        typeof (data as any).name === "string" &&
        typeof (data as any).price === "number"
    );
}

// Usage examples
const userJSON = '{"name": "John", "age": 30, "email": "john@example.com"}';
const productJSON = '{"id": "1", "name": "Laptop", "price": 999.99}';

const parsedUser = safeParseJSONToType<{ name: string; age: number; email?: string }>(userJSON);
const parsedProduct = safeParseJSONToType<{ id: string; name: string; price: number }>(productJSON);

console.log("Parsed user:", parsedUser);
console.log("Parsed product:", parsedProduct);

// Validation examples
const unknownData1 = { name: "John", age: 30 };
const unknownData2 = { id: "1", name: "Laptop", price: 999.99 };
const unknownData3 = "invalid data";

console.log("Validated user:", validateUnknownType(unknownData1, isUser));
console.log("Validated product:", validateUnknownType(unknownData2, isProduct));
console.log("Validated invalid:", validateUnknownType(unknownData3, isUser));

// QUESTION 3: Unknown in Class Design
// Create examples showing unknown type in class properties and methods.
// Demonstrate safe patterns for handling unknown in classes.

// SOLUTION 3: Unknown in Class Design
class SafeDataProcessor {
    private data: unknown;

    constructor(data: unknown) {
        this.data = data;
    }

    // Safe getter with type checking
    getData<T>(validator: (value: unknown) => value is T): T | null {
        return validator(this.data) ? this.data : null;
    }

    // Safe setter with validation
    setData(data: unknown, validator?: (value: unknown) => boolean): boolean {
        if (!validator || validator(data)) {
            this.data = data;
            return true;
        }
        return false;
    }

    // Type assertion with runtime check
    getAsString(): string | null {
        return typeof this.data === "string" ? this.data : null;
    }

    getAsNumber(): number | null {
        return typeof this.data === "number" ? this.data : null;
    }

    getAsObject(): Record<string, unknown> | null {
        return typeof this.data === "object" && this.data !== null && !Array.isArray(this.data)
            ? this.data as Record<string, unknown>
            : null;
    }

    getAsArray(): unknown[] | null {
        return Array.isArray(this.data) ? this.data : null;
    }
}

// Usage examples
const processor = new SafeDataProcessor({ name: "John", age: 30 });

console.log("As object:", processor.getAsObject());
console.log("As string:", processor.getAsString());
console.log("As number:", processor.getAsNumber());
console.log("As array:", processor.getAsArray());

// Setting new data
processor.setData("hello world");
console.log("After setting string:", processor.getAsString());

processor.setData([1, 2, 3]);
console.log("After setting array:", processor.getAsArray());

// ===== ADVANCED ANY AND UNKNOWN =====
//
// QUESTION 1: Type Guards for Unknown
// Create sophisticated type guards for complex unknown data.
// Demonstrate nested object validation and array type checking.

// SOLUTION 1: Type Guards for Unknown
interface User {
    id: string;
    name: string;
    email: string;
    profile: {
        age: number;
        address?: {
            street: string;
            city: string;
            country: string;
        };
    };
}

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    tags?: string[];
}

// Complex type guard for User
function isUser(data: unknown): data is User {
    if (!data || typeof data !== "object") return false;
    
    const obj = data as Record<string, unknown>;
    
    return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        typeof obj.profile === "object" &&
        obj.profile !== null &&
        typeof (obj.profile as any).age === "number" &&
        (
            (obj.profile as any).address === undefined ||
            (
                typeof (obj.profile as any).address === "object" &&
                (obj.profile as any).address !== null &&
                typeof (obj.profile as any).address.street === "string" &&
                typeof (obj.profile as any).address.city === "string" &&
                typeof (obj.profile as any).address.country === "string"
            )
        )
    );
}

// Complex type guard for Product
function isProduct(data: unknown): data is Product {
    if (!data || typeof data !== "object") return false;
    
    const obj = data as Record<string, unknown>;
    
    return (
        typeof obj.id === "string" &&
        typeof obj.name === "string" &&
        typeof obj.price === "number" &&
        typeof obj.category === "string" &&
        (
            obj.tags === undefined ||
            (
                Array.isArray(obj.tags) &&
                obj.tags.every(tag => typeof tag === "string")
            )
        )
    );
}

// Generic type guard for arrays
function isArrayOf<T>(
    data: unknown,
    itemGuard: (item: unknown) => item is T
): data is T[] {
    return Array.isArray(data) && data.every(itemGuard);
}

// Usage examples
const unknownData1: unknown = {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profile: {
        age: 30,
        address: {
            street: "123 Main St",
            city: "New York",
            country: "USA"
        }
    }
};

const unknownData2: unknown = {
    id: "2",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    tags: ["computer", "portable"]
};

const unknownData3: unknown = [
    { id: "1", name: "John", email: "john@example.com", profile: { age: 30 } },
    { id: "2", name: "Jane", email: "jane@example.com", profile: { age: 25 } }
];

console.log("Is user:", isUser(unknownData1));
console.log("Is product:", isProduct(unknownData2));
console.log("Is user array:", isArrayOf(unknownData3, isUser));

// QUESTION 2: Unknown with Async Operations
// Create examples showing unknown type in async operations.
// Demonstrate safe handling of API responses and async data.

// SOLUTION 2: Unknown with Async Operations
interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
}

// Safe async function that returns unknown
async function fetchUnknownData(url: string): Promise<unknown> {
    // Simulate API call
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                success: true,
                data: { message: "Data fetched successfully" },
                timestamp: new Date().toISOString()
            });
        }, 1000);
    });
}

// Safe async handler with type validation
async function handleUnknownResponse<T>(
    responsePromise: Promise<unknown>,
    validator: (data: unknown) => data is ApiResponse<T>
): Promise<ApiResponse<T> | { error: string }> {
    try {
        const response = await responsePromise;
        
        if (validator(response)) {
            return response;
        } else {
            return { error: "Invalid response format" };
        }
    } catch (error) {
        return { error: "Request failed", details: error };
    }
}

// Type guard for ApiResponse
function isApiResponse<T>(
    data: unknown,
    dataValidator: (item: unknown) => item is T
): data is ApiResponse<T> {
    if (!data || typeof data !== "object") return false;
    
    const obj = data as Record<string, unknown>;
    
    if (typeof obj.success !== "boolean") return false;
    
    if (obj.success && obj.data !== undefined) {
        return dataValidator(obj.data);
    }
    
    if (!obj.success && typeof obj.error === "string") {
        return true;
    }
    
    return false;
}

// Usage examples
const unknownResponse = fetchUnknownData("/api/data");

// Handle with string data validation
const stringDataResponse = handleUnknownResponse(
    unknownResponse,
    (data): data is ApiResponse<string> => isApiResponse(data, (item): item is string => typeof item === "string")
);

// Handle with object data validation
const objectDataResponse = handleUnknownResponse(
    unknownResponse,
    (data): data is ApiResponse<Record<string, unknown>> => 
        isApiResponse(data, (item): item is Record<string, unknown> => 
            typeof item === "object" && item !== null
        )
);

stringDataResponse.then(response => {
    if ("data" in response) {
        console.log("String data:", response.data);
    } else {
        console.log("Error:", response.error);
    }
});

objectDataResponse.then(response => {
    if ("data" in response) {
        console.log("Object data:", response.data);
    } else {
        console.log("Error:", response.error);
    }
});

// QUESTION 3: Best Practices and Alternatives
// Create examples showing best practices and alternatives to any.
// Demonstrate when to use unknown vs specific types.

// SOLUTION 3: Best Practices and Alternatives
// Alternative 1: Use specific union types instead of any
type DataValue = string | number | boolean | null | undefined;

function processSpecificUnion(value: DataValue): string {
    switch (typeof value) {
        case "string":
            return `String: ${value}`;
        case "number":
            return `Number: ${value}`;
        case "boolean":
            return `Boolean: ${value}`;
        default:
            return "Null or undefined";
    }
}

// Alternative 2: Use generic constraints instead of any
interface Identifiable {
    id: string;
}

function processIdentifiable<T extends Identifiable>(item: T): string {
    return `Item ${item.id}: ${JSON.stringify(item)}`;
}

// Alternative 3: Use branded types for better type safety
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
    return id as UserId;
}

function createProductId(id: string): ProductId {
    return id as ProductId;
}

function processUserById(userId: UserId): void {
    console.log("Processing user:", userId);
}

function processProductById(productId: ProductId): void {
    console.log("Processing product:", productId);
}

// Alternative 4: Use unknown with proper validation instead of any
class SafeRepository<T> {
    private items: Map<string, T> = new Map();

    add(id: string, item: unknown, validator: (item: unknown) => item is T): boolean {
        if (validator(item)) {
            this.items.set(id, item);
            return true;
        }
        return false;
    }

    get(id: string): T | undefined {
        return this.items.get(id);
    }

    getAll(): T[] {
        return Array.from(this.items.values());
    }
}

// Usage examples for best practices
console.log("Specific union:", processSpecificUnion("hello"));
console.log("Specific union:", processSpecificUnion(42));

const user = { id: "user1", name: "John" };
const product = { id: "prod1", name: "Laptop", price: 999 };

console.log("Generic constraint:", processIdentifiable(user));
console.log("Generic constraint:", processIdentifiable(product));

const userId = createUserId("user123");
const productId = createProductId("prod456");

processUserById(userId);
processProductById(productId);

// Safe repository usage
const userRepo = new SafeRepository<User>();
const success = userRepo.add("user1", unknownData1, isUser);
console.log("Added to repository:", success);

if (success) {
    const retrievedUser = userRepo.get("user1");
    console.log("Retrieved user:", retrievedUser);
}

// ===== PRACTICAL EXAMPLES =====

// Example 1: Configuration Manager
class ConfigManager {
    private config: Record<string, unknown> = {};

    set(key: string, value: unknown): void {
        this.config[key] = value;
    }

    get<T>(key: string, validator: (value: unknown) => value is T): T | null {
        const value = this.config[key];
        return validator(value) ? value : null;
    }

    getString(key: string): string | null {
        const value = this.config[key];
        return typeof value === "string" ? value : null;
    }

    getNumber(key: string): number | null {
        const value = this.config[key];
        return typeof value === "number" ? value : null;
    }

    getBoolean(key: string): boolean | null {
        const value = this.config[key];
        return typeof value === "boolean" ? value : null;
    }

    getObject<T>(key: string, validator: (obj: unknown) => obj is T): T | null {
        const value = this.config[key];
        return typeof value === "object" && value !== null && validator(value) ? value : null;
    }
}

// Usage
const config = new ConfigManager();
config.set("apiUrl", "https://api.example.com");
config.set("timeout", 5000);
config.set("debug", true);
config.set("database", {
    host: "localhost",
    port: 5432,
    name: "myapp"
});

console.log("API URL:", config.getString("apiUrl"));
console.log("Timeout:", config.getNumber("timeout"));
console.log("Debug:", config.getBoolean("debug"));
console.log("Database:", config.getObject("database", (obj): obj is { host: string; port: number; name: string } => 
    typeof obj === "object" && obj !== null &&
    typeof (obj as any).host === "string" &&
    typeof (obj as any).port === "number" &&
    typeof (obj as any).name === "string"
));

// Example 2: Event System with Unknown Payload
type EventHandler<T = unknown> = (payload: T) => void;

class TypedEventEmitter {
    private listeners: Map<string, EventHandler[]> = new Map();

    on<T>(event: string, handler: EventHandler<T>): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event)!.push(handler);
    }

    emit(event: string, payload: unknown): void {
        const handlers = this.listeners.get(event);
        if (handlers) {
            handlers.forEach(handler => {
                try {
                    handler(payload);
                } catch (error) {
                    console.error(`Error in event handler for ${event}:`, error);
                }
            });
        }
    }

    off(event: string, handler: EventHandler): void {
        const handlers = this.listeners.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
}

// Usage
const emitter = new TypedEventEmitter();

// Register handlers with specific types
emitter.on<{ message: string; sender: string }>("message", (payload) => {
    if (payload && typeof payload === "object") {
        console.log(`Message from ${payload.sender}: ${payload.message}`);
    }
});

emitter.on<{ code: number; message: string }>("error", (payload) => {
    if (payload && typeof payload === "object") {
        console.error(`Error ${payload.code}: ${payload.message}`);
    }
});

// Emit events
emitter.emit("message", { message: "Hello, World!", sender: "System" });
emitter.emit("error", { code: 404, message: "Not Found" });

// Example 3: Safe JSON Parser
class SafeJSONParser {
    static parse<T>(jsonString: unknown, validator: (obj: unknown) => obj is T): T | null {
        if (typeof jsonString !== "string") {
            return null;
        }

        try {
            const parsed = JSON.parse(jsonString);
            return validator(parsed) ? parsed : null;
        } catch (error) {
            console.error("JSON parse error:", error);
            return null;
        }
    }

    static stringify(value: unknown): string | null {
        try {
            return JSON.stringify(value);
        } catch (error) {
            console.error("JSON stringify error:", error);
            return null;
        }
    }
}

// Usage
const userJSONString = '{"name": "John", "age": 30, "email": "john@example.com"}';
const invalidJSONString = "invalid json";

const parsedUser = SafeJSONParser.parse(userJSONString, (obj): obj is { name: string; age: number; email: string } =>
    typeof obj === "object" && obj !== null &&
    typeof (obj as any).name === "string" &&
    typeof (obj as any).age === "number" &&
    typeof (obj as any).email === "string"
);

console.log("Parsed user:", parsedUser);
console.log("Invalid JSON:", SafeJSONParser.parse(invalidJSONString, () => false));

const stringified = SafeJSON.stringify({ name: "John", age: 30 });
console.log("Stringified:", stringified);

// Summary: This exercise demonstrates:
// - The any type and its type-unsafe behavior
// - The unknown type and its type-safe requirements
// - Type narrowing techniques from unknown to specific types
// - Migration strategies from any to unknown
// - Generic functions with unknown type parameters
// - Complex type guards for nested object validation
// - Safe async operations with unknown data
// - Best practices and alternatives to using any
// - Practical applications in configuration, events, and JSON parsing
