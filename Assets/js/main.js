(function cardValidation() {
  const form = document.querySelector(".form");
  const formContainer = document.querySelector(".form-container");
  const confirmedPage = document.querySelector(".confirmed");
  const continueBtn = document.querySelector(".continue-btn");

  const nameInput = document.querySelector(".name-input");
  const cardNumInput = document.querySelector(".card-number-input");
  const monthInput = document.querySelector(".exp-date-input-month");
  const yearInput = document.querySelector(".exp-date-input-year");
  const cvcInput = document.querySelector(".CVC-input");

  let validInputs = {
    name: false,
    card: false,
    month: false,
    year: false,
    cvc: false,
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validateInputs();
    if (
      validInputs.name &&
      validInputs.card &&
      validInputs.month &&
      validInputs.year &&
      validInputs.cvc
    ) {
      confirmed();
    }
  });

  form.addEventListener("input", cardsDisplay);

  continueBtn.addEventListener("click", (e) => {
    e.preventDefault();
    confirmedPage.classList.remove("show");
    formContainer.classList.remove("hide");
    const invalidateInputs = {
      name: false,
      card: false,
      month: false,
      year: false,
      cvc: false,
    };
    validInputs = invalidateInputs;
  });

  function cardsDisplay() {
    const nameDisplay = document.querySelector(".name");
    const numberDisplay = document.querySelector(".card-number");
    const dateDisplay = document.querySelector(".exp-date");
    const cvcDisplay = document.querySelector(".CVC");

    spacedCard = (n) => {
      const paddedString = n.padEnd(16, "0");
      const b1 = paddedString.slice(0, 4);
      const b2 = paddedString.slice(4, 8);
      const b3 = paddedString.slice(8, 12);
      const b4 = paddedString.slice(12, 16);
      return `${b1} ${b2} ${b3} ${b4}`;
    };

    nameDisplay.innerText = nameInput.value || "Jane Appleseed";
    dateDisplay.innerText = `${monthInput.value || "00"}/${
      yearInput.value || "00"
    }`;
    cvcDisplay.innerText = cvcInput.value || "000";
    numberDisplay.innerText = spacedCard(cardNumInput.value);
  }

  function validateInputs() {
    const nameValue = nameInput.value.trim();
    const numberValue = cardNumInput.value.trim();
    const monthValue = monthInput.value.trim();
    const yearValue = yearInput.value.trim();
    const cvcValue = cvcInput.value.trim();

    const nameError = document.querySelector(".name-error-msg");
    const numError = document.querySelector(".number-error-msg");
    const dateError = document.querySelector(".date-error-msg");
    const cvcError = document.querySelector(".cvc-error-msg");

    const errorText = {
      blank: "Can't be blank",
      expired: "Expiration date invalid",
      cvc: "CVC invalid",
      numbers: "Wrong format, numbers only",
      field: "Field invalid",
    };

    //name
    if (nameValue === "") {
      errorMessage(nameInput, nameError, errorText.blank);
    } else {
      setSuccess(nameInput, nameError);
      validInputs.name = true;
    }

    //card number
    if (numberValue === "") {
      errorMessage(cardNumInput, numError, errorText.blank);
    } else if (Number.isNaN(Number(numberValue))) {
      errorMessage(cardNumInput, numError, errorText.numbers);
    } else if (numberValue.length !== 16) {
      errorMessage(cardNumInput, numError, errorText.field);
    } else {
      setSuccess(cardNumInput, numError);
      validInputs.card = true;
    }

    //month
    if (monthValue === "") {
      errorMessage(monthInput, dateError, errorText.blank);
    } else if (Number.isNaN(Number(monthValue))) {
      errorMessage(monthInput, dateError, errorText.numbers);
    } else if (monthValue.length != 2) {
      errorMessage(monthInput, dateError, errorText.expired);
    } else {
      setSuccess(monthInput, dateError);
      validInputs.month = true;
    }

    //year
    if (yearValue === "") {
      errorMessage(yearInput, dateError, errorText.blank);
    } else if (Number.isNaN(Number(yearValue))) {
      errorMessage(yearInput, dateError, errorText.numbers);
    } else if (yearValue.length != 2) {
      errorMessage(yearInput, dateError, errorText.expired);
    } else {
      setSuccess(yearInput, dateError);
      validInputs.year = true;
    }

    //today's date validation
    const expDate = Date.parse(`20${yearValue}-${monthValue}-01`);
    const today = new Date().getTime();
    if (expDate <= today) {
      errorMessage(yearInput, dateError, errorText.expired);
    }

    //cvc
    if (cvcValue === "") {
      errorMessage(cvcInput, cvcError, errorText.blank);
    } else if (Number.isNaN(Number(cvcValue))) {
      errorMessage(cvcInput, cvcError, errorText.cvc);
    } else if (cvcValue.length != 3) {
      errorMessage(cvcInput, cvcError, errorText.cvc);
    } else {
      setSuccess(cvcInput, cvcError);
      validInputs.cvc = true;
    }
  }

  function errorMessage(input, p, message) {
    input.classList.add("error");
    p.classList.add("error");
    p.innerText = message;
  }
  function setSuccess(input, p) {
    input.classList.remove("error");
    p.classList.remove("error");
  }
  function confirmed() {
    confirmedPage.classList.add("show");
    formContainer.classList.add("hide");
  }
})();
