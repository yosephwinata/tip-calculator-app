// Global tip percentage value
let tipPercentage = 0;

// Get elements
const billInputField = document.querySelector("#bill");
const tipButtons = document.querySelectorAll(".calculator__button");
const customTipInputField = document.querySelector("#custom-tip");
const paxInputField = document.querySelector("#pax");
const paxErrorMsg = document.querySelector("#pax-error-msg");
const tipAmountLabel = document.querySelector("#tip-amount-value");
const totalBillLabel = document.querySelector("#total-bill-per-person");
const resetButton = document.querySelector("#reset-button");

// Declare functions
calculateAll = () => {
  const baseBill = billInputField.value ? billInputField.value : 0;
  const numberOfPersons = paxInputField.value;
  const baseBillPerPerson = baseBill / numberOfPersons;
  const tipPerPersonInDollar = (tipPercentage / 100) * baseBillPerPerson;
  const totalBillPerPerson = baseBillPerPerson + tipPerPersonInDollar;
  tipAmountLabel.textContent = tipPerPersonInDollar
    ? tipPerPersonInDollar.toFixed(2)
    : (0).toFixed(2);
  totalBillLabel.textContent = totalBillPerPerson
    ? totalBillPerPerson.toFixed(2)
    : (0).toFixed(2);
};

const handleTipButtonClick = (event) => {
  // Reset UI states
  resetAllTipButtons();
  resetCustomTipButton();

  // Process data
  tipPercentage = event.target.dataset.value;
  calculateAll();

  // Change the UI state of the clicked button
  event.target.classList.add("clicked");
};

const resetAllTipButtons = () => {
  tipButtons.forEach((button) => {
    button.classList.remove("clicked");
  });
};

const resetCustomTipButton = () => {
  customTipInputField.value = null;
};

const handleTipInputFieldFocusOut = (event) => {
  tipPercentage = event.target.value;
  calculateAll();
  resetAllTipButtons();
};

const handlePaxInputFocusOut = (event) => {
  const inputElement = event.target;
  const inputElementValue = inputElement.value;
  if (!inputElementValue || inputElementValue === "0") {
    inputElement.classList.add("input--red");
    paxErrorMsg.classList.remove("hidden");
  }
  calculateAll();
};

const handlePaxInputFocusIn = (event) => {
  const inputElement = event.target;
  inputElement.classList.remove("input--red");
  paxErrorMsg.classList.add("hidden");
};

const initializeLabelOutput = () => {
  tipAmountLabel.textContent = (0).toFixed(2);
  totalBillLabel.textContent = (0).toFixed(2);
};

const handleResetButton = (event) => {
  tipPercentage = 0;
  resetAllTipButtons();
  resetCustomTipButton();
  billInputField.value = null;
  paxInputField.value = null;
  initializeLabelOutput();
};

// Add event listeners
billInputField.addEventListener("focusout", calculateAll);
tipButtons.forEach((button) => {
  button.addEventListener("click", handleTipButtonClick);
});
customTipInputField.addEventListener("focusout", handleTipInputFieldFocusOut);
paxInputField.addEventListener("focusin", handlePaxInputFocusIn);
paxInputField.addEventListener("focusout", handlePaxInputFocusOut);
resetButton.addEventListener("click", handleResetButton);

// Initialize label output to zero and format it to 2 decimal places
initializeLabelOutput();
