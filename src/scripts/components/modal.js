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

function closePopupByEscape(evt) {
    if (evt.key === "Escape") {
        const openedPopup = document.querySelector(".popup_is-opened");
        closeModal(openedPopup);
    }
}