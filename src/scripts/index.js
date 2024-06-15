import "../pages/index.css";
import {initialCards} from "./cards";
import {
    addNewPlace,
    closeModal,
    closePopupByOverlayClick,
    openCardImage,
    openModal,
    setDefaultValues
} from "./components/modal";
import {createCard, likeCard, removeCard} from "./components/card";

// @todo: DOM узлы
const placesContainer = document.querySelector(".places");
const placeContainer = placesContainer.querySelector(".places__list");
const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");

const addPopup = document.querySelector(".popup_type_new-card");
const addButton = document.querySelector(".profile__add-button");
const closePopupButton = document.querySelectorAll(".popup__close");

const newPlaceForm = document.forms["new-place"];

// @todo: Вывести карточки на страницу
initialCards.forEach(function (elem) {
    placeContainer.append(createCard(elem, removeCard, likeCard, openCardImage));
})

editButton.addEventListener("click", function (evt) {
    openModal(editPopup);
    setDefaultValues();
});

addButton.addEventListener("click", function (evt) {
    openModal(addPopup);
    newPlaceForm.addEventListener("submit", addNewPlace);
});

document.addEventListener("click", closePopupByOverlayClick);

closePopupButton.forEach(elem =>
    elem.addEventListener("click", function (evt) {
        const openedPopup = evt.target.closest(".popup_is-opened");
        closeModal(openedPopup)
    })
)
