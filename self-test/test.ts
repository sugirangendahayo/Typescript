let ourTuple: [number, boolean, string] = [5, false, 'Coding God was here'];

// This is allowed at runtime but technically violates the tuple's *defined* length of 3
ourTuple.push('Something new');
console.log(ourTuple); // Output: [5, false, 'Coding God was here', 'Something new']
const getTypeoflastElem = typeof ourTuple[ourTuple.length - 1];
console.log(getTypeoflastElem); // Output: string
console.log(ourTuple)
