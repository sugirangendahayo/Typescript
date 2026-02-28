// EXERCISE 15: Advanced Type Combinations
// 
// WHAT WE ARE ASKED TO DO:
// Create comprehensive examples combining multiple TypeScript type features
// Demonstrate advanced type patterns and their practical applications
// Show how different type features work together in complex scenarios
// Practice building sophisticated type-safe systems
//
// WHAT WE DID:
// - Demonstrated complex union and intersection type combinations
// - Showed advanced generic patterns with constraints and conditional types
// - Explained mapped types with conditional logic and template literals
// - Demonstrated recursive types and advanced utility type creation
// - Showed practical applications in real-world scenarios

// ===== ADVANCED UNION AND INTERSECTION COMBINATIONS =====
//
// QUESTION 1: Complex Discriminated Unions
// Create a sophisticated discriminated union system that combines multiple type features.
// Demonstrate how to build type-safe state management with complex transitions.

// SOLUTION 1: Complex Discriminated Unions
// Base state interface
interface BaseState {
    id: string;
    timestamp: number;
    metadata?: Record<string, unknown>;
}

// Specific state types with discriminated unions
interface IdleState extends BaseState {
    type: "idle";
    lastActivity?: Date;
}

interface LoadingState extends BaseState {
    type: "loading";
    progress: number;
    operation: string;
}

interface SuccessState<T> extends BaseState {
    type: "success";
    data: T;
    operation: string;
}

interface ErrorState extends BaseState {
    type: "error";
    error: Error;
    operation: string;
    retryCount: number;
}

// Combined state type
type AppState<T = any> = IdleState | LoadingState | SuccessState<T> | ErrorState;

// State transition types
type StateTransition<T = any> = 
    | { from: "idle"; to: "loading"; operation: string }
    | { from: "loading"; to: "success"; data: T }
    | { from: "loading"; to: "error"; error: Error }
    | { from: "success"; to: "idle" }
    | { from: "error"; to: "loading"; operation: string }
    | { from: "error"; to: "idle" };

// Advanced state manager
class StateManager<T = any> {
    private currentState: AppState<T>;
    private history: AppState<T>[] = [];

    constructor(initialState: IdleState) {
        this.currentState = initialState;
        this.history.push(initialState);
    }

    getCurrentState(): AppState<T> {
        return this.currentState;
    }

    transition<S extends AppState<T>>(
        transition: StateTransition<T>,
        newState: S
    ): S {
        // Validate transition
        if (!this.isValidTransition(this.currentState.type, transition.from)) {
            throw new Error(`Invalid transition from ${this.currentState.type} to ${transition.from}`);
        }

        this.currentState = newState;
        this.history.push(newState);
        return newState;
    }

    private isValidTransition(currentType: string, fromType: string): boolean {
        // Complex transition logic
        const validTransitions: Record<string, string[]> = {
            idle: ["idle"],
            loading: ["loading"],
            success: ["success"],
            error: ["error"]
        };
        return validTransitions[currentType]?.includes(fromType) ?? false;
    }

    getHistory(): AppState<T>[] {
        return [...this.history];
    }
}

// Usage
const stateManager = new StateManager({ type: "idle", id: "1", timestamp: Date.now() });

const loadingState = stateManager.transition(
    { from: "idle", to: "loading", operation: "fetchUser" },
    { type: "loading", id: "2", timestamp: Date.now(), progress: 0, operation: "fetchUser" }
);

const successState = stateManager.transition(
    { from: "loading", to: "success", data: { name: "John", email: "john@example.com" } },
    { type: "success", id: "3", timestamp: Date.now(), data: { name: "John", email: "john@example.com" }, operation: "fetchUser" }
);

console.log("Current state:", stateManager.getCurrentState());
console.log("History:", stateManager.getHistory());

// QUESTION 2: Advanced Intersection Patterns
// Create examples showing sophisticated intersection type patterns.
// Demonstrate how to combine multiple interfaces and constraints.

// SOLUTION 2: Advanced Intersection Patterns
// Base interfaces
interface Identifiable {
    id: string;
}

interface Timestamped {
    createdAt: Date;
    updatedAt: Date;
}

interface Auditable {
    createdBy: string;
    updatedBy: string;
}

interface SoftDeletable {
    deletedAt?: Date;
    deletedBy?: string;
    isDeleted: boolean;
}

// Complex intersection type
interface BaseEntity extends Identifiable, Timestamped, Auditable {
    version: number;
}

// Generic entity with optional soft delete
type Entity<T> = BaseEntity & T & Partial<SoftDeletable>;

// Specific entity types
interface UserData {
    name: string;
    email: string;
    profile: {
        age: number;
        preferences: Record<string, unknown>;
    };
}

interface ProductData {
    name: string;
    price: number;
    category: string;
    inventory: {
        stock: number;
        reserved: number;
    };
}

type User = Entity<UserData>;
type Product = Entity<ProductData>;

// Advanced entity factory with validation
class EntityFactory {
    static createUser<T extends UserData>(data: T): User {
        const now = new Date();
        return {
            id: this.generateId(),
            createdAt: now,
            updatedAt: now,
            createdBy: "system",
            updatedBy: "system",
            version: 1,
            isDeleted: false,
            ...data
        };
    }

    static createProduct<T extends ProductData>(data: T): Product {
        const now = new Date();
        return {
            id: this.generateId(),
            createdAt: now,
            updatedAt: now,
            createdBy: "system",
            updatedBy: "system",
            version: 1,
            isDeleted: false,
            ...data
        };
    }

    private static generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

// Usage
const user = EntityFactory.createUser({
    name: "John Doe",
    email: "john@example.com",
    profile: {
        age: 30,
        preferences: { theme: "dark" }
    }
});

const product = EntityFactory.createProduct({
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
    inventory: { stock: 100, reserved: 5 }
});

console.log("Created user:", user);
console.log("Created product:", product);

// QUESTION 3: Conditional Type Combinations
// Create examples showing complex conditional type patterns.
// Demonstrate how conditional types can create sophisticated type logic.

// SOLUTION 3: Conditional Type Combinations
// Advanced conditional types
type NonNullable<T> = T extends null | undefined ? never : T;
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Conditional type for API responses
type ApiResponse<T> = T extends void
    ? { success: boolean; error?: string }
    : { success: boolean; data?: T; error?: string };

// Conditional type for database operations
type DbResult<T, Operation extends "create" | "read" | "update" | "delete"> = 
    Operation extends "create"
    ? { success: true; id: string } | { success: false; error: string }
    : Operation extends "read"
    ? { success: true; data: T } | { success: false; error: string }
    : Operation extends "update"
    ? { success: true; updated: number } | { success: false; error: string }
    : Operation extends "delete"
    ? { success: true; deleted: number } | { success: false; error: string }
    : never;

// Advanced database client
class DatabaseClient {
    async execute<T, Operation extends "create" | "read" | "update" | "delete">(
        operation: Operation,
        data?: T
    ): Promise<DbResult<T, Operation>> {
        // Simulate database operation
        console.log(`Executing ${operation} with data:`, data);
        
        switch (operation) {
            case "create":
                return { success: true, id: Math.random().toString(36) };
            case "read":
                return { success: true, data: data as T };
            case "update":
                return { success: true, updated: 1 };
            case "delete":
                return { success: true, deleted: 1 };
            default:
                return { success: false, error: "Unknown operation" };
        }
    }
}

// Usage
const dbClient = new DatabaseClient();

dbClient.execute("create", { name: "John" }).then(result => {
    console.log("Create result:", result);
});

dbClient.execute("read", { name: "John" }).then(result => {
    console.log("Read result:", result);
});

// ===== ADVANCED GENERIC PATTERNS =====
//
// QUESTION 1: Generic Constraints with Multiple Types
// Create examples showing complex generic constraints and type inference.
// Demonstrate advanced generic patterns with multiple type parameters.

// SOLUTION 1: Generic Constraints with Multiple Types
// Complex generic constraints
interface Shape {
    area(): number;
    perimeter(): number;
}

interface Colored {
    color: string;
}

interface Named {
    name: string;
}

interface Positioned {
    x: number;
    y: number;
}

// Multiple constraints
type AdvancedShape = Shape & Colored & Named & Positioned;

// Generic function with multiple constraints
function processShape<T extends AdvancedShape>(shape: T): {
    area: number;
    perimeter: number;
    color: string;
    name: string;
    position: { x: number; y: number };
} {
    return {
        area: shape.area(),
        perimeter: shape.perimeter(),
        color: shape.color,
        name: shape.name,
        position: { x: shape.x, y: shape.y }
    };
}

// Generic class with multiple constraints
class ShapeCollection<T extends AdvancedShape> {
    private shapes: T[] = [];

    add(shape: T): void {
        this.shapes.push(shape);
    }

    findByColor(color: string): T[] {
        return this.shapes.filter(shape => shape.color === color);
    }

    findByArea(minArea: number): T[] {
        return this.shapes.filter(shape => shape.area() >= minArea);
    }

    getTotalArea(): number {
        return this.shapes.reduce((total, shape) => total + shape.area(), 0);
    }
}

// Usage
class Circle implements AdvancedShape {
    constructor(
        public x: number,
        public y: number,
        public radius: number,
        public color: string,
        public name: string
    ) {}

    area(): number {
        return Math.PI * this.radius * this.radius;
    }

    perimeter(): number {
        return 2 * Math.PI * this.radius;
    }
}

class Rectangle implements AdvancedShape {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number,
        public color: string,
        public name: string
    ) {}

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }
}

const shapeCollection = new ShapeCollection<Circle | Rectangle>();

shapeCollection.add(new Circle(0, 0, 5, "red", "Red Circle"));
shapeCollection.add(new Rectangle(10, 10, 4, 6, "blue", "Blue Rectangle"));

console.log("Red shapes:", shapeCollection.findByColor("red"));
console.log("Total area:", shapeCollection.getTotalArea());

// QUESTION 2: Advanced Conditional Types
// Create examples showing sophisticated conditional type patterns.
// Demonstrate how conditional types can solve complex type problems.

// SOLUTION 2: Advanced Conditional Types
// Recursive conditional type for deep paths
type DeepPath<T, Path extends string> = T extends object
    ? Path extends `${infer Key}.${infer Rest}`
        ? Key extends keyof T
            ? DeepPath<T[Key], Rest>
            : never
        : Path extends keyof T
        ? T[Path]
        : never
    : never;

// Conditional type for function parameters
type Parameters<T> = T extends (...args: infer P) => any ? P : never;

// Conditional type for function return type
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Advanced conditional type for API endpoints
type EndpointMethod = "GET" | "POST" | "PUT" | "DELETE";

type EndpointConfig<T extends EndpointMethod> = T extends "GET"
    ? { response: any; query?: Record<string, string> }
    : T extends "POST" | "PUT"
    ? { response: any; body: any }
    : T extends "DELETE"
    ? { response: any; params?: Record<string, string> }
    : never;

// Generic API client with conditional types
class TypedApiClient {
    async request<T extends EndpointMethod>(
        method: T,
        url: string,
        config: EndpointConfig<T>
    ): Promise<EndpointConfig<T> extends { response: infer R } ? R : never> {
        // Simulate API call
        console.log(`${method} ${url}`, config);
        
        if (method === "GET") {
            return { data: "success" } as any;
        } else if (method === "POST" || method === "PUT") {
            return { created: true } as any;
        } else if (method === "DELETE") {
            return { deleted: true } as any;
        }
        
        return {} as any;
    }
}

// Usage
const apiClient = new TypedApiClient();

apiClient.request("GET", "/users", { response: {}, query: { page: "1" } }).then(result => {
    console.log("GET result:", result);
});

apiClient.request("POST", "/users", { response: {}, body: { name: "John" } }).then(result => {
    console.log("POST result:", result);
});

// QUESTION 3: Mapped Types with Advanced Logic
// Create examples showing sophisticated mapped type patterns.
// Demonstrate how mapped types can transform complex object structures.

// SOLUTION 3: Mapped Types with Advanced Logic
// Advanced mapped types
type OptionalKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? K : never
}[keyof T];

type RequiredKeys<T> = {
    [K in keyof T]-?: undefined extends T[K] ? never : K
}[keyof T];

type ReadonlyKeys<T> = {
    [K in keyof T]-?: T[K] extends Readonly<any> ? K : never
}[keyof T];

// Mapped type with conditional logic
type Flatten<T> = {
    [K in keyof T]: T[K] extends object
        ? T[K] extends Array<any>
            ? T[K]
            : Flatten<T[K]>
        : T[K];
};

// Mapped type for validation
type ValidationSchema<T> = {
    [K in keyof T]: T[K] extends string
        ? { type: "string"; required?: boolean; minLength?: number; maxLength?: number }
        : T[K] extends number
        ? { type: "number"; required?: boolean; min?: number; max?: number }
        : T[K] extends boolean
        ? { type: "boolean"; required?: boolean }
        : T[K] extends Array<any>
        ? { type: "array"; required?: boolean; itemType: string }
        : { type: "object"; required?: boolean; properties: ValidationSchema<T[K]> };
};

// Advanced validator class
class AdvancedValidator<T extends Record<string, any>> {
    constructor(private schema: ValidationSchema<T>) {}

    validate(data: unknown): { isValid: boolean; errors: Partial<Record<keyof T, string>> } {
        const errors: Partial<Record<keyof T, string>> = {};

        for (const key in this.schema) {
            const fieldSchema = this.schema[key];
            const value = (data as any)?.[key];

            if (fieldSchema.required && (value === undefined || value === null)) {
                errors[key] = `${key} is required`;
                continue;
            }

            if (value !== undefined && !this.validateField(value, fieldSchema)) {
                errors[key] = `${key} is invalid`;
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    private validateField(value: any, schema: ValidationSchema<T>[keyof T]): boolean {
        if (schema.type === "string") {
            return typeof value === "string";
        } else if (schema.type === "number") {
            return typeof value === "number" && !isNaN(value);
        } else if (schema.type === "boolean") {
            return typeof value === "boolean";
        } else if (schema.type === "array") {
            return Array.isArray(value);
        }
        return true;
    }
}

// Usage
interface UserForm {
    name: string;
    age: number;
    email?: string;
    preferences: {
        theme: string;
        notifications: boolean;
    };
}

const userSchema: ValidationSchema<UserForm> = {
    name: { type: "string", required: true, minLength: 2, maxLength: 50 },
    age: { type: "number", required: true, min: 18, max: 120 },
    email: { type: "string", required: false },
    preferences: {
        type: "object",
        required: true,
        properties: {
            theme: { type: "string", required: true },
            notifications: { type: "boolean", required: true }
        }
    }
};

const userValidator = new AdvancedValidator(userSchema);

const validUser = {
    name: "John",
    age: 30,
    preferences: {
        theme: "dark",
        notifications: true
    }
};

const invalidUser = {
    name: "J",
    age: 15
};

console.log("Valid user:", userValidator.validate(validUser));
console.log("Invalid user:", userValidator.validate(invalidUser));

// ===== PRACTICAL APPLICATIONS =====

// Example 1: Type-Safe Event System
type EventData = Record<string, unknown>;

interface Event<T extends EventData = EventData> {
    type: string;
    payload: T;
    timestamp: number;
    id: string;
}

type EventHandler<T extends EventData = EventData> = (event: Event<T>) => void;

interface EventSchema {
    userRegistered: { userId: string; email: string };
    userLoggedIn: { userId: string; sessionId: string };
    userLoggedOut: { userId: string };
    productPurchased: { userId: string; productId: string; amount: number };
}

class TypedEventEmitter {
    private handlers: Map<string, EventHandler[]> = new Map();

    on<K extends keyof EventSchema>(
        eventType: K,
        handler: EventHandler<EventSchema[K]>
    ): void {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType)!.push(handler);
    }

    emit<K extends keyof EventSchema>(
        eventType: K,
        payload: EventSchema[K]
    ): void {
        const event: Event<EventSchema[K]> = {
            type: eventType as string,
            payload,
            timestamp: Date.now(),
            id: Math.random().toString(36)
        };

        const handlers = this.handlers.get(eventType);
        if (handlers) {
            handlers.forEach(handler => handler(event));
        }
    }

    off<K extends keyof EventSchema>(
        eventType: K,
        handler: EventHandler<EventSchema[K]>
    ): void {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
}

// Usage
const eventEmitter = new TypedEventEmitter();

eventEmitter.on("userRegistered", (event) => {
    console.log(`User registered: ${event.payload.email}`);
});

eventEmitter.on("productPurchased", (event) => {
    console.log(`Product purchased: ${event.payload.productId} for $${event.payload.amount}`);
});

eventEmitter.emit("userRegistered", { userId: "123", email: "john@example.com" });
eventEmitter.emit("productPurchased", { userId: "123", productId: "456", amount: 99.99 });

// Example 2: Type-Safe Repository Pattern
interface Repository<T extends { id: string }> {
    create(data: Omit<T, "id">): Promise<T>;
    findById(id: string): Promise<T | null>;
    findMany(filter: Partial<T>): Promise<T[]>;
    update(id: string, data: Partial<T>): Promise<T>;
    delete(id: string): Promise<boolean>;
}

interface QueryOptions<T> {
    filter?: Partial<T>;
    sort?: keyof T;
    order?: "asc" | "desc";
    limit?: number;
    offset?: number;
}

class InMemoryRepository<T extends { id: string }> implements Repository<T> {
    private data: Map<string, T> = new Map();

    async create(data: Omit<T, "id">): Promise<T> {
        const entity = {
            ...data,
            id: Math.random().toString(36)
        } as T;
        
        this.data.set(entity.id, entity);
        return entity;
    }

    async findById(id: string): Promise<T | null> {
        return this.data.get(id) || null;
    }

    async findMany(filter: Partial<T>): Promise<T[]> {
        const entities = Array.from(this.data.values());
        
        return entities.filter(entity => {
            return Object.entries(filter).every(([key, value]) => {
                return (entity as any)[key] === value;
            });
        });
    }

    async update(id: string, data: Partial<T>): Promise<T> {
        const existing = this.data.get(id);
        if (!existing) {
            throw new Error(`Entity with id ${id} not found`);
        }

        const updated = { ...existing, ...data };
        this.data.set(id, updated);
        return updated;
    }

    async delete(id: string): Promise<boolean> {
        return this.data.delete(id);
    }

    async query(options: QueryOptions<T> = {}): Promise<T[]> {
        let entities = Array.from(this.data.values());

        // Apply filter
        if (options.filter) {
            entities = entities.filter(entity => {
                return Object.entries(options.filter!).every(([key, value]) => {
                    return (entity as any)[key] === value;
                });
            });
        }

        // Apply sort
        if (options.sort) {
            entities.sort((a, b) => {
                const aVal = (a as any)[options.sort!];
                const bVal = (b as any)[options.sort!];
                
                if (options.order === "desc") {
                    return bVal > aVal ? 1 : -1;
                }
                return aVal > bVal ? 1 : -1;
            });
        }

        // Apply pagination
        if (options.offset) {
            entities = entities.slice(options.offset);
        }
        
        if (options.limit) {
            entities = entities.slice(0, options.limit);
        }

        return entities;
    }
}

// Usage
interface User {
    id: string;
    name: string;
    email: string;
    age: number;
    active: boolean;
}

const userRepository = new InMemoryRepository<User>();

userRepository.create({ name: "John", email: "john@example.com", age: 30, active: true });
userRepository.create({ name: "Jane", email: "jane@example.com", age: 25, active: false });

userRepository.query({
    filter: { active: true },
    sort: "name",
    order: "asc"
}).then(users => {
    console.log("Active users sorted by name:", users);
});

// Example 3: Type-Safe Configuration System
type ConfigValue = string | number | boolean | Record<string, any>;

interface ConfigSchema {
    [key: string]: {
        type: "string" | "number" | "boolean" | "object";
        default?: ConfigValue;
        required?: boolean;
        validator?: (value: ConfigValue) => boolean;
    };
}

type ConfigFromSchema<T extends ConfigSchema> = {
    [K in keyof T]: T[K]["default"] extends ConfigValue
        ? T[K]["required"] extends true
            ? NonNullable<T[K]["default"]>
            : T[K]["default"] | undefined
        : ConfigValue;
};

class ConfigurationManager<T extends ConfigSchema> {
    private config: Partial<ConfigFromSchema<T>> = {};

    constructor(private schema: T) {
        this.loadDefaults();
    }

    private loadDefaults(): void {
        for (const key in this.schema) {
            const fieldSchema = this.schema[key];
            if (fieldSchema.default !== undefined) {
                this.config[key] = fieldSchema.default as any;
            }
        }
    }

    set<K extends keyof T>(key: K, value: ConfigFromSchema<T>[K]): void {
        const fieldSchema = this.schema[key];
        
        if (fieldSchema.validator && !fieldSchema.validator(value as ConfigValue)) {
            throw new Error(`Invalid value for ${String(key)}`);
        }

        this.config[key] = value;
    }

    get<K extends keyof T>(key: K): ConfigFromSchema<T>[K] | undefined {
        return this.config[key];
    }

    getAll(): ConfigFromSchema<T> {
        return this.config as ConfigFromSchema<T>;
    }

    validate(): { isValid: boolean; errors: string[] } {
        const errors: string[] = [];

        for (const key in this.schema) {
            const fieldSchema = this.schema[key];
            const value = this.config[key];

            if (fieldSchema.required && value === undefined) {
                errors.push(`${String(key)} is required`);
            }
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }
}

// Usage
const appConfigSchema: ConfigSchema = {
    apiUrl: {
        type: "string",
        default: "https://api.example.com",
        required: true
    },
    timeout: {
        type: "number",
        default: 5000,
        required: true,
        validator: (value) => typeof value === "number" && value > 0
    },
    enableLogging: {
        type: "boolean",
        default: true
    },
    database: {
        type: "object",
        required: true,
        default: {
            host: "localhost",
            port: 5432,
            name: "myapp"
        }
    }
};

const configManager = new ConfigurationManager(appConfigSchema);

configManager.set("timeout", 10000);
configManager.set("enableLogging", false);

const validation = configManager.validate();
console.log("Config valid:", validation.isValid);
console.log("Config:", configManager.getAll());

// Example 4: Type-Safe Builder Pattern
interface BuilderStep<T> {
    build(): T;
}

class UserBuilder implements BuilderStep<User> {
    private user: Partial<User> = {};

    name(name: string): this {
        this.user.name = name;
        return this;
    }

    email(email: string): this {
        this.user.email = email;
        return this;
    }

    age(age: number): this {
        this.user.age = age;
        return this;
    }

    active(active: boolean): this {
        this.user.active = active;
        return this;
    }

    build(): User {
        if (!this.user.name || !this.user.email || !this.user.age || this.user.active === undefined) {
            throw new Error("Missing required fields");
        }

        return {
            id: Math.random().toString(36),
            ...this.user
        } as User;
    }
}

// Generic builder factory
function createBuilder<T>(): BuilderStep<T> {
    return new UserBuilder() as any;
}

// Usage
const user = new UserBuilder()
    .name("John Doe")
    .email("john@example.com")
    .age(30)
    .active(true)
    .build();

console.log("Built user:", user);

// Example 5: Type-Safe Command Pattern
interface Command<T, R = void> {
    execute(data: T): R;
    undo?(data: T): R;
}

type CommandHandler<T, R = void> = (command: Command<T, R>, data: T) => R;

class CommandBus {
    private handlers: Map<string, CommandHandler<any, any>> = new Map();

    register<T, R>(commandType: string, handler: CommandHandler<T, R>): void {
        this.handlers.set(commandType, handler);
    }

    execute<T, R>(commandType: string, data: T): R {
        const handler = this.handlers.get(commandType);
        if (!handler) {
            throw new Error(`No handler registered for command type: ${commandType}`);
        }

        // Create a simple command object
        const command: Command<T, R> = {
            execute: (data: T) => handler(command, data)
        };

        return command.execute(data);
    }
}

// Usage
interface CreateUserCommand {
    name: string;
    email: string;
    age: number;
}

interface UpdateUserCommand {
    id: string;
    fields: Partial<User>;
}

const commandBus = new CommandBus();

commandBus.register<CreateUserCommand, User>("createUser", (command, data) => {
    console.log("Creating user:", data);
    return {
        id: Math.random().toString(36),
        ...data,
        active: true
    };
});

commandBus.register<UpdateUserCommand, User>("updateUser", (command, data) => {
    console.log("Updating user:", data);
    // Simulate update
    return {
        id: data.id,
        name: "Updated Name",
        email: "updated@example.com",
        age: 35,
        active: true
    };
});

const createdUser = commandBus.execute("createUser", {
    name: "John",
    email: "john@example.com",
    age: 30
});

const updatedUser = commandBus.execute("updateUser", {
    id: "123",
    fields: { name: "John Updated" }
});

console.log("Created user:", createdUser);
console.log("Updated user:", updatedUser);

// Summary: This exercise demonstrates:
// - Complex discriminated unions with state management
// - Advanced intersection patterns with multiple interfaces
// - Sophisticated conditional types and type inference
// - Generic constraints with multiple type parameters
// - Advanced mapped types with conditional logic
// - Type-safe event systems and repository patterns
// - Configuration management with validation
// - Builder pattern with type safety
// - Command pattern with type-safe handlers
// - Real-world applications combining multiple TypeScript features
