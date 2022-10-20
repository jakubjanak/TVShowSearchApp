const form = document.querySelector("#searchForm");
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector("#close");
const modalH1 = document.querySelector("#modalH1");
const modalDes = document.querySelector("#modalDes");
const modalImage = document.querySelector("#modalImage");
const modalGenre = document.querySelector("#modalGenre");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resetSearch();
    mainAPI();
})

const mainAPI = async () => {
    const inputRes = form.elements.query.value;
    const config = {params: {q: inputRes}};
    const response = await axios.get("https://api.tvmaze.com/search/shows", config);
    console.log(response.data);
    form.elements.query.value = "";

    for (i = 0; i < response.data.length; i++) {
        if (response.data[i].show.image) {
            if (response.data[i].show.premiered === null) {
                const imgResult = response.data[i].show.image.medium;
                const headerResult = response.data[i].show.name;
                const descriptionResult = response.data[i].show.summary;
                const imgOriginal = response.data[i].show.image.original;
                const genre = response.data[i].show.genres;
                const div = document.createElement("div");
                const img = document.createElement("img");
                const h3 = document.createElement("h3");
                const infoBtn = document.createElement("button");
                const premiere = document.createElement("p");
                img.src = imgResult;
                h3.innerText = headerResult;
                premiere.innerText = "Premiered: Unknown";
                infoBtn.innerText = "More";
                div.append(img);
                div.append(h3);
                div.append(premiere);
                div.append(infoBtn);
                div.classList.add("divContainer");
                infoBtn.classList.add("infoBtn");
                container.append(div);

                infoBtn.addEventListener("click", () => {
                    modal.style.display = "block";
                    modalH1.innerText = headerResult;
                    modalImage.src = imgOriginal;
                    modalGenre.innerText = genre;
                    if (descriptionResult !== null) {
                        modalDes.innerHTML = descriptionResult;
                    } else {
                        modalDes.innerText = "The description was not found!";
                    }
                })
            } else {
                const imgResult = response.data[i].show.image.medium;
                const headerResult = response.data[i].show.name;
                const premiereResult = response.data[i].show.premiered;
                const descriptionResult = response.data[i].show.summary;
                const imgOriginal = response.data[i].show.image.original;
                const genre = response.data[i].show.genres;
                const div = document.createElement("div");
                const img = document.createElement("img");
                const h3 = document.createElement("h3");
                const infoBtn = document.createElement("button");
                const premiere = document.createElement("p");
                img.src = imgResult;
                h3.innerText = headerResult;
                premiere.innerText = `Premiered: ${premiereResult}`;
                infoBtn.innerText = "More";
                div.append(img);
                div.append(h3);
                div.append(premiere);
                div.append(infoBtn);
                div.classList.add("divContainer");
                infoBtn.classList.add("infoBtn");
                container.append(div);

                infoBtn.addEventListener("click", () => {
                    modal.style.display = "block";
                    modalH1.innerText = headerResult;
                    modalImage.src = imgOriginal;
                    modalGenre.innerText = genre;
                    if (descriptionResult !== null) {
                        modalDes.innerHTML = descriptionResult;
                    } else {
                        modalDes.innerText = "The description was not found!";
                    }
                })
            }
            
        }
    }
}

closeBtn.addEventListener("click", () => modal.style.display = "none");

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

const resetSearch = () => {
    while (container.hasChildNodes()) {
        container.removeChild(container.firstChild);
    }
}