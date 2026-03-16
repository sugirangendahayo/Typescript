let ourTuple: [unknown, boolean, string];

// initialized incorrectly which throws an error
ourTuple = [false, true, "5"];
console.log(ourTuple)