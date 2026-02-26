// EXERCISE 9: Optional and Default Parameters
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's optional parameters using the question mark (?)
// Understand how to set default values for function parameters
// Practice using optional and default parameters in various scenarios
// Learn about parameter ordering and best practices
//
// WHAT WE DID:
// - Demonstrated optional parameters with the question mark syntax
// - Showed default parameters with assignment syntax
// - Explained parameter ordering rules and constraints
// - Demonstrated function overloading with optional parameters
// - Showed practical applications in real-world scenarios

// Basic Optional Parameters
// Parameters marked with ? are optional and can be undefined
function buildName(firstName: string, lastName?: string): string {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}

console.log("Full name:", buildName("John", "Doe"));
console.log("First name only:", buildName("Alice"));

// Multiple Optional Parameters
function createPerson(
  name: string,
  age?: number,
  email?: string,
  phone?: string,
): { name: string; age?: number; email?: string; phone?: string } {
  return {
    name,
    age,
    email,
    phone,
  };
}

const optionalPerson1 = createPerson("John Doe");
const optionalPerson2 = createPerson("Jane Smith", 28);
const optionalPerson3 = createPerson("Bob Johnson", 35, "bob@example.com");
const optionalPerson4 = createPerson(
  "Alice Brown",
  30,
  "alice@example.com",
  "555-1234",
);

console.log("Person 1:", optionalPerson1);
console.log("Person 2:", optionalPerson2);
console.log("Person 3:", optionalPerson3);
console.log("Person 4:", optionalPerson4);

// Basic Default Parameters
// Parameters with default values using = syntax
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

function calculatePrice(price: number, tax: number = 0.1): number {
  return price * (1 + tax);
}

function logMessage(message: string, level: string = "info"): void {
  console.log(`[${level.toUpperCase()}] ${message}`);
}

console.log(greet("Alice")); // Uses default greeting
console.log(greet("Bob", "Hi")); // Uses provided greeting
console.log("Price with default tax:", calculatePrice(100));
console.log("Price with custom tax:", calculatePrice(100, 0.2));
logMessage("This is an info message");
logMessage("This is a warning", "warn");

// Default Parameters with Different Types
function createUser(
  name: string,
  age: number = 18,
  isActive: boolean = true,
  roles: string[] = ["user"],
): { name: string; age: number; isActive: boolean; roles: string[] } {
  return { name, age, isActive, roles };
}

function createElement(
  tag: string,
  attributes: Record<string, string> = {},
  children: string[] = [],
): { tag: string; attributes: Record<string, string>; children: string[] } {
  return { tag, attributes, children };
}

const defaultUser = createUser("John");
const customUser = createUser("Jane", 25, false, ["admin", "user"]);
const defaultElement = createElement("div");
const customElement = createElement("button", { type: "submit" }, ["Click me"]);

console.log("Default user:", defaultUser);
console.log("Custom user:", customUser);
console.log("Default element:", defaultElement);
console.log("Custom element:", customElement);

// Combining Optional and Default Parameters
function formatUser(
  firstName: string,
  lastName?: string,
  title: string = "Mr./Ms.",
): string {
  const fullName = lastName ? `${firstName} ${lastName}` : firstName;
  return `${title} ${fullName}`;
}

function processOrder(
  orderId: string,
  items?: string[],
  priority: string = "normal",
  expedited: boolean = false,
): { orderId: string; items: string[]; priority: string; expedited: boolean } {
  return {
    orderId,
    items: items || [],
    priority,
    expedited,
  };
}

console.log(formatUser("John", "Doe"));
console.log(formatUser("Alice", undefined, "Dr."));
console.log(formatUser("Bob", "Smith", "Prof."));

console.log(processOrder("ORD123"));
console.log(processOrder("ORD456", ["item1", "item2"]));
console.log(processOrder("ORD789", ["item1"], "high", true));

// Function Overloading with Optional Parameters
// Overload signatures
function createElementOverload(tag: string): HTMLElement;
function createElementOverload(tag: string, text: string): HTMLElement;
function createElementOverload(
  tag: string,
  attributes: Record<string, string>,
): HTMLElement;
function createElementOverload(
  tag: string,
  textOrAttributes?: string | Record<string, string>,
): HTMLElement {
  const element = document.createElement(tag);

  if (typeof textOrAttributes === "string") {
    element.textContent = textOrAttributes;
  } else if (typeof textOrAttributes === "object") {
    Object.keys(textOrAttributes).forEach((key) => {
      element.setAttribute(key, textOrAttributes[key]);
    });
  }

  return element;
}

// Parameter Ordering Rules
// Required parameters must come before optional parameters
// This is VALID:
function validFunction(
  required: string,
  optional?: string,
  defaulted: string = "default",
): void {
  console.log(required, optional, defaulted);
}

// This would be INVALID - optional parameters cannot come before required ones:
// function invalidFunction(optional?: string, required: string): void {} // Error!

// This is VALID - all parameters after the first required can be optional/default:
function mixedParameters(
  required1: string,
  required2: number,
  optional1?: boolean,
  defaulted1: string = "default",
  optional2?: string,
  defaulted2: number = 42,
): void {
  console.log({
    required1,
    required2,
    optional1,
    defaulted1,
    optional2,
    defaulted2,
  });
}

mixedParameters("test", 123);
mixedParameters("test", 123, true);
mixedParameters("test", 123, true, "custom");
mixedParameters("test", 123, true, "custom", "optional");
mixedParameters("test", 123, true, "custom", "optional", 100);

// Optional Parameters in Interfaces and Types
interface UserConfig {
  name: string;
  age?: number;
  email?: string;
  settings?: {
    theme?: string;
    notifications?: boolean;
    language?: string;
  };
}

type OptionalProduct = {
  id: number;
  name: string;
  price?: number;
  description?: string;
  inStock?: boolean;
};

function updateUserConfig(config: Partial<UserConfig>): void {
  console.log("Updating user config:", config);
}

function displayOptionalProduct(product: OptionalProduct): void {
  console.log(`Product: ${product.name}`);
  if (product.price !== undefined) {
    console.log(`Price: $${product.price}`);
  }
  if (product.description) {
    console.log(`Description: ${product.description}`);
  }
  if (product.inStock !== undefined) {
    console.log(`In stock: ${product.inStock}`);
  }
}

updateUserConfig({ name: "John" });
updateUserConfig({ name: "Jane", age: 28, email: "jane@example.com" });

displayOptionalProduct({ id: 1, name: "Laptop" });
displayOptionalProduct({
  id: 2,
  name: "Mouse",
  price: 29.99,
  description: "Wireless mouse",
  inStock: true,
});

// Optional Parameters in Classes
class Calculator {
  private precision: number;
  private currency: string;

  constructor(precision: number = 2, currency: string = "USD") {
    this.precision = precision;
    this.currency = currency;
  }

  add(a: number, b: number): string {
    const result = a + b;
    return `${this.currency} ${result.toFixed(this.precision)}`;
  }

  format(amount: number, showCurrency: boolean = true): string {
    const formatted = amount.toFixed(this.precision);
    return showCurrency ? `${this.currency} ${formatted}` : formatted;
  }
}

class Logger {
  private prefix: string;
  private level: string;

  constructor(prefix: string = "APP", level: string = "info") {
    this.prefix = prefix;
    this.level = level;
  }

  log(message: string, timestamp?: Date): void {
    const time = timestamp || new Date();
    console.log(
      `[${time.toISOString()}] [${this.prefix}] [${this.level.toUpperCase()}] ${message}`,
    );
  }

  error(message: string, details?: any): void {
    console.error(`[${this.prefix}] ERROR: ${message}`, details || "");
  }
}

const calculator = new Calculator();
const preciseCalculator = new Calculator(4, "EUR");
const logger = new Logger();
const errorLogger = new Logger("ERROR", "error");

console.log(calculator.add(10.567, 20.234));
console.log(preciseCalculator.add(10.567, 20.234));
console.log(calculator.format(123.456));
console.log(calculator.format(123.456, false));

logger.log("Application started");
logger.log("User logged in", new Date());
errorLogger.error("Database connection failed", {
  code: 500,
  message: "Connection timeout",
});

// Practical Examples

// Example 1: API Request Function
interface OptionalRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
}

interface OptionalApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  status: number;
}

async function makeOptionalApiRequest<T>(
  url: string,
  options: OptionalRequestOptions = {},
): Promise<OptionalApiResponse<T>> {
  const {
    method = "GET",
    headers = {},
    body,
    timeout = 5000,
    retries = 3,
  } = options;

  console.log(`Making ${method} request to ${url}`);
  console.log(`Headers:`, headers);
  console.log(`Timeout: ${timeout}ms, Retries: ${retries}`);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: { message: "Request successful" } as T,
        status: 200,
      });
    }, 1000);
  });
}

// Usage examples
makeOptionalApiRequest("/api/users").then((response) => {
  console.log("Simple request:", response);
});

makeOptionalApiRequest("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: { name: "John" },
  timeout: 10000,
  retries: 5,
}).then((response) => {
  console.log("Complex request:", response);
});

// Example 2: Form Validation
interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

interface FieldConfig {
  name: string;
  type: "text" | "email" | "password" | "number";
  label: string;
  rules?: ValidationRule;
  placeholder?: string;
  helpText?: string;
}

function validateField(
  value: string,
  config: FieldConfig,
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  const rules = config.rules || {};

  if (rules.required && (!value || value.trim() === "")) {
    errors.push(`${config.label} is required`);
  }

  if (rules.minLength && value.length < rules.minLength) {
    errors.push(
      `${config.label} must be at least ${rules.minLength} characters`,
    );
  }

  if (rules.maxLength && value.length > rules.maxLength) {
    errors.push(
      `${config.label} must not exceed ${rules.maxLength} characters`,
    );
  }

  if (rules.pattern && !rules.pattern.test(value)) {
    errors.push(`${config.label} format is invalid`);
  }

  if (rules.custom && !rules.custom(value)) {
    errors.push(`${config.label} failed custom validation`);
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// Field configurations
const nameField: FieldConfig = {
  name: "firstName",
  type: "text",
  label: "First Name",
  rules: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  placeholder: "Enter your first name",
  helpText: "Please enter your real first name",
};

const emailField: FieldConfig = {
  name: "email",
  type: "email",
  label: "Email Address",
  rules: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  placeholder: "Enter your email address",
};

const passwordField: FieldConfig = {
  name: "password",
  type: "password",
  label: "Password",
  rules: {
    required: true,
    minLength: 8,
    custom: (value) => /[A-Z]/.test(value) && /[0-9]/.test(value),
  },
  helpText: "Must contain at least 8 characters with uppercase and number",
};

// Validation examples
console.log(validateField("John", nameField));
console.log(validateField("invalid-email", emailField));
console.log(validateField("weak", passwordField));

// Example 3: Configuration Management
interface OptionalDatabaseConfig {
  host: string;
  port?: number;
  username: string;
  password: string;
  database?: string;
  ssl?: boolean;
  connectionTimeout?: number;
}

interface OptionalAppConfig {
  appName: string;
  version?: string;
  environment?: "development" | "staging" | "production";
  database: OptionalDatabaseConfig;
  logging?: {
    level?: string;
    file?: string;
    console?: boolean;
  };
  features?: {
    analytics?: boolean;
    notifications?: boolean;
    betaFeatures?: boolean;
  };
}

function createOptionalAppConfig(config: OptionalAppConfig): void {
  const {
    appName,
    version = "1.0.0",
    environment = "development",
    database,
    logging = {},
    features = {},
  } = config;

  const {
    level = "info",
    file = "app.log",
    console: consoleLogging = true,
  } = logging;

  const {
    analytics = false,
    notifications = true,
    betaFeatures = false,
  } = features;

  console.log("Application Configuration:");
  console.log(`  Name: ${appName}`);
  console.log(`  Version: ${version}`);
  console.log(`  Environment: ${environment}`);
  console.log(`  Database: ${database.host}:${database.port || 5432}`);
  console.log(
    `  Logging: ${level} (${consoleLogging ? "console" : "no console"}, file: ${file})`,
  );
  console.log(
    `  Features: Analytics=${analytics}, Notifications=${notifications}, Beta=${betaFeatures}`,
  );
}

// Usage examples
const basicOptionalConfig: OptionalAppConfig = {
  appName: "MyApp",
  database: {
    host: "localhost",
    username: "admin",
    password: "secret",
  },
};

const fullOptionalConfig: OptionalAppConfig = {
  appName: "MyApp",
  version: "2.1.0",
  environment: "production",
  database: {
    host: "prod-db.example.com",
    port: 5432,
    username: "app_user",
    password: "secure_password",
    database: "myapp_prod",
    ssl: true,
    connectionTimeout: 10000,
  },
  logging: {
    level: "warn",
    file: "/var/log/myapp.log",
    console: false,
  },
  features: {
    analytics: true,
    notifications: true,
    betaFeatures: false,
  },
};

createOptionalAppConfig(basicOptionalConfig);
createOptionalAppConfig(fullOptionalConfig);

// Example 4: Component Factory
interface ComponentProps {
  id: string;
  className?: string;
  style?: Record<string, string>;
  children?: string[];
  onClick?: () => void;
  disabled?: boolean;
}

function createButton(props: ComponentProps): HTMLElement {
  const button = document.createElement("button");
  button.id = props.id;

  if (props.className) {
    button.className = props.className;
  }

  if (props.style) {
    Object.keys(props.style).forEach((key) => {
      button.style[key as any] = props.style![key];
    });
  }

  if (props.children) {
    button.textContent = props.children.join(" ");
  }

  if (props.onClick) {
    button.addEventListener("click", props.onClick);
  }

  if (props.disabled) {
    button.disabled = true;
  }

  return button;
}

function createInput(
  props: ComponentProps & {
    type?: "text" | "email" | "password";
    placeholder?: string;
    value?: string;
  },
): HTMLElement {
  const input = document.createElement("input");
  input.id = props.id;

  if (props.type) {
    input.type = props.type;
  }

  if (props.placeholder) {
    input.placeholder = props.placeholder;
  }

  if (props.value) {
    input.value = props.value;
  }

  if (props.className) {
    input.className = props.className;
  }

  if (props.style) {
    Object.keys(props.style).forEach((key) => {
      input.style[key as any] = props.style![key];
    });
  }

  if (props.disabled) {
    input.disabled = true;
  }

  return input;
}

// Usage examples (in a browser environment)
const submitButton = createButton({
  id: "submit-btn",
  className: "btn btn-primary",
  style: { backgroundColor: "blue", color: "white" },
  children: ["Submit"],
  onClick: () => console.log("Button clicked!"),
  disabled: false,
});

const emailInput = createInput({
  id: "email-input",
  type: "email",
  placeholder: "Enter your email",
  className: "form-control",
  value: "",
  disabled: false,
});

console.log("Created button element:", submitButton);
console.log("Created input element:", emailInput);

// Example 5: Utility Functions
function formatOptionalString(
  template: string,
  replacements: Record<string, any> = {},
  options: {
    caseSensitive?: boolean;
    preserveUndefined?: boolean;
  } = {},
): string {
  const { caseSensitive = true, preserveUndefined = false } = options;

  let result = template;

  Object.keys(replacements).forEach((key) => {
    const searchKey = caseSensitive ? key : key.toLowerCase();
    const searchPattern = new RegExp(`\\{${searchKey}\\}`, "g");

    const replacement =
      preserveUndefined && replacements[key] === undefined
        ? `{${key}}`
        : String(replacements[key] || "");
    result = result.replace(searchPattern, replacement);
  });

  return result;
}

function optionalDebounce<T extends any[]>(
  func: (...args: T) => void,
  delay: number = 300,
  immediate: boolean = false,
): (...args: T) => void {
  let timeout: number | null = null;

  return (...args: T) => {
    const callNow = immediate && !timeout;

    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func(...args);
      }
    }, delay);

    if (callNow) {
      func(...args);
    }
  };
}

function optionalThrottle<T extends any[]>(
  func: (...args: T) => void,
  limit: number = 250,
): (...args: T) => void {
  let inThrottle: boolean = false;

  return (...args: T) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage examples
const optionalGreeting = formatOptionalString(
  "Hello {name}, welcome to {app}! Today is {day}.",
  { name: "Alice", app: "TypeScript Tutorial", day: "Monday" },
  { caseSensitive: false, preserveUndefined: true },
);

console.log(optionalGreeting);

const optionalDebouncedSearch = optionalDebounce((query: string) => {
  console.log("Searching for:", query);
}, 500);

const optionalThrottledScroll = optionalThrottle(() => {
  console.log("Scroll event handled");
}, 100);

// Simulate usage
optionalDebouncedSearch("typescript");
optionalDebouncedSearch("tutorial");
optionalDebouncedSearch("examples");

optionalThrottledScroll();
optionalThrottledScroll();
optionalThrottledScroll();

// Summary: This exercise demonstrates:
// - Optional parameters using the question mark (?) syntax
// - Default parameters using assignment (=) syntax
// - Parameter ordering rules and constraints
// - Combining optional and default parameters
// - Function overloading with optional parameters
// - Optional parameters in interfaces and types
// - Optional parameters in classes and methods
// - Practical applications in API requests, form validation, configuration, components, and utility functions
// - Best practices for parameter design and usage
