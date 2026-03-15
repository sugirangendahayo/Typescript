// typeof (Type Guard)

// Used to check primitive types.

// Example
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}

// What happened?

// value can be string OR number.

// typeof helps TypeScript narrow the type.

// Use case

// When dealing with:

// string

// number

// boolean

// undefined

// function