const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
export function createCard(cardData, removeCardFunc, likeCardFunc, openImageFunc) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const removeButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    removeButton.addEventListener("click", removeCardFunc);
    likeButton.addEventListener("click", likeCardFunc);
    cardImage.addEventListener("click", openImageFunc);
    return cardElement
}

// @todo: Функция удаления карточки
export function removeCard(event) {
    const listItem = event.target.closest(".card");
    listItem.remove();
}

// @todo: Функция лайка карточки
export function likeCard(event) {
    event.target.classList.add("card__like-button_is-active");
}
