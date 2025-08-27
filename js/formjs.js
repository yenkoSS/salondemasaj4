const formNameEl = document.querySelector("#form-name");
const formEmailEl = document.querySelector("#form-email");
const formPhoneEl = document.querySelector("#form-phone");
const formMessageEl = document.querySelector("#form-message");
const textErrorEl = document.querySelector(".text-red");

emailjs.init("PcMzJdrAwUGZeQXLs"); /* emailJS public KEY*/
const templateID = "template_60gohgj"; /* emailJS templateID */
const serviceId = "websiteshop_serv"; /* emailJS serviceID */

function sendEmail() {
  let params = {
    name: formNameEl.value,
    email: formEmailEl.value,
    phone: formPhoneEl.value,
    message: formMessageEl.value,
  };

  document.getElementById("form-loader").style.display = "block";
  document.querySelector(".text-success").style.display = "none";

  emailjs.send(serviceId, templateID, params).then(() => {
    setTimeout(() => {
      document.getElementById("form-loader").style.display = "none";
      document.querySelector(".text-success").style.display = "block";
    }, 1000);
  });
}

function clearForm() {
  formNameEl.value = "";
  formEmailEl.value = "";
  formPhoneEl.value = "";
  formMessageEl.value = "";
}

document.querySelector(".form-contact").addEventListener("submit", function (event) {
  event.preventDefault();
  document.querySelector(".text-success").style.display = "none";
  let isValid = true;

  // Clear previous error messages
  textErrorEl.textContent = "";

  // Validate Message
  let message = formMessageEl.value;
  if (message === "") {
    textErrorEl.textContent = "Introduceți mesajul dvs.";
    isValid = false;
  }

  // Validate Phone
  let phone = formPhoneEl.value;
  if (phone === "") {
    textErrorEl.textContent = "Introduceți numărul dvs. de telefon.";
    isValid = false;
  } else if (!/^\d{10}$/.test(phone)) {
    textErrorEl.textContent = "Introduceți un număr de telefon valid.";
    isValid = false;
  }

  // Validate Email
  let email = formEmailEl.value;
  if (email === "") {
    textErrorEl.textContent = "Introduceți adresa dvs. de email.";
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    textErrorEl.textContent = "Introduceți o adresă de email validă.";
    isValid = false;
  }

  // Validate Name
  let name = formNameEl.value;
  if (name === "") {
    textErrorEl.textContent = "Introduceți numele dvs. complet.";
    isValid = false;
  }

  if (isValid) {
    sendEmail();
    clearForm(); // Prevent form submission if validation fails
  }
});

console.log("form Js");
