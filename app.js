// selecting the DOM element
const form = document.getElementById("form");
const inputs = document.querySelectorAll("input");
const continueBtn = document.querySelector(".btn");
const detailsPerson = document.querySelector(".details-person");
const continueArticle = document.querySelector(".article");
const errors = document.querySelectorAll(".error");
const cardNumber = document.querySelector(".card-number");
const personName = document.querySelector(".name");
const theMonth = document.querySelector(".month");
const theYear = document.querySelector(".year");
const secretNumber = document.querySelector(".secret-number");

// Regular expression for card number and secret number
const regExp = /^(\d{4}\s\d{4}\s\d{4}\s\d{4})|(\d{3})$/;

// Flag to track overall form validity
let isValidForm = false;

// Get the current year for validation
const date = new Date();
const currentYear = date.getFullYear();

// Event listeners
form.addEventListener("submit", checkForm);
continueBtn.addEventListener("click", returnToMianPage);

// Function to handle form submission
function checkForm(e) {
  e.preventDefault();
  const inputName = inputs[0].value.trim();
  const inputcardNumber = inputs[1].value.trim();
  const inputMonth = inputs[2].value.trim();
  const inputYear = inputs[3].value.trim();
  const inputCvc = inputs[4].value.trim();

  // Reset form validity flag
  isValidForm = true;

  // Set a timer to remove errors and borders after 3 seconds
  timerToRemoveErrorsAndBorder();

  // Validate name input
  if (!inputName) {
    handleInvalidInput(errors[0], inputs[0], "Can`t be blank");
    return;
  } else {
    personName.textContent = inputName;
  }

  // Validate card number input
  if (!regExp.test(inputcardNumber)) {
    handleInvalidInput(errors[1], inputs[1], "Wrong format, numbers only");
    return;
  } else {
    cardNumber.textContent = inputcardNumber;
  }

  // Validate month input
  if (!inputMonth || inputMonth > 12 || inputMonth < 1) {
    handleInvalidInput(errors[2], inputs[2], "Can`t be blank");
    return;
  } else {
    theMonth.textContent = inputMonth;
  }

  // Validate year input
  if (!inputYear || inputYear > currentYear) {
    handleInvalidInput(errors[3], inputs[3], "Can`t be blank");
    return;
  } else {
    theYear.textContent = inputYear;
  }

  // Validate cvc input
  if (!regExp.test(inputCvc)) {
    handleInvalidInput(errors[4], inputs[4], "Can`t be blank");
    return;
  } else {
    secretNumber.textContent = inputCvc;
  }

  // If all validations pass, dump fields input and show success message
  dumpFields();
  displaysuccessMessage();
}

// Timer function to remove errors and borders after 3 seconds
function timerToRemoveErrorsAndBorder() {
  setTimeout(() => {
    errors.forEach((error) => {
      error.textContent = "";
    });
    inputs.forEach((input) => {
      input.classList.remove("border-red");
    });
  }, 3000);
}

// Function to display success message and hide the form
function displaysuccessMessage() {
  continueArticle.classList.add("block");
  detailsPerson.classList.add("none");
}

// Function to return to the main page
function returnToMianPage() {
  continueArticle.classList.remove("block");
  detailsPerson.classList.remove("none");

  // dump the card after clicking the button continue
  dumpTheCard();
}

// function to dump fields input
function dumpFields() {
  inputs.forEach((input) => {
    input.value = "";
  });
}

// function to dump the card after clicking the button continue
function dumpTheCard() {
  cardNumber.textContent = "0000 0000 0000 0000";
  personName.textContent = "jane appleseed";
  theMonth.textContent = "00";
  theYear.textContent = "00";
  secretNumber.textContent = "000";
}

// creating a helper function for handling invalid inputs.
function handleInvalidInput(errorElement, inputElement, errorMessage) {
  errorElement.textContent = errorMessage;
  inputElement.classList.add("border-red");
  isValidForm = false;
}
