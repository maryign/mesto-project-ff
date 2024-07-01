import {deleteCard, dislikeCard, setLikeForCard} from "../api";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(cardData, removeFunc, likeFunction, openImageFunc) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const removeButton = cardElement.querySelector(".card__delete-button");
    const likeButton = cardElement.querySelector(".card__like-button");
    const likeCount = cardElement.querySelector(".card__like-number");
    const cardTitle = cardElement.querySelector(".card__title");
    const cardImage = cardElement.querySelector(".card__image");
    cardTitle.textContent = cardData.name;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    likeCount.textContent = cardData.likes?.length || 0;
    removeButton.addEventListener("click",function (evt) {
        removeFunc(evt, cardData._id)
    });
    likeButton.addEventListener("click", function (evt) {
        likeFunction(evt, cardData._id)
    });
    cardImage.addEventListener("click", openImageFunc);
    return cardElement
}

export function removeCard(evt, id) {
    deleteCard(id).then(function (res) {
        const listItem = evt.target.closest(".card");
        listItem.remove();
    })
}

export function setLike(evt, id) {
    const likeCount = evt.target.nextElementSibling;
    evt.target.classList.contains("card__like-button_is-active") ?
        dislikeCard(id).then(res => {
            likeCount.textContent = res.likes.length;
        }) :
        setLikeForCard(id).then(res => {
            likeCount.textContent = res.likes.length;
        })
    evt.target.classList.toggle("card__like-button_is-active");
}