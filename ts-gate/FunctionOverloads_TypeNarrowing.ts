const uncle = "Solomon";
function rewardByGreeting(m: number): string;
function rewardByGreeting(m: string, a: number): string;

function rewardByGreeting(m: number | string, a?: number) {
  if (typeof m === "number") {
    return `Uncle ${uncle} gave me ${m} USD Dollars without greeting me!`;
  }
  return `Uncle ${uncle} just greeted me saying ${m}, with ${a} USD Dollars`;
}
console.log(rewardByGreeting(10000));
console.log(rewardByGreeting("Hello", 1000000));
