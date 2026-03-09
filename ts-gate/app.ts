// Index Signature
type Contacts = {
  [name: string]: number;
};

// contacts object
const contacts: Contacts = {};

const form = document.getElementById("contactForm") as HTMLFormElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
const phoneInput = document.getElementById("phone") as HTMLInputElement;
const contactsList = document.getElementById(
  "contactsList",
) as HTMLUListElement;

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = nameInput.value;
  const phone = Number(phoneInput.value);

  // dynamic property
  contacts[name] = phone;

  renderContacts();

  nameInput.value = "";
  phoneInput.value = "";
});

function renderContacts() {
  contactsList.innerHTML = "";

  for (const name in contacts) {
    const li = document.createElement("li");
    li.textContent = `${name}: ${contacts[name]}`;
    contactsList.appendChild(li);
  }
}
