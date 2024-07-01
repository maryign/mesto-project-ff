function showInputError(dataObject, inputElement, errorMessage) {
    const errorElement = dataObject.formSelector.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(dataObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(dataObject.errorClass);
};

function hideInputError(dataObject, inputElement) {
    const errorElement = dataObject.formSelector.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(dataObject.inputErrorClass);
    errorElement.classList.remove(dataObject.errorClass);
    errorElement.textContent = "";
};

function checkInputValidity(dataObject, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(dataObject, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(dataObject, inputElement);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(dataObject) {
    const inputList = Array.from(dataObject.formSelector.querySelectorAll(dataObject.inputSelector))
    const buttonElement = dataObject.formSelector.querySelector(dataObject.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(dataObject.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(dataObject.inactiveButtonClass);
    }
};

function setEventListeners(dataObject, inputElement) {
    inputElement.addEventListener("input", function () {
        checkInputValidity(dataObject, inputElement);
        toggleButtonState(dataObject);
    });
};

export function enableValidation(dataObject) {
    // expected data format
    // {
    //             formSelector: ".popup__form",//current form
    //             inputSelector: ".popup__input",
    //             submitButtonSelector: ".popup__button",
    //             inactiveButtonClass: "popup__button_disabled",
    //             inputErrorClass: "popup__input_type_error",
    //             errorClass: "popup__error_visible"
    //         }
    dataObject.formSelector.addEventListener("submit", function (evt) {
        evt.preventDefault();
    });
    const fieldsetList = Array.from(dataObject.formSelector.querySelectorAll(dataObject.inputSelector))
    fieldsetList.forEach((currentInput) => {
        hideInputError(dataObject, currentInput);
        setEventListeners(dataObject, currentInput);
    })
};

export function clearValidation(form, validationConfig) {
    const fieldsetList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
    fieldsetList.forEach((currentInput) => {
        hideInputError(validationConfig, currentInput);
    })
    toggleButtonState(validationConfig)
};

export function renderLoading(form) {
    const buttonElement = form.querySelector(".popup__button");
    buttonElement.textContent = "Сохранение...";
}