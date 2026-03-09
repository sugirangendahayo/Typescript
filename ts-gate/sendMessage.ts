const sendMessage = (message: { to: string; text?: string }) => {
  return (message.text?.toUpperCase() ?? "") + " " + message.to;
};

console.log(sendMessage({ to: "Alice", text: "Hey" }));
