// Define a generic type for users
interface User {
  id: string; // we don't know if it's number or string
  name: string;
}

// Function to process user IDs safely
function processUserId(user: User) {
  if (typeof user.id === "number") {
    console.log(`Numeric ID: ${user.id + 1}`);
  } else if (typeof user.id === "string") {
    console.log(`String ID: ${user.id.slice(0, 5)}...`);
  } else {
    console.log("Unknown ID type");
  }
}

// Fetch users from a "numeric ID API"
async function fetchUsersNumber() {
  const res = await fetch("./data/usersNumber.json");
  const users: User[] = await res.json();

  console.log("Users from numeric ID API:");
  users.forEach(processUserId);
}

// Fetch users from a "string ID API"
async function fetchUsersString() {
  const res = await fetch("./data/usersString.json");
  const users: User[] = await res.json();

  console.log("Users from string ID API:");
  users.forEach(processUserId);
}

// Run both
async function main() {
  await fetchUsersNumber();
  await fetchUsersString();
}

main();