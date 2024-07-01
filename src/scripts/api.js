const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-17',
    headers: {
        authorization: 'dd8a8bbf-b90d-44d7-bd78-5616eeff192d',
        'Content-Type': 'application/json'
    }
}

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const updateUserData = (userName, userAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            name: userName,
            about: userAbout
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const addCard = (cardName, cardLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const setLikeForCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: config.headers
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}

export const updateAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .catch((err) => {
            console.log(err);
        });
}