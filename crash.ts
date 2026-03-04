function infinite(): never {
  while (true) {}
}
console.log("Hello"); //  never executed
infinite()