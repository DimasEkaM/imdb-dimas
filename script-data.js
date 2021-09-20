const API_KEY = "k_xveqq5hh";
const BASE_URL = "https://imdb-api.com/en/API";
const API_URL = BASE_URL + "/Top250Movies/" + API_KEY;
const searchURL = BASE_URL + "/SearchMovie/" + API_KEY;
const DetailURL = BASE_URL + "/Title/" + API_KEY;
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.items);
      showMovies2(data.items);
      console.log(data);
    });
}

function showMovies(data) {
  /* main.innerHTML = ""; */

  var hasil = data.slice(0, 10);

  hasil.forEach((movie) => {
    const { id, title, image, imDbRating, crew, rank } = movie;
    var movieEl = "";
    if (rank == 1) {
      movieEl = document.createElement("div");
      movieEl.classList.add("carousel-item");
      movieEl.classList.add("active");
      movieEl.innerHTML = `
      <div class="col-md-4">
      <div class="card" style="width: 18rem; " onclick="detailPage('${id}')">
      <img src="${image}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <p class="card-text">${title}</p>
        </div>
      </div>  
      </div>
      `;
    } else {
      movieEl = document.createElement("div");
      movieEl.classList.add("carousel-item");
      movieEl.innerHTML = `
      <div class="col-md-4">
      <div class="card" style="width: 18rem; " onclick="detailPage('${id}')">
      <img src="${image}" class="card-img-top" alt="${title}">
        <div class="card-body">
          <p class="card-text">${title}</p>
        </div>
      </div>  
      </div>
      `;
    }

    main.appendChild(movieEl);
  });
  slick();
}

function showMovies2(data) {
  /* main.innerHTML = ""; */

  var hasil2 = data.slice(10, 20);

  hasil2.forEach((movie2) => {
    const { id, title, image, imDbRating, crew, rank } = movie2;
    const movieEl2 = document.createElement("div");
    movieEl2.classList.add("movie2");

    if (rank % 2 == 0) {
      movieEl2.innerHTML = `
      <div class="card flex-row flex-wrap" onclick="detailPage('${id}')">
        <div class="card-header border-0">
          <h4 class="card-title">${title}</h4>
          <p class="card-text">${crew}</p>
          
        </div>
        <div class="card-block px-2" style="margin-left: auto;">
          <img src="${image}" alt="${title}">
        </div>
      </div> <br>
      `;
    } else {
      movieEl2.innerHTML = `
      <div class="card flex-row flex-wrap" onclick="detailPage('${id}')">
        <div class="card-header border-0">
            <img src="${image}" alt="${title}">
        </div>
        <div class="card-block px-2">
            <h4 class="card-title">${title}</h4>
            <p class="card-text">${crew}</p>
        </div>
      </div> <br>
      `;
    }

    movieVertical.appendChild(movieEl2);
  });
}

function getSearch(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showSearch(data.results);
    });
}

function showSearch(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, image, id, description } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
    <img
    src="${image}"
    alt="${title}"
    />
    <div class="movie-info">
    <h3>${title}</h3>
    <span class="${getColor(id)}">${id}</span>
    </div>

    <div class="overview">
    <h3>Description</h3>
        ${(description, id)}
    </div>  
  `;
    main.appendChild(movieEl);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;

  if (searchTerm) {
    getSearch(searchURL + "/" + searchTerm);
  } else {
    getMovies(API_URL);
  }
});

function detailPage(id) {
  getDetail(DetailURL + "/" + id);
}

function getDetail(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showDetail(data);
    });
}

function showDetail(data) {
  konten.innerHTML = "";

  const movieEl = document.createElement("div");
  movieEl.classList.add("container");
  movieEl.innerHTML = `
  <br>
  <div class="card">
  <div class="row no-gutters">
    <div class="col-auto">
        <img src="${data.image}" class="img-fluid" alt="${
    data.title
  }" style="height:300px"/>
    </div>
    <div class="col">
        <div class="card-block px-2">
            <h4 class="card-title">${data.title} </h4>
            
            <p class="card-text">Year   : ${data.year}</p>
            <p class="card-text">Rating : <span class="${getColor(
              data.imDbRating
            )}">(${data.imDbRating})</span></p>
            <p class="card-text">Stars  : ${data.stars}</p>
            <p class="card-text">${data.plot}</p>
        </div>
    </div>
  </div> 
  </div> 
  `;
  konten.appendChild(movieEl);
}

function slick() {
  $("#recipeCarousel").carousel({
    interval: 10000,
  });
  $(".carousel .carousel-item").each(function () {
    var minPerSlide = 3;
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(":first");
    }
    next.children(":first-child").clone().appendTo($(this));

    for (var i = 0; i < minPerSlide; i++) {
      next = next.next();
      if (!next.length) {
        next = $(this).siblings(":first");
      }

      next.children(":first-child").clone().appendTo($(this));
    }
  });
}
