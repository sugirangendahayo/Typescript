interface Address {
  city: string;
  street?: string;
}
interface Customer {
  name: string;
  address?: Address;
}
interface Order {
  customer: Customer;
}

const logOrder = (order: Order) => {
  console.log(`Shipping to: ${order.customer.address?.city ?? "Unkown city"}`);
};

logOrder({
  customer: {
    name: "Jane",
  },
});
