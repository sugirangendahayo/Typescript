// EXERCISE 11: Never Type and Type Guards
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's never type and its practical applications
// Understand different types of type guards (typeof, instanceof, in, custom)
// Practice using type guards for type narrowing and safety
// Learn about exhaustive checking and control flow analysis
//
// WHAT WE DID:
// - Demonstrated the never type and its use cases
// - Showed various type guard techniques and implementations
// - Explained type narrowing and control flow analysis
// - Demonstrated exhaustive checking with never type
// - Showed practical applications in real-world scenarios

// ===== BASIC NEVER TYPE AND TYPE GUARDS =====
//
// QUESTION 1: Basic Never Type
// Create a function that returns never type and explain when it's useful.
// The function should never return normally - it should always throw an error
// or enter an infinite loop. This demonstrates the basic concept of never type.

// SOLUTION 1: Basic Never Type
function throwError(message: string): never {
  throw new Error(message);
  // This function never returns - it always throws
}

function infiniteLoop(): never {
  while (true) {
    // Infinite loop - never returns
  }
}

function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${value}`);
}

// Usage examples
try {
  throwError("This is an error");
} catch (error) {
  console.log("Caught error:", error);
}

// Uncomment to see infinite loop (will hang the program)
// infiniteLoop();

console.log("Program continues after error handling");

// QUESTION 2: Basic Type Guards with typeof
// Create a function that uses typeof type guard to handle different types.
// The function should accept a value that could be string, number, or boolean
// and return a formatted string based on the type.

// SOLUTION 2: Basic Type Guards with typeof
function formatValue(value: string | number | boolean): string {
  if (typeof value === "string") {
    return `String: "${value}"`;
  } else if (typeof value === "number") {
    return `Number: ${value.toFixed(2)}`;
  } else if (typeof value === "boolean") {
    return `Boolean: ${value ? "true" : "false"}`;
  } else {
    // This branch should never be reached due to type narrowing
    return assertNever(value);
  }
}

// Usage examples
console.log(formatValue("hello"));
console.log(formatValue(42.567));
console.log(formatValue(true));

// QUESTION 3: Type Guard Function
// Create a custom type guard function that checks if a value is a string.
// The function should return a boolean and use a type predicate.
// This demonstrates how to create custom type guards.

// SOLUTION 3: Type Guard Function
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number" && !isNaN(value);
}

function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

// Usage examples
function processUnknown(value: unknown): void {
  if (isString(value)) {
    console.log("Processing string:", value.toUpperCase());
  } else if (isNumber(value)) {
    console.log("Processing number:", value * 2);
  } else if (isBoolean(value)) {
    console.log("Processing boolean:", value ? "YES" : "NO");
  } else {
    console.log("Processing unknown type");
  }
}

processUnknown("hello world");
processUnknown(123);
processUnknown(false);
processUnknown({});

// ===== INTERMEDIATE TYPE GUARDS =====
//
// QUESTION 1: Instanceof Type Guard
// Create a class hierarchy and use instanceof type guard to handle different types.
// Create a base class and two derived classes, then a function that processes them differently.

// SOLUTION 1: Instanceof Type Guard
abstract class NeverShape {
  abstract getArea(): number;
  abstract getPerimeter(): number;
}

class NeverCircle extends NeverShape {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  getRadius(): number {
    return this.radius;
  }
}

class NeverRectangle extends NeverShape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }

  getDimensions(): { width: number; height: number } {
    return { width: this.width, height: this.height };
  }
}

class NeverTriangle extends NeverShape {
  constructor(
    private base: number,
    private height: number,
    private side1: number,
    private side2: number,
    private side3: number,
  ) {
    super();
  }

  getArea(): number {
    return (this.base * this.height) / 2;
  }

  getPerimeter(): number {
    return this.side1 + this.side2 + this.side3;
  }

  getSides(): {
    base: number;
    height: number;
    sides: [number, number, number];
  } {
    return {
      base: this.base,
      height: this.height,
      sides: [this.side1, this.side2, this.side3],
    };
  }
}

function describeNeverShape(shape: NeverShape): string {
  if (shape instanceof NeverCircle) {
    return `Circle with radius ${shape.getRadius()}, area: ${shape.getArea().toFixed(2)}`;
  } else if (shape instanceof NeverRectangle) {
    const dims = shape.getDimensions();
    return `Rectangle ${dims.width}x${dims.height}, area: ${shape.getArea().toFixed(2)}`;
  } else if (shape instanceof NeverTriangle) {
    const sides = shape.getSides();
    return `Triangle with base ${sides.base}, height ${sides.height}, area: ${shape.getArea().toFixed(2)}`;
  } else {
    // This should never happen if all Shape subclasses are handled
    return assertNever(shape);
  }
}

// Usage examples
const neverShapes: NeverShape[] = [
  new NeverCircle(5),
  new NeverRectangle(4, 6),
  new NeverTriangle(3, 4, 3, 4, 5),
];

neverShapes.forEach((shape) => console.log(describeNeverShape(shape)));

// QUESTION 2: In Operator Type Guard
// Create interfaces with optional properties and use the 'in' operator
// as a type guard to distinguish between different object types.

// SOLUTION 2: In Operator Type Guard
interface NeverCar {
  type: "car";
  make: string;
  model: string;
  year: number;
  doors: number;
}

interface NeverMotorcycle {
  type: "motorcycle";
  make: string;
  model: string;
  year: number;
  hasSidecar: boolean;
}

interface NeverBicycle {
  type: "bicycle";
  brand: string;
  gears: number;
  hasElectricMotor: boolean;
}

type NeverVehicle = NeverCar | NeverMotorcycle | NeverBicycle;

function describeNeverVehicle(vehicle: NeverVehicle): string {
  if (vehicle.type === "car") {
    return `${vehicle.make} ${vehicle.model} (${vehicle.year}) - ${vehicle.doors} doors`;
  } else if (vehicle.type === "motorcycle") {
    return `${vehicle.make} ${vehicle.model} (${vehicle.year}) - Sidecar: ${vehicle.hasSidecar}`;
  } else if (vehicle.type === "bicycle") {
    return `${vehicle.brand} bicycle - ${vehicle.gears} gears, Electric: ${vehicle.hasElectricMotor}`;
  } else {
    return assertNever(vehicle);
  }
}

// Alternative using 'in' operator
function describeNeverVehicleWithIn(vehicle: NeverVehicle): string {
  if ("doors" in vehicle) {
    // TypeScript knows this is a Car
    return `${vehicle.make} ${vehicle.model} (${vehicle.year}) - ${vehicle.doors} doors`;
  } else if ("hasSidecar" in vehicle) {
    // TypeScript knows this is a Motorcycle
    return `${vehicle.make} ${vehicle.model} (${vehicle.year}) - Sidecar: ${vehicle.hasSidecar}`;
  } else if ("gears" in vehicle) {
    // TypeScript knows this is a Bicycle
    return `${vehicle.brand} bicycle - ${vehicle.gears} gears, Electric: ${vehicle.hasElectricMotor}`;
  } else {
    return assertNever(vehicle);
  }
}

// Usage examples
const neverVehicles: NeverVehicle[] = [
  { type: "car", make: "Toyota", model: "Camry", year: 2022, doors: 4 },
  {
    type: "motorcycle",
    make: "Harley-Davidson",
    model: "Street 750",
    year: 2021,
    hasSidecar: false,
  },
  { type: "bicycle", brand: "Trek", gears: 21, hasElectricMotor: true },
];

neverVehicles.forEach((vehicle) => {
  console.log(describeNeverVehicle(vehicle));
  console.log(describeNeverVehicleWithIn(vehicle));
});

// QUESTION 3: Discriminated Unions
// Create a discriminated union type and use the discriminant property
// for type narrowing. This is a powerful pattern for type-safe handling.

// SOLUTION 3: Discriminated Unions
interface NeverLoadingState {
  status: "loading";
}

interface NeverSuccessState<T> {
  status: "success";
  data: T;
  message?: string;
}

interface NeverErrorState {
  status: "error";
  error: string;
  code?: number;
}

type NeverAsyncState<T> =
  | NeverLoadingState
  | NeverSuccessState<T>
  | NeverErrorState;

function renderNeverAsyncState<T>(state: NeverAsyncState<T>): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Success: ${state.message || "Operation completed"} - Data: ${JSON.stringify(state.data)}`;
    case "error":
      return `Error: ${state.error}${state.code ? ` (Code: ${state.code})` : ""}`;
    default:
      // Exhaustive checking - if we forget a case, TypeScript will error
      return assertNever(state);
  }
}

// Usage examples
const neverAsyncStates: NeverAsyncState<string | number>[] = [
  { status: "loading" },
  {
    status: "success",
    data: "User data loaded",
    message: "Successfully fetched",
  },
  { status: "error", error: "Network timeout", code: 408 },
  { status: "success", data: 42, message: "Count retrieved" },
];

neverAsyncStates.forEach((state) => console.log(renderNeverAsyncState(state)));

// ===== ADVANCED TYPE GUARDS AND NEVER TYPE =====
//
// QUESTION 1: Custom Type Guard with Complex Logic
// Create a custom type guard that checks for complex object structures.
// The guard should validate multiple properties and nested objects.

// SOLUTION 1: Custom Type Guard with Complex Logic
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
  specifications?: Record<string, any>;
}

interface Order {
  id: string;
  userId: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
}

type DataObject = User | Product | Order;

function isUser(obj: any): obj is User {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.email === "string" &&
    typeof obj.profile === "object" &&
    typeof obj.profile.age === "number"
  );
}

function isProduct(obj: any): obj is Product {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.name === "string" &&
    typeof obj.price === "number" &&
    typeof obj.category === "string"
  );
}

function isOrder(obj: any): obj is Order {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj.id === "string" &&
    typeof obj.userId === "string" &&
    Array.isArray(obj.items) &&
    typeof obj.total === "number" &&
    ["pending", "processing", "shipped", "delivered", "cancelled"].includes(
      obj.status,
    )
  );
}

function processDataObject(obj: any): string {
  if (isUser(obj)) {
    return `User: ${obj.name} (${obj.email}), Age: ${obj.profile.age}`;
  } else if (isProduct(obj)) {
    return `Product: ${obj.name} - $${obj.price} (${obj.category})`;
  } else if (isOrder(obj)) {
    return `Order: ${obj.id} - ${obj.items.length} items, Total: $${obj.total} (${obj.status})`;
  } else {
    return "Unknown object type";
  }
}

// Usage examples
const dataObjects: any[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    profile: { age: 30 },
  },
  {
    id: "2",
    name: "Laptop",
    price: 999.99,
    category: "Electronics",
  },
  {
    id: "3",
    userId: "1",
    items: [{ productId: "2", quantity: 1, price: 999.99 }],
    total: 999.99,
    status: "pending",
  },
  { invalid: "object" },
];

dataObjects.forEach((obj) => console.log(processDataObject(obj)));

// QUESTION 2: Exhaustive Checking with Never Type
// Create a function that uses exhaustive checking with the never type
// to ensure all cases are handled. Add a new case and see TypeScript catch the missing handling.

// SOLUTION 2: Exhaustive Checking with Never Type
type Theme = "light" | "dark" | "auto" | "high-contrast";

function getThemeConfig(theme: Theme): { colors: string; background: string } {
  switch (theme) {
    case "light":
      return { colors: "#000000", background: "#ffffff" };
    case "dark":
      return { colors: "#ffffff", background: "#000000" };
    case "auto":
      return { colors: "system", background: "system" };
    case "high-contrast":
      return { colors: "#ffff00", background: "#000000" };
    default:
      // If we add a new theme and forget to handle it, TypeScript will error here
      return assertNever(theme);
  }
}

// Usage examples
const themes: Theme[] = ["light", "dark", "auto", "high-contrast"];
themes.forEach((theme) => {
  const config = getThemeConfig(theme);
  console.log(`${theme} theme:`, config);
});

// QUESTION 3: Control Flow Analysis and Type Predicates
// Create a complex type guard that uses control flow analysis
// and type predicates to narrow types in sophisticated ways.

// SOLUTION 3: Control Flow Analysis and Type Predicates
interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
}

function hasData<T>(
  response: ApiResponse,
): response is ApiResponse & { data: T } {
  return response.success && response.data !== undefined;
}

function hasError(
  response: ApiResponse,
): response is ApiResponse & { error: string } {
  return !response.success && response.error !== undefined;
}

function processApiResponse(response: ApiResponse): void {
  if (hasError(response)) {
    console.log("Error occurred:", response.error);
    return;
  }

  if (hasData<User>(response)) {
    console.log("User data:", response.data.name, response.data.email);
  } else if (hasData<Product>(response)) {
    console.log("Product data:", response.data.name, "$", response.data.price);
  } else if (hasData<Order>(response)) {
    console.log(
      "Order data:",
      response.data.id,
      "Status:",
      response.data.status,
    );
  } else if (hasData<string[]>(response)) {
    console.log("String array data:", response.data.join(", "));
  } else {
    console.log("Unknown data type or no data");
  }
}

// Usage examples
const apiResponses: ApiResponse[] = [
  { success: false, error: "Authentication failed" },
  {
    success: true,
    data: {
      id: "1",
      name: "John",
      email: "john@example.com",
      profile: { age: 30 },
    },
  },
  {
    success: true,
    data: { id: "2", name: "Laptop", price: 999.99, category: "Electronics" },
  },
  { success: true, data: ["apple", "banana", "cherry"] },
  { success: true },
];

apiResponses.forEach((response) => processApiResponse(response));

// ===== PRACTICAL EXAMPLES =====

// Example 1: Form Validation with Type Guards
interface FormData {
  username?: string;
  email?: string;
  age?: unknown;
  terms?: unknown;
}

function isValidUsername(value: unknown): value is string {
  return typeof value === "string" && value.length >= 3 && value.length <= 20;
}

function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidAge(value: unknown): value is number {
  return typeof value === "number" && value >= 18 && value <= 120;
}

function isValidTerms(value: unknown): value is boolean {
  return typeof value === "boolean" && value === true;
}

function validateForm(data: FormData): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!isValidUsername(data.username)) {
    errors.push("Username must be 3-20 characters");
  }

  if (!isValidEmail(data.email)) {
    errors.push("Valid email required");
  }

  if (!isValidAge(data.age)) {
    errors.push("Age must be between 18 and 120");
  }

  if (!isValidTerms(data.terms)) {
    errors.push("Terms must be accepted");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Usage
const formData: FormData = {
  username: "john",
  email: "john@example.com",
  age: 25,
  terms: true,
};

const validation = validateForm(formData);
console.log("Form validation:", validation);

// Example 2: Event Handling with Type Guards
interface ClickEvent {
  type: "click";
  x: number;
  y: number;
  target: string;
}

interface KeyboardEvent {
  type: "keydown" | "keyup";
  key: string;
  code: string;
  ctrlKey: boolean;
  shiftKey: boolean;
}

interface MouseEvent {
  type: "mousedown" | "mouseup" | "mousemove";
  x: number;
  y: number;
  button: number;
}

type UIEvent = ClickEvent | KeyboardEvent | MouseEvent;

function handleUIEvent(event: UIEvent): void {
  switch (event.type) {
    case "click":
      console.log(`Clicked at (${event.x}, ${event.y}) on ${event.target}`);
      break;
    case "keydown":
    case "keyup":
      console.log(
        `Key ${event.type}: ${event.key} (Ctrl: ${event.ctrlKey}, Shift: ${event.shiftKey})`,
      );
      break;
    case "mousedown":
    case "mouseup":
    case "mousemove":
      console.log(
        `Mouse ${event.type} at (${event.x}, ${event.y}) with button ${event.button}`,
      );
      break;
    default:
      assertNever(event);
  }
}

// Usage
const events: UIEvent[] = [
  { type: "click", x: 100, y: 200, target: "button" },
  {
    type: "keydown",
    key: "Enter",
    code: "Enter",
    ctrlKey: false,
    shiftKey: false,
  },
  { type: "mousemove", x: 150, y: 250, button: 0 },
];

events.forEach((event) => handleUIEvent(event));

// Example 3: State Machine with Type Guards
type State =
  | { type: "idle" }
  | { type: "loading"; progress: number }
  | { type: "success"; data: any }
  | { type: "error"; error: string }
  | { type: "cancelled" };

class StateMachine {
  private currentState: State = { type: "idle" };

  getState(): State {
    return this.currentState;
  }

  startLoading(): void {
    if (
      this.currentState.type === "idle" ||
      this.currentState.type === "error"
    ) {
      this.currentState = { type: "loading", progress: 0 };
    }
  }

  updateProgress(progress: number): void {
    if (this.currentState.type === "loading") {
      this.currentState = { type: "loading", progress };
    }
  }

  complete(data: any): void {
    if (this.currentState.type === "loading") {
      this.currentState = { type: "success", data };
    }
  }

  fail(error: string): void {
    if (this.currentState.type === "loading") {
      this.currentState = { type: "error", error };
    }
  }

  cancel(): void {
    if (this.currentState.type === "loading") {
      this.currentState = { type: "cancelled" };
    }
  }

  reset(): void {
    this.currentState = { type: "idle" };
  }

  render(): string {
    switch (this.currentState.type) {
      case "idle":
        return "Ready to start";
      case "loading":
        return `Loading... ${this.currentState.progress}%`;
      case "success":
        return `Completed: ${JSON.stringify(this.currentState.data)}`;
      case "error":
        return `Error: ${this.currentState.error}`;
      case "cancelled":
        return "Operation cancelled";
      default:
        return assertNever(this.currentState);
    }
  }
}

// Usage
const stateMachine = new StateMachine();
console.log(stateMachine.render());

stateMachine.startLoading();
console.log(stateMachine.render());

stateMachine.updateProgress(25);
console.log(stateMachine.render());

stateMachine.updateProgress(75);
console.log(stateMachine.render());

stateMachine.complete({ message: "Operation successful" });
console.log(stateMachine.render());

// Summary: This exercise demonstrates:
// - The never type and its use cases for functions that never return
// - Basic type guards using typeof operator
// - Custom type guard functions with type predicates
// - Instanceof type guards for class hierarchies
// - In operator type guards for object property checking
// - Discriminated unions for type-safe handling
// - Complex custom type guards with nested validation
// - Exhaustive checking with never type for compile-time safety
// - Control flow analysis and sophisticated type narrowing
// - Practical applications in form validation, event handling, and state machines
