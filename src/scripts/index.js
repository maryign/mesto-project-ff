import "../pages/index.css";
import {createCard, removeCard, setLike} from "./components/card";
import {closeModal, closePopupByOverlayClick, openModal} from "./components/modal";
import {clearValidation, enableValidation, renderLoading} from "./validation";
import {setProfileData} from "./components/profile";
import {addCard, getInitialCards, getUserData, updateAvatar, updateUserData} from "./api";

const popups = document.querySelectorAll(".popup");
const currentProfileName = document.querySelector(".profile__title");
const currentProfileDescription = document.querySelector(".profile__description");
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const inputProfileName = formEditProfile.elements.name;
const inputProfileDescription = formEditProfile.elements.description;

const popupAddNewCard = document.querySelector(".popup_type_new-card");
const buttonAddNewCard = document.querySelector(".profile__add-button");
const formNewPlace = document.forms["new-place"];
const inputPlaceName = formNewPlace.elements["place-name"];
const inputLink = formNewPlace.elements.link;
const popupCardImage = document.querySelector(".popup_type_image");

const placesContainer = document.querySelector(".places");
const placeContainer = placesContainer.querySelector(".places__list");
const closePopupButtons = document.querySelectorAll(".popup__close");

Promise.all([getUserData(), getInitialCards()])
    .then((results) => {
        setProfileData(results[0]);
        results[1].forEach(function (elem) {
            const newCard = createCard(elem,removeCard, setLike, openCardImage);
            if (results[0]._id != elem.owner._id) {
                const removeButton = newCard.querySelector(".card__delete-button");
                removeButton.remove()
            }
            placeContainer.append(newCard);
        })
    });

buttonEditProfile.addEventListener("click", function (evt) {
    openModal(popupEditProfile);
    setDefaultValuesFormProfile();
});

buttonAddNewCard.addEventListener("click", function (evt) {
    openModal(popupAddNewCard);
    setDefaultValuesAddNewCard();
});

formEditProfile.addEventListener("submit", updateProfile);
formNewPlace.addEventListener("submit", addNewPlace);

popups.forEach(elem => {
        elem.classList.add("popup_is-animated");
        elem.addEventListener("click", closePopupByOverlayClick);
        if (elem.querySelector(".popup__form") !== null) {
            enableValidation({
                formSelector: elem.querySelector(".popup__form"),
                inputSelector: ".popup__input",
                submitButtonSelector: ".popup__button",
                inactiveButtonClass: "popup__button_disabled",
                inputErrorClass: "popup__input_type_error",
                errorClass: "popup__error_visible"
            });
        }
    }
)

closePopupButtons.forEach(elem =>
    elem.addEventListener("click", function (evt) {
        const openedPopup = evt.target.closest(".popup_is-opened");
        closeModal(openedPopup)
    })
)

async function updateProfile(evt) {
    evt.preventDefault();
    renderLoading(popupEditProfile);
    await updateUserData(inputProfileName.value, inputProfileDescription.value)
    currentProfileName.textContent = inputProfileName.value;
    currentProfileDescription.textContent = inputProfileDescription.value;
    closeModal(popupEditProfile);
}

function setDefaultValuesFormProfile() {
    inputProfileName.value = currentProfileName.textContent;
    inputProfileDescription.value = currentProfileDescription.textContent;
    const validationConfig = {
        formSelector: formEditProfile,
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
    }
    clearValidation(formEditProfile, validationConfig);
}

function setDefaultValuesAddNewCard() {
    inputPlaceName.value = "";
    inputLink.value = "";
    const validationConfig = {
        formSelector: formNewPlace,
        inputSelector: ".popup__input",
        submitButtonSelector: ".popup__button",
        inactiveButtonClass: "popup__button_disabled",
        inputErrorClass: "popup__input_type_error",
        errorClass: "popup__error_visible"
    }
    clearValidation(formNewPlace, validationConfig);
}

async function addNewPlace(evt) {
    evt.preventDefault();
    renderLoading(popupAddNewCard);
    await addCard(inputPlaceName.value, inputLink.value);
    placeContainer.prepend(createCard({
        name: inputPlaceName.value,
        link: inputLink.value,
    }, removeCard, setLike, openCardImage));
    closeModal(popupAddNewCard);
    inputPlaceName.value = "";
    inputLink.value = "";
}

function openCardImage(event) {
    openModal(popupCardImage);
    popupCardImage.querySelector(".popup__image").src = event.target.src;
    popupCardImage.querySelector(".popup__image").alt = event.target.alt;
    popupCardImage.querySelector(".popup__caption").textContent = event.target.alt;
}