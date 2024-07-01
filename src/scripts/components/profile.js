import {updateAvatar} from "../api";
import {closeModal, openModal} from "./modal";
import {renderLoading} from "../validation";

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profilePhoto = document.querySelector(".profile__image");
const buttonEditProfilePhoto = document.querySelector(".profile__image_edit-button");
const popupEditProfilePhoto = document.querySelector(".popup_type_edit-photo");
const formUpdatePhoto = document.forms["update-photo"];
const linkField = formUpdatePhoto.link;

export function setProfileData(userData) {
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profilePhoto.setAttribute(`style`, `background-image: url(${userData.avatar})`);
    editProfilePhoto();
}

function editProfilePhoto() {
    buttonEditProfilePhoto.addEventListener("click", (event) => {
        openModal(popupEditProfilePhoto);
    });
    formUpdatePhoto.addEventListener("submit", function (evt) {
        renderLoading(popupEditProfilePhoto);
        updateAvatar(linkField.value).then(res => {
            closeModal(popupEditProfilePhoto)
        })
    });
}