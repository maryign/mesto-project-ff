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
    errorElement.textContent = '';
};

function checkInputValidity(dataObject, inputElement) {
    if (inputElement.validity.patternMismatch) {
        // встроенный метод setCustomValidity принимает на вход строку
        // и заменяет ею стандартное сообщение об ошибке
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        // если передать пустую строку, то будут доступны
        // стандартные браузерные сообщения
        inputElement.setCustomValidity("");
    }
    if (!inputElement.validity.valid) {
        // теперь, если ошибка вызвана регулярным выражением,
        // переменная validationMessage хранит наше кастомное сообщение
        showInputError(dataObject, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(dataObject, inputElement);
    }
};

// Функция принимает массив полей

function hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputElement) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся функция
        // hasInvalidInput вернёт true
        return !inputElement.validity.valid;
    })
};

function toggleButtonState(dataObject) {
    // Если есть хотя бы один невалидный инпут
    const inputList = Array.from(dataObject.formSelector.querySelectorAll(dataObject.inputSelector))
    const buttonElement = dataObject.formSelector.querySelector(dataObject.submitButtonSelector);
    if (hasInvalidInput(inputList)) {
        // сделай кнопку неактивной
        buttonElement.classList.add(dataObject.inactiveButtonClass);
    } else {
        // иначе сделай кнопку активной
        buttonElement.classList.remove(dataObject.inactiveButtonClass);
    }
};

function setEventListeners(dataObject, inputElement) {
    inputElement.addEventListener('input', function () {
        checkInputValidity(dataObject, inputElement);
        toggleButtonState(dataObject);
    });
};

export function enableValidation(dataObject) {
    // {
    //             formSelector: '.popup__form',//current form
    //             inputSelector: '.popup__input',
    //             submitButtonSelector: '.popup__button',
    //             inactiveButtonClass: 'popup__button_disabled',
    //             inputErrorClass: 'popup__input_type_error',
    //             errorClass: 'popup__error_visible'
    //         }
    dataObject.formSelector.addEventListener('submit', function (evt) {
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