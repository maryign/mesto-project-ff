// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const placesContainer = document.querySelector('.places');
const placeContainer = placesContainer.querySelector('.places__list');

function removeCard(event) {
    const listItem = event.target.closest('.card');
    listItem.remove();
}

function createCard(cardData, removeCardFunc) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const removeButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = cardData.name;
    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    removeButton.addEventListener('click', removeCardFunc);
    return cardElement
}

initialCards.forEach(function (elem) {
    placeContainer.append(createCard(elem, removeCard));
})
// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
