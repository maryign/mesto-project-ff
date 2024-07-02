function showInputError(dataObject, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.add(dataObject.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(dataObject.errorClass);
};

function hideInputError(dataObject, formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
    inputElement.classList.remove(dataObject.inputErrorClass);
    errorElement.classList.remove(dataObject.errorClass);
    errorElement.textContent = "";
};

function checkInputValidity(dataObject, formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        showInputError(dataObject, formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(dataObject, formElement, inputElement);
    }
};

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(dataObject, formElement) {
    const inputList = Array.from(formElement.querySelectorAll(dataObject.inputSelector))
    const buttonElement = formElement.querySelector(dataObject.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(dataObject.inactiveButtonClass);
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.classList.remove(dataObject.inactiveButtonClass);
        buttonElement.removeAttribute('disabled');
    }
};

function setEventListeners(dataObject, formElement, inputElement) {
    inputElement.addEventListener("input", function () {
        checkInputValidity(dataObject, formElement, inputElement);
        toggleButtonState(dataObject, formElement);
    });
};

export function enableValidation(dataObject) {
    // expected data format
    // {
    //             formSelector: ".popup__form",
    //             inputSelector: ".popup__input",
    //             submitButtonSelector: ".popup__button",
    //             inactiveButtonClass: "popup__button_disabled",
    //             inputErrorClass: "popup__input_type_error",
    //             errorClass: "popup__error_visible"
    //         }
    const formsList = Array.from(document.querySelectorAll(dataObject.formSelector));//.querySelectorAll(dataObject.inputSelector))
    formsList.forEach(elem => {
        elem.addEventListener("submit", function (evt) {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(elem.querySelectorAll(dataObject.inputSelector))
        fieldsetList.forEach((currentInput) => {
            hideInputError(dataObject, elem, currentInput);
            setEventListeners(dataObject, elem, currentInput);
        })
    })
};

export function clearValidation(form, validationConfig) {
    const inputsList = Array.from(form.querySelectorAll(validationConfig.inputSelector))
    inputsList.forEach((currentInput) => {
        hideInputError(validationConfig, form, currentInput);
    })
    toggleButtonState(validationConfig, form)
};

export function renderLoading(form) {
    const buttonElement = form.querySelector(".popup__button");
    buttonElement.textContent = "Сохранение...";
}