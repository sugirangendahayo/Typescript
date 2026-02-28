// EXERCISE 14: Literal Types
// 
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's literal types (string, number, boolean literals)
// Understand how literal types create more precise type definitions
// Practice using literal types in unions, function parameters, and return types
// Learn about const assertions and their relationship with literal types
//
// WHAT WE DID:
// - Demonstrated string, number, and boolean literal types
// - Showed literal type unions and their practical applications
// - Explained const assertions and their effects on literal types
// - Demonstrated template literal types and string manipulation
// - Showed practical applications in APIs, configuration, and state management

// ===== BASIC LITERAL TYPES =====
//
// QUESTION 1: String Literal Types
// Create examples showing string literal types and their usage.
// Demonstrate how string literals provide more precise typing than regular strings.

// SOLUTION 1: String Literal Types
// Basic string literal type
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction): void {
    console.log(`Moving ${direction}`);
}

// Usage - only allowed values are the literal types
move("north");     // OK
move("south");     // OK
// move("northeast"); // Error: Argument of type '"northeast"' is not assignable to parameter of type 'Direction'

// String literal in interfaces
interface Button {
    text: string;
    variant: "primary" | "secondary" | "danger" | "success";
    size: "small" | "medium" | "large";
}

const primaryButton: Button = {
    text: "Click me",
    variant: "primary",
    size: "medium"
};

// String literal in function return types
function getStatusMessage(code: 200 | 404 | 500): "success" | "not found" | "server error" {
    switch (code) {
        case 200: return "success";
        case 404: return "not found";
        case 500: return "server error";
        default:
            // This would cause a TypeScript error if we didn't handle all cases
            throw new Error("Unknown status code");
    }
}

console.log("Status message:", getStatusMessage(200));

// QUESTION 2: Number Literal Types
// Create examples showing number literal types and their usage.
// Demonstrate how number literals provide precise numeric typing.

// SOLUTION 2: Number Literal Types
// Basic number literal type
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
    return Math.floor(Math.random() * 6) + 1 as DiceRoll;
}

function getDiceDescription(roll: DiceRoll): string {
    switch (roll) {
        case 1: return "One";
        case 2: return "Two";
        case 3: return "Three";
        case 4: return "Four";
        case 5: return "Five";
        case 6: return "Six";
        default:
            throw new Error("Invalid dice roll");
    }
}

const diceResult = rollDice();
console.log(`Dice rolled: ${diceResult} (${getDiceDescription(diceResult)})`);

// Number literal in interfaces
interface Rating {
    score: 1 | 2 | 3 | 4 | 5;
    maxScore: 5;
}

const movieRating: Rating = {
    score: 4,
    maxScore: 5
};

// Number literal with arithmetic
type PixelValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

function setOpacity(value: PixelValue): void {
    console.log(`Setting opacity to ${value * 10}%`);
}

setOpacity(5); // OK
// setOpacity(11); // Error: Argument of type '11' is not assignable to parameter of type 'PixelValue'

// QUESTION 3: Boolean Literal Types
// Create examples showing boolean literal types and their usage.
// Demonstrate how boolean literals can be used for precise type definitions.

// SOLUTION 3: Boolean Literal Types
// Boolean literal types
type TrueType = true;
type FalseType = false;

// Boolean literal in function parameters
function configureFeature(enabled: true): void {
    console.log("Feature is enabled - setting up resources");
}

function configureFeatureDisabled(enabled: false): void {
    console.log("Feature is disabled - cleaning up resources");
}

// Function overloads with boolean literals
function setDebugMode(enabled: true): void;
function setDebugMode(enabled: false): void;
function setDebugMode(enabled: boolean): void {
    if (enabled) {
        console.log("Debug mode ON - enabling verbose logging");
    } else {
        console.log("Debug mode OFF - disabling verbose logging");
    }
}

setDebugMode(true);  // Calls the true overload
setDebugMode(false); // Calls the false overload

// Boolean literal in interfaces
interface FeatureFlags {
    darkMode: true;
    notifications: false;
    betaFeatures: true;
}

const userFlags: FeatureFlags = {
    darkMode: true,
    notifications: false,
    betaFeatures: true
};

// ===== INTERMEDIATE LITERAL TYPES =====
//
// QUESTION 1: Literal Type Unions
// Create examples showing complex literal type unions.
// Demonstrate how to combine different literal types for precise typing.

// SOLUTION 1: Literal Type Unions
// Mixed literal type union
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;

interface ApiEndpoint {
    method: HttpMethod;
    path: string;
    expectedStatus: StatusCode;
}

const endpoints: ApiEndpoint[] = [
    { method: "GET", path: "/users", expectedStatus: 200 },
    { method: "POST", path: "/users", expectedStatus: 201 },
    { method: "PUT", path: "/users/:id", expectedStatus: 200 },
    { method: "DELETE", path: "/users/:id", expectedStatus: 200 }
];

// Complex literal union with objects
type Theme = "light" | "dark" | "auto";
type Language = "en" | "es" | "fr" | "de" | "ja";

interface UserPreferences {
    theme: Theme;
    language: Language;
    fontSize: 12 | 14 | 16 | 18 | 20 | 24;
    sidebarWidth: 200 | 250 | 300;
}

const defaultPreferences: UserPreferences = {
    theme: "light",
    language: "en",
    fontSize: 16,
    sidebarWidth: 250
};

// Literal union with function parameters
function createElement(
    tag: "div" | "span" | "button" | "input",
    attributes: Record<string, string | boolean | number>,
    children?: string
): string {
    const attrs = Object.entries(attributes)
        .map(([key, value]) => `${key}="${value}"`)
        .join(" ");
    
    const childrenHtml = children ? children : "";
    return `<${tag} ${attrs}>${childrenHtml}</${tag}>`;
}

const buttonHtml = createElement("button", { type: "submit", disabled: false }, "Submit");
console.log("Generated HTML:", buttonHtml);

// QUESTION 2: Template Literal Types
// Create examples showing template literal types.
// Demonstrate how template literals can create type-safe string patterns.

// SOLUTION 2: Template Literal Types
// Basic template literal type
type Greeting = `Hello, ${string}!`;

function createGreeting(name: string): Greeting {
    return `Hello, ${name}!` as Greeting;
}

const greeting: Greeting = createGreeting("World");
console.log("Greeting:", greeting);

// Template literal with constrained values
type CssSize = `${number}px` | `${number}%` | `${number}em` | `${number}rem`;

function setElementSize(element: string, size: CssSize): void {
    console.log(`Setting ${element} size to ${size}`);
}

setElementSize("button", "16px");   // OK
setElementSize("div", "100%");      // OK
// setElementSize("span", "16pt");   // Error: Argument of type '"16pt"' is not assignable to parameter of type 'CssSize'

// Template literal with unions
type EventName = `on${Capitalize<EventType>}`;
type EventType = "click" | "hover" | "focus" | "blur";
type Capitalize<T extends string> = T extends `${infer First}${infer Rest}` 
    ? `${Uppercase<First>}${Rest}` 
    : T;

// This would require more advanced template literal type features
// For now, let's use a simpler approach
type SimpleEventName = `onClick` | `onHover` | `onFocus` | `onBlur`;

function addEventListener(element: string, event: SimpleEventName, handler: () => void): void {
    console.log(`Adding ${event} listener to ${element}`);
}

addEventListener("button", "onClick", () => console.log("Button clicked"));

// QUESTION 3: Const Assertions and Literal Types
// Create examples showing how const assertions affect literal types.
// Demonstrate the difference between mutable and immutable literal types.

// SOLUTION 3: Const Assertions and Literal Types
// Regular array (widened types)
const regularArray = ["apple", "banana", "cherry"];
// Type: string[]

// Const assertion array (preserved literal types)
const constArray = ["apple", "banana", "cherry"] as const;
// Type: readonly ["apple", "banana", "cherry"]

function processFruits(fruits: readonly ["apple", "banana", "cherry"]): void {
    console.log(`${fruits[0]}, ${fruits[1]}, ${fruits[2]}`);
}

processFruits(constArray); // OK
// processFruits(regularArray); // Error: Argument of type 'string[]' is not assignable to parameter of type 'readonly ["apple", "banana", "cherry"]'

// Const assertion with objects
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
} as const;

// Type: {
//   readonly apiUrl: "https://api.example.com";
//   readonly timeout: 5000;
//   readonly retries: 3;
// }

function loadConfig(cfg: typeof config): void {
    console.log(`Loading config from ${cfg.apiUrl}`);
}

loadConfig(config); // OK

// Const assertion with function return types
function getEndpoints() {
    return [
        { method: "GET" as const, path: "/users" },
        { method: "POST" as const, path: "/users" },
        { method: "PUT" as const, path: "/users/:id" }
    ];
}

const endpoints2 = getEndpoints();
// Type: { method: "GET"; path: string; }[]

// With const assertion on the whole return
function getEndpointsConst() {
    return [
        { method: "GET", path: "/users" },
        { method: "POST", path: "/users" },
        { method: "PUT", path: "/users/:id" }
    ] as const;
}

const endpoints3 = getEndpointsConst();
// Type: readonly [{ readonly method: "GET"; readonly path: "/users"; }, { readonly method: "POST"; readonly path: "/users"; }, { readonly method: "PUT"; readonly path: "/users/:id"; }]

// ===== ADVANCED LITERAL TYPES =====
//
// QUESTION 1: Mapped Types with Literals
// Create examples showing mapped types that use literal types.
// Demonstrate how to create type-safe configurations and APIs.

// SOLUTION 1: Mapped Types with Literals
// Create a type-safe configuration object
type ConfigValues = {
    apiUrl: string;
    timeout: number;
    retries: number;
    enableLogging: boolean;
};

type ConfigKeys = keyof ConfigValues;

type ConfigSchema = {
    [K in ConfigKeys]: {
        type: "string" | "number" | "boolean";
        default: ConfigValues[K];
        required: true;
    };
};

const configSchema: ConfigSchema = {
    apiUrl: { type: "string", default: "https://api.example.com", required: true },
    timeout: { type: "number", default: 5000, required: true },
    retries: { type: "number", default: 3, required: true },
    enableLogging: { type: "boolean", default: true, required: true }
};

// Create a type-safe event system
type EventMap = {
    userLogin: { userId: string; timestamp: number };
    userLogout: { userId: string; timestamp: number };
    dataUpdate: { table: string; id: string; changes: Record<string, any> };
};

type EventHandlers = {
    [K in keyof EventMap]: (data: EventMap[K]) => void;
};

class EventEmitter {
    private handlers: Partial<EventHandlers> = {};

    on<K extends keyof EventMap>(event: K, handler: EventHandlers[K]): void {
        if (!this.handlers[event]) {
            this.handlers[event] = [] as any;
        }
        (this.handlers[event] as any).push(handler);
    }

    emit<K extends keyof EventMap>(event: K, data: EventMap[K]): void {
        const handlers = this.handlers[event];
        if (handlers) {
            (handlers as any).forEach((handler: EventHandlers[K]) => handler(data));
        }
    }
}

// Usage
const emitter = new EventEmitter();

emitter.on("userLogin", (data) => {
    console.log(`User ${data.userId} logged in at ${data.timestamp}`);
});

emitter.emit("userLogin", { userId: "123", timestamp: Date.now() });

// QUESTION 2: Branded Types with Literals
// Create examples showing branded types that use literal types.
// Demonstrate how to create type-safe identifiers and tokens.

// SOLUTION 2: Branded Types with Literals
// Branded type for user IDs
type UserId = string & { readonly brand: unique symbol };
type ProductId = string & { readonly brand: unique symbol };
type OrderId = string & { readonly brand: unique symbol };

function createUserId(id: string): UserId {
    return id as UserId;
}

function createProductId(id: string): ProductId {
    return id as ProductId;
}

function createOrderId(id: string): OrderId {
    return id as OrderId;
}

// Type-safe functions that work with specific ID types
function getUserById(id: UserId): { name: string; email: string } | null {
    // Simulate database lookup
    const users: Record<string, { name: string; email: string }> = {
        "user123": { name: "John Doe", email: "john@example.com" }
    };
    return users[id] || null;
}

function getProductById(id: ProductId): { name: string; price: number } | null {
    // Simulate database lookup
    const products: Record<string, { name: string; price: number }> = {
        "prod456": { name: "Laptop", price: 999 }
    };
    return products[id] || null;
}

// Usage
const userId = createUserId("user123");
const productId = createProductId("prod456");

const user = getUserById(userId);
const product = getProductById(productId);

console.log("User:", user);
console.log("Product:", product);

// Prevent mixing up ID types
// getProductById(userId); // Error: Argument of type 'UserId' is not assignable to parameter of type 'ProductId'

// QUESTION 3: Recursive Literal Types
// Create examples showing recursive literal type definitions.
// Demonstrate how to build complex type structures with literals.

// SOLUTION 3: Recursive Literal Types
// JSON value type using literals
type JsonValue = 
    | string 
    | number 
    | boolean 
    | null 
    | JsonObject 
    | JsonArray;

interface JsonObject {
    [key: string]: JsonValue;
}

interface JsonArray extends Array<JsonValue> {}

// Type-safe JSON parser
function parseJson<T extends JsonValue>(jsonString: string): T {
    return JSON.parse(jsonString) as T;
}

// Usage
const userJson = parseJson<JsonObject>({
    name: "John",
    age: 30,
    active: true,
    metadata: null
});

// Recursive type for nested object paths
type Path<T> = T extends object
    ? {
        [K in keyof T]: K extends string
            ? `${K}` | `${K}.${Path<T[K]>}`
            : never
    }[keyof T]
    : never;

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

type UserPath = Path<User>;
// "id" | "name" | "profile" | "profile.email" | "profile.settings" | "profile.settings.theme" | "profile.settings.notifications"

function getValue<T, P extends Path<T>>(obj: T, path: P): any {
    return path.split('.').reduce((current, key) => current?.[key], obj);
}

const user: User = {
    id: 1,
    name: "John",
    profile: {
        email: "john@example.com",
        settings: {
            theme: "dark",
            notifications: true
        }
    }
};

console.log("User name:", getValue(user, "name"));
console.log("User email:", getValue(user, "profile.email"));
console.log("User theme:", getValue(user, "profile.settings.theme"));

// ===== PRACTICAL EXAMPLES =====

// Example 1: Type-Safe Router
type Route = 
    | "/"
    | "/about"
    | "/products"
    | "/products/:id"
    | "/users/:userId"
    | "/users/:userId/posts/:postId";

type RouteParams<T extends Route> = T extends `${string}:${infer Param}/${infer Rest}`
    ? { [K in Param | RouteParams<`/${Rest}`>]: string }
    : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : {};

class Router {
    private routes: Map<string, (params: any) => void> = new Map();

    register<T extends Route>(
        route: T,
        handler: (params: RouteParams<T>) => void
    ): void {
        this.routes.set(route, handler);
    }

    navigate<T extends Route>(route: T, params: RouteParams<T>): void {
        const handler = this.routes.get(route);
        if (handler) {
            handler(params);
        }
    }
}

// Usage
const router = new Router();

router.register("/users/:userId/posts/:postId", (params) => {
    console.log(`Loading post ${params.postId} for user ${params.userId}`);
});

router.navigate("/users/123/posts/456", { userId: "123", postId: "456" });

// Example 2: Type-Safe State Machine
type State = "idle" | "loading" | "success" | "error";
type Event = "fetch" | "success" | "error" | "reset";

type StateTransition = {
    [S in State]: {
        [E in Event]: S | never;
    };
};

const stateTransitions: StateTransition = {
    idle: {
        fetch: "loading",
        success: "idle",
        error: "idle",
        reset: "idle"
    },
    loading: {
        fetch: "loading",
        success: "success",
        error: "error",
        reset: "idle"
    },
    success: {
        fetch: "loading",
        success: "success",
        error: "success",
        reset: "idle"
    },
    error: {
        fetch: "loading",
        success: "error",
        error: "error",
        reset: "idle"
    }
};

class StateMachine {
    private currentState: State = "idle";

    transition(event: Event): State {
        const nextState = stateTransitions[this.currentState][event];
        if (nextState) {
            this.currentState = nextState;
            console.log(`Transitioned from ${this.currentState} on ${event}`);
        } else {
            console.log(`Invalid transition: ${this.currentState} -> ${event}`);
        }
        return this.currentState;
    }

    getState(): State {
        return this.currentState;
    }
}

// Usage
const stateMachine = new StateMachine();
stateMachine.transition("fetch");  // idle -> loading
stateMachine.transition("success"); // loading -> success
stateMachine.transition("reset");  // success -> idle

// Example 3: Type-Safe CSS-in-JS
type CssProperty = 
    | "color"
    | "backgroundColor"
    | "fontSize"
    | "fontWeight"
    | "padding"
    | "margin"
    | "border"
    | "borderRadius";

type CssValue<T extends CssProperty> = T extends "color" | "backgroundColor"
    ? string
    : T extends "fontSize"
    ? `${number}px` | `${number}em` | `${number}rem`
    : T extends "fontWeight"
    ? "normal" | "bold" | `${number}`
    : T extends "padding" | "margin"
    ? `${number}px` | `${number}%`
    : string;

type CssStyles = {
    [P in CssProperty]?: CssValue<P>;
};

function createStyles<T extends CssStyles>(styles: T): T {
    return styles;
}

// Usage
const buttonStyles = createStyles({
    color: "#ffffff",
    backgroundColor: "#007bff",
    fontSize: "16px",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "4px"
});

console.log("Button styles:", buttonStyles);

// Example 4: Type-Safe Form Builder
type FieldType = "text" | "email" | "password" | "number" | "select" | "checkbox" | "textarea";

type FieldConfig<T extends FieldType> = T extends "select"
    ? { type: T; label: string; options: Array<{ value: string; label: string }>; required?: boolean }
    : T extends "checkbox"
    ? { type: T; label: string; required?: boolean }
    : { type: T; label: string; placeholder?: string; required?: boolean };

type FormSchema = Record<string, FieldConfig<FieldType>>;

class FormBuilder {
    private schema: FormSchema = {};

    addField<T extends FieldType>(
        name: string,
        config: FieldConfig<T>
    ): FormBuilder {
        this.schema[name] = config;
        return this;
    }

    build(): FormSchema {
        return this.schema;
    }
}

// Usage
const userFormSchema = new FormBuilder()
    .addField("name", { type: "text", label: "Full Name", required: true })
    .addField("email", { type: "email", label: "Email Address", required: true })
    .addField("age", { type: "number", label: "Age" })
    .addField("country", { 
        type: "select", 
        label: "Country",
        options: [
            { value: "us", label: "United States" },
            { value: "uk", label: "United Kingdom" },
            { value: "ca", label: "Canada" }
        ]
    })
    .addField("newsletter", { type: "checkbox", label: "Subscribe to newsletter" })
    .build();

console.log("Form schema:", userFormSchema);

// Example 5: Type-Safe API Client
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type ApiEndpoint<T = any> = {
    method: HttpMethod;
    path: string;
    response?: T;
};

type ApiEndpoints = {
    users: {
        list: ApiEndpoint<User[]>;
        get: ApiEndpoint<User>;
        create: ApiEndpoint<User>;
        update: ApiEndpoint<User>;
        delete: ApiEndpoint<null>;
    };
    products: {
        list: ApiEndpoint<Product[]>;
        get: ApiEndpoint<Product>;
        create: ApiEndpoint<Product>;
        update: ApiEndpoint<Product>;
        delete: ApiEndpoint<null>;
    };
};

interface User {
    id: string;
    name: string;
    email: string;
}

interface Product {
    id: string;
    name: string;
    price: number;
}

class ApiClient {
    async request<T>(
        method: HttpMethod,
        path: string,
        data?: any
    ): Promise<T> {
        // Simulate API call
        console.log(`${method} ${path}`, data);
        return {} as T;
    }

    // Type-safe methods based on endpoint definitions
    async getUsers(): Promise<User[]> {
        return this.request<User[]>("GET", "/users");
    }

    async getUser(id: string): Promise<User> {
        return this.request<User>("GET", `/users/${id}`);
    }

    async createUser(user: Omit<User, "id">): Promise<User> {
        return this.request<User>("POST", "/users", user);
    }
}

// Usage
const apiClient = new ApiClient();

apiClient.getUsers().then(users => {
    console.log("Users:", users);
});

apiClient.createUser({ name: "John", email: "john@example.com" }).then(user => {
    console.log("Created user:", user);
});

// Summary: This exercise demonstrates:
// - String, number, and boolean literal types
// - Literal type unions and their practical applications
// - Const assertions and their effects on literal types
// - Template literal types and string manipulation
// - Mapped types with literal types
// - Branded types with literal types
// - Recursive literal type definitions
// - Practical applications in routing, state machines, CSS-in-JS, forms, and APIs
// - Type-safe configurations and event systems
// - Advanced type patterns using literal types
