type User = { name: string };
type Product = { price: number };

function isUser(data: any): data is User {
  return "name" in data;
}


// function isProduct(data: User | Product): void {
//   if ("name" in data) {
//     console.log(data.name); 
//   } else {
//     console.log(data.price); 
//   }
// }

function handle(data: User | Product) {
  if (isUser(data)) {
    console.log("User:", data.name);
  } else {
    console.log("Product:", data.price);
  }
}
