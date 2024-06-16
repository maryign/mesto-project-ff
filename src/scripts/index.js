import "../pages/index.css";
import {initialCards} from "./cards";
import {
    closeModal,
    closePopupByOverlayClick,
    openModal
} from "./components/modal";
import {createCard, likeCard, removeCard} from "./components/card";

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

initialCards.forEach(function (elem) {
    placeContainer.append(createCard(elem, removeCard, likeCard, openCardImage));
})

buttonEditProfile.addEventListener("click", function (evt) {
    openModal(popupEditProfile);
    setDefaultValuesFormProfile();
});

buttonAddNewCard.addEventListener("click", function (evt) {
    openModal(popupAddNewCard);
});

formEditProfile.addEventListener("submit", updateProfile);
formNewPlace.addEventListener("submit", addNewPlace);

popups.forEach(elem => {
        elem.classList.add("popup_is-animated");
        elem.addEventListener("click", closePopupByOverlayClick);
    }
)

closePopupButtons.forEach(elem =>
    elem.addEventListener("click", function (evt) {
        const openedPopup = evt.target.closest(".popup_is-opened");
        closeModal(openedPopup)
    })
)

function updateProfile(evt){
    evt.preventDefault();
    currentProfileName.textContent = inputProfileName.value;
    currentProfileDescription.textContent = inputProfileDescription.value;
    closeModal(popupEditProfile);
}

function setDefaultValuesFormProfile() {
    inputProfileName.value = currentProfileName.textContent;
    inputProfileDescription.value = currentProfileDescription.textContent;
}

function addNewPlace(evt) {
    evt.preventDefault();
    placeContainer.prepend(createCard({
        name: inputPlaceName.value,
        link: inputLink.value,
    }, removeCard, likeCard, openCardImage));
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