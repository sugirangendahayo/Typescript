// contacts object
var contacts = {};
var form = document.getElementById("contactForm");
var nameInput = document.getElementById("name");
var phoneInput = document.getElementById("phone");
var contactsList = document.getElementById("contactsList");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = nameInput.value;
    var phone = Number(phoneInput.value);
    // dynamic property
    contacts[name] = phone;
    renderContacts();
    nameInput.value = "";
    phoneInput.value = "";
});
function renderContacts() {
    contactsList.innerHTML = "";
    for (var name_1 in contacts) {
        var li = document.createElement("li");
        li.textContent = "".concat(name_1, ": ").concat(contacts[name_1]);
        contactsList.appendChild(li);
    }
}
