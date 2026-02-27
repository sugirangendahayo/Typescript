const user = {
  name: "Solomon",
  age: 20,
  isAdmin: true,
};

function printUserInfo(u: {name: string; age: number; isAdmin: boolean}) {
  console.log(u.name);
}

printUserInfo(user);