// EXERCISE 6: Intersection Types
//
// WHAT WE ARE ASKED TO DO:
// Learn about TypeScript's intersection types using the ampersand (&) operator
// Understand how to combine multiple types into a single type
// Practice using intersection types with interfaces and type aliases
// Learn practical applications of intersection types in real-world scenarios
//
// WHAT WE DID:
// - Demonstrated intersection types with the ampersand (&) operator
// - Showed how to combine interfaces and type aliases
// - Demonstrated intersection types with functions and objects
// - Showed practical examples of intersection types in real scenarios
// - Explained the difference between union and intersection types

// Intersection Type Examples
// Basic intersection types using the ampersand (&) operator
interface Person {
  name: string;
  age: number;
}

interface IntersectionEmployee {
  employeeId: string;
  department: string;
  position: string;
  salary: number;
}

// Intersection type combining Person and Employee
type PersonEmployee = Person & IntersectionEmployee;

let personEmployee: PersonEmployee = {
  name: "John Doe",
  age: 30,
  employeeId: "EMP123",
  department: "Engineering",
  position: "Senior Developer",
  salary: 75000,
};

console.log("Person & Employee:", personEmployee);

// Intersection with multiple interfaces
interface ContactInfo {
  email: string;
  phone: string;
}

interface Address {
  street: string;
  city: string;
  zipCode: string;
}

// Combining three interfaces
type FullPersonInfo = Person & ContactInfo & Address;

let fullPerson: FullPersonInfo = {
  name: "Jane Smith",
  age: 28,
  email: "jane@example.com",
  phone: "555-1234",
  street: "123 Main St",
  city: "New York",
  zipCode: "10001",
};

console.log("Full person info:", fullPerson);

// Intersection Types with Type Aliases
type Identifiable = {
  id: string;
  createdAt: Date;
};

type Timestamped = {
  updatedAt: Date;
  version: number;
};

type Auditable = {
  createdBy: string;
  updatedBy: string;
};

// Combining multiple type aliases
type IntersectionBaseEntity = Identifiable & Timestamped & Auditable;

let intersectionEntity: IntersectionBaseEntity = {
  id: "entity123",
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-02-20"),
  version: 2,
  createdBy: "admin",
  updatedBy: "user123",
};

console.log("Base entity:", intersectionEntity);

// Intersection Types with Functions
type Callable = {
  (): void;
};

type Configurable = {
  configure(options: Record<string, any>): void;
};

// Intersection of function and object types
type ConfigurableFunction = Callable & Configurable;

function createConfigurableFunction(): ConfigurableFunction {
  const fn = function () {
    console.log("Function called");
  } as ConfigurableFunction;

  fn.configure = function (options: Record<string, any>) {
    console.log("Configured with:", options);
  };

  return fn;
}

let configurableFn = createConfigurableFunction();
configurableFn(); // Call the function
configurableFn.configure({ debug: true }); // Configure it

// Intersection Types with Classes
class Animal {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  eat(): void {
    console.log(`${this.name} is eating`);
  }
}

interface Flyable {
  fly(): void;
}

interface Swimmable {
  swim(): void;
}

// Intersection type for a duck (can eat, fly, and swim)
type Duck = Animal & Flyable & Swimmable;

class DuckClass extends Animal implements Flyable, Swimmable {
  fly(): void {
    console.log(`${this.name} is flying`);
  }

  swim(): void {
    console.log(`${this.name} is swimming`);
  }
}

let duck: Duck = new DuckClass("Donald");
duck.eat();
duck.fly();
duck.swim();

// Intersection Types with Generics
type Serializable = {
  serialize(): string;
};

type Validatable = {
  validate(): boolean;
};

type IdentifiableEntity<T> = T & Identifiable & Serializable & Validatable;

class IntersectionUser implements Serializable, Validatable {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public createdAt: Date = new Date(),
  ) {}

  serialize(): string {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
    });
  }

  validate(): boolean {
    return this.email.includes("@") && this.name.length > 0;
  }
}

let intersectionUserEntity: IdentifiableEntity<IntersectionUser> =
  new IntersectionUser("user123", "John Doe", "john@example.com");
console.log("User entity:", intersectionUserEntity);
console.log("Serialized:", intersectionUserEntity.serialize());
console.log("Valid:", intersectionUserEntity.validate());

// Practical Examples

// Example 1: API Request/Response Types
type HttpRequest = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  headers?: Record<string, string>;
};

type AuthenticatedUserInfo = {
  id: string;
  name: string;
  role: string;
};

type AuthenticatedRequest = {
  token: string;
  user: AuthenticatedUserInfo;
};

type LoggedRequest = {
  requestId: string;
  timestamp: Date;
};

// Intersection for authenticated, logged requests
type AuthenticatedLoggedRequest = HttpRequest &
  AuthenticatedRequest &
  LoggedRequest;

function makeAuthenticatedRequest(request: AuthenticatedLoggedRequest): void {
  console.log("Making authenticated request:", {
    method: request.method,
    url: request.url,
    user: request.user.name,
    requestId: request.requestId,
    timestamp: request.timestamp,
  });
}

let authRequest: AuthenticatedLoggedRequest = {
  method: "POST",
  url: "/api/data",
  token: "jwt-token",
  user: {
    id: "user123",
    name: "John Doe",
    role: "admin",
  },
  requestId: "req-123",
  timestamp: new Date(),
};

makeAuthenticatedRequest(authRequest);

// Example 2: Configuration Management
type DatabaseConfig = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

type CacheConfig = {
  enabled: boolean;
  ttl: number;
  maxSize: number;
};

type LoggingConfig = {
  level: "debug" | "info" | "warn" | "error";
  format: "json" | "text";
  destination: "console" | "file" | "remote";
};

// Intersection for complete application configuration
type IntersectionAppConfig = DatabaseConfig &
  CacheConfig &
  LoggingConfig & {
    appName: string;
    version: string;
    environment: "development" | "staging" | "production";
  };

let intersectionAppConfig: IntersectionAppConfig = {
  appName: "MyApp",
  version: "1.0.0",
  environment: "development",
  // Database config
  host: "localhost",
  port: 5432,
  database: "myapp",
  username: "admin",
  password: "secret",
  // Cache config
  enabled: true,
  ttl: 3600,
  maxSize: 1000,
  // Logging config
  level: "info",
  format: "json",
  destination: "console",
};

console.log("App configuration:", intersectionAppConfig);

// Example 3: Component Properties in UI Framework
type BaseComponentProps = {
  id: string;
  className?: string;
  style?: Record<string, any>;
  children?: any;
};

type ClickableProps = {
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
};

type FocusableProps = {
  onFocus: (event: FocusEvent) => void;
  onBlur: (event: FocusEvent) => void;
  tabIndex?: number;
};

type ValidatableProps = {
  required?: boolean;
  error?: string;
  validate?: () => boolean;
};

// Intersection for a button component
type ButtonProps = BaseComponentProps & ClickableProps & FocusableProps;

function createButton(props: ButtonProps): void {
  console.log("Creating button with props:", {
    id: props.id,
    disabled: props.disabled,
    tabIndex: props.tabIndex,
    hasClickHandler: !!props.onClick,
    hasFocusHandlers: !!(props.onFocus || props.onBlur),
  });
}

let buttonProps: ButtonProps = {
  id: "submit-btn",
  className: "btn-primary",
  onClick: (event) => console.log("Button clicked", event),
  disabled: false,
  onFocus: (event) => console.log("Button focused", event),
  onBlur: (event) => console.log("Button blurred", event),
  tabIndex: 0,
};

createButton(buttonProps);

// Example 4: Data Transfer Objects (DTOs)
type TimestampedDTO = {
  createdAt: Date;
  updatedAt: Date;
};

type SoftDeletableDTO = {
  deletedAt?: Date;
  isDeleted: boolean;
};

type VersionedDTO = {
  version: number;
  lastModifiedBy: string;
};

// Intersection for a complete entity DTO
type EntityDTO = {
  id: string;
} & TimestampedDTO &
  SoftDeletableDTO &
  VersionedDTO;

interface ProductDTO extends EntityDTO {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

let intersectionProduct: ProductDTO = {
  id: "prod123",
  name: "Laptop",
  price: 999.99,
  category: "Electronics",
  inStock: true,
  createdAt: new Date("2024-01-15"),
  updatedAt: new Date("2024-02-20"),
  deletedAt: undefined,
  isDeleted: false,
  version: 1,
  lastModifiedBy: "admin",
};

console.log("Product DTO:", intersectionProduct);

// Example 5: Middleware Composition
type RequestHandler = {
  handle(request: any): any;
};

type AuthMiddleware = {
  authenticate(token: string): boolean;
  getCurrentUser(): any;
};

type LoggingMiddleware = {
  log(message: string): void;
  setLogLevel(level: string): void;
};

type ValidationMiddleware = {
  validate(data: any): boolean;
  getValidationErrors(): string[];
};

// Intersection for a complete middleware stack
type CompleteMiddleware = RequestHandler &
  AuthMiddleware &
  LoggingMiddleware &
  ValidationMiddleware;

function createMiddlewareStack(): CompleteMiddleware {
  return {
    handle: (request) => {
      console.log("Handling request:", request);
      return { success: true };
    },
    authenticate: (token) => token === "valid-token",
    getCurrentUser: () => ({ id: "user123", name: "John" }),
    log: (message) => console.log("Log:", message),
    setLogLevel: (level) => console.log("Log level set to:", level),
    validate: (data) => data && typeof data === "object",
    getValidationErrors: () => [],
  };
}

let middleware = createMiddlewareStack();
console.log("Middleware result:", middleware.handle({ test: "data" }));
console.log("Authentication:", middleware.authenticate("valid-token"));
console.log("Current user:", middleware.getCurrentUser());

// Intersection vs Union Types
// Union types (OR) - value can be one of several types
type StringOrNumber = string | number;

// Intersection types (AND) - value must have all properties of all types
type StringAndNumber = { value: string } & { value: number }; // This creates a conflict!

// Practical intersection without conflicts
type Named = {
  name: string;
};

type Aged = {
  age: number;
};

type NamedAndAged = Named & Aged; // Valid - no property conflicts

let intersectionPerson: NamedAndAged = {
  name: "Alice",
  age: 30,
};

console.log("Named and aged person:", intersectionPerson);

// Type Guards for Intersection Types
function hasId(obj: any): obj is { id: string } {
  return obj && typeof obj.id === "string";
}

function hasTimestamp(obj: any): obj is { createdAt: Date } {
  return obj && obj.createdAt instanceof Date;
}

function processEntity(entity: any): void {
  if (hasId(entity) && hasTimestamp(entity)) {
    // TypeScript knows entity has both id and createdAt
    console.log(
      `Entity ${entity.id} created at ${entity.createdAt.toISOString()}`,
    );
  } else {
    console.log("Invalid entity format");
  }
}

processEntity({
  id: "entity123",
  createdAt: new Date(),
  data: "some data",
});

// Summary: This exercise demonstrates:
// - Intersection types using the ampersand (&) operator
// - Combining interfaces and type aliases
// - Intersection types with functions and classes
// - Generic intersection types
// - Practical applications in API requests, configuration, UI components, DTOs, and middleware
// - The difference between union (OR) and intersection (AND) types
// - Type guards for intersection types
// - Creating composable, reusable type definitions
