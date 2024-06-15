import {createCard, likeCard, removeCard} from "./card";

const popups = document.querySelectorAll(".popup");

const addPopup = document.querySelector(".popup_type_new-card");
const currentName = document.querySelector(".profile__title");
const currentDescription = document.querySelector(".profile__description");
const editProfileForm = document.forms["edit-profile"];
const nameInput = editProfileForm.elements.name;
const descriptionInput = editProfileForm.elements.description;

const newPlaceForm = document.forms["new-place"];
const placeNameInput = newPlaceForm.elements["place-name"];
const linkInput = newPlaceForm.elements.link;

const cardPopup = document.querySelector(".popup_type_image");

popups.forEach(elem =>
    elem.classList.add("popup_is-animated")
)

export function openModal(modalElement) {
    modalElement.classList.add("popup_is-opened");
    document.addEventListener("keydown", closePopupByEscape);
}

export function closeModal(modalElement) {
    modalElement.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", closePopupByEscape);
}

export function closePopupByOverlayClick(evt) {
    const openedPopup = evt.target.closest(".popup_is-opened");
    const popupContent = evt.target.closest(".popup__content");
    if (openedPopup !== null) {
        const withinBoundaries = evt.composedPath().includes(popupContent);
        if (!withinBoundaries) {
            closeModal(openedPopup)
        }
    }
}

export function setDefaultValues() {
    nameInput.value = currentName.textContent;
    descriptionInput.value = currentDescription.textContent;
}


export function addNewPlace(evt) {
    evt.preventDefault();
    const placesContainer = document.querySelector(".places");
    const placeContainer = placesContainer.querySelector(".places__list");
    placeContainer.prepend(createCard({
        name: placeNameInput.value,
        link: linkInput.value,
    }, removeCard, likeCard));
    closeModal(addPopup);
    placeNameInput.value = ""
    linkInput.value = ""
}

export function openCardImage(event) {
    openModal(cardPopup);
    cardPopup.querySelector(".popup__image").src = event.target.src
    cardPopup.querySelector(".popup__caption").textContent = event.target.alt
}

function closePopupByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModal(openedPopup)
    }
}