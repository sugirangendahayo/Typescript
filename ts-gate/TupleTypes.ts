// Solve all the typing issues in the code without changing the implementation

// const setRange = (range: number): number => {
//   const x = range[0];
//   const y = range[1];

//   return { x, y: y.age > 10 };
// };
type Person = {
  name: string;
  age: number;
};

type Range = [boolean, Person];

const setRange = (range: Range) => {
  const x = range[0];
  const y = range[1];

  return { x, y: y.age > 10 };
};
console.log(setRange([true, { name: "Patrick", age: 30 }]));
