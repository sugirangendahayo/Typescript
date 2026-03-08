const person = {
    name: "John",
    age: 30,
    
}
const myVehicleBrand = person.vehicle?.brand ?? "No brand";
console.log(myVehicleBrand);
