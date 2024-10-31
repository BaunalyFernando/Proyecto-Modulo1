class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
        this.currentId = 1;
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity({ title, description, imgUrl }) {
        // Pasar los valores directamente al constructor
        const newActivity = new Activity(
            this.currentId,
            title, description,
            imgUrl);

        this.activities.push(newActivity);
        this.currentId += 1;
    }

    deleteActivity(id) {
        const filteredActivities = this.activities.filter((act) => act.id !== id)

        this.activities = filteredActivities;
    }
}

const createCard = (activity) => {
    const { id, title, description, imgUrl } = activity;

    const card = document.createElement("div");
    card.classList.add("cardContainer");

    const titleElement = document.createElement("h3");
    titleElement.innerHTML = title;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = description;

    const imgUrlElement = document.createElement("img");
    imgUrlElement.src = imgUrl;
    imgUrlElement.classList.add("logo-Activities");

    const br = document.createElement("br");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Eliminar";
    deleteButton.classList.add("button-Activities");

    deleteButton.addEventListener("click", () => {
        repository.deleteActivity(id);
        buildCards();
    });


    [titleElement, descriptionElement, imgUrlElement, br, deleteButton].forEach((elementos) => {
        card.appendChild(elementos);
    });

    return card;
};

const repository = new Repository;

const buildCards = () => {
    const cardContainer = document.getElementById("activities-container");
    cardContainer.innerHTML = "";
    const allActivities = repository.getAllActivities();
    const htmlAllActivities = allActivities.map(createCard);

    htmlAllActivities.forEach((elementos) => {
        cardContainer.appendChild(elementos);
    });
};

const handler = (event) => {
    event.preventDefault();

    const inputTitle = document.getElementById("title");
    const inputDescription = document.getElementById("description");
    const inputImgUrl = document.getElementById("imgUrl");


    if (inputTitle.value === "" || inputDescription.value === "" || inputImgUrl.value === "") {
        return alert("Campos incompletos");
    }

    repository.createActivity({
        title: inputTitle.value,
        description: inputDescription.value,
        imgUrl: inputImgUrl.value
    });

    buildCards();

    inputTitle.value = '';
    inputDescription.value = '';
    inputImgUrl.value = '';
}

// Creamos la nueva actividad
const createButton = document.getElementById("submit");

createButton.addEventListener("click", handler);