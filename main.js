
//____________________________________________________________________________________________________________________________________________________________________________

// Declaring arrays, interaction elements, and assigning event listeners to them.

let moviesListToWatch = [];
let moviesListToWatched = [];
let targetForDD = null;
const inputEl = document.querySelector("#movieInput");
const moviesListToWatchEl = document.querySelector("#pendingList");
const moviesListToWatchedEl = document.querySelector("#watchedList"); 
const buttonAddMovie = document.querySelector("#addButton");
const btnDeleteMovie = document.querySelector(".delete-btn");

let movieName = "";

inputEl.addEventListener("input", onInputMovie);
buttonAddMovie.addEventListener("click", onAddMovie);
moviesListToWatchEl.addEventListener("click", onhandleclick);
moviesListToWatchedEl.addEventListener("click", onhandleclick);


moviesListToWatchEl.addEventListener("drop", drop);
moviesListToWatchedEl.addEventListener("drop", drop);
moviesListToWatchEl.addEventListener("dragover", (e) => e.preventDefault());
moviesListToWatchedEl.addEventListener("dragover", (e) => e.preventDefault());

//____________________________________________________________________________________________________________________________________________________________________________

//____________________________________________________________________________________________________________________________________________________________________________

// Drag and Drop Functions.


function drop(event) {
    event.preventDefault();
  if (targetForDD) {
    const movieId = targetForDD.dataset.id
    
    if (this.id=== "pendingList") {
      moveMovieTo(movieId, moviesListToWatch, moviesListToWatched);
    }
     else if (this.id === "watchedList") {
       moveMovieTo(movieId, moviesListToWatched, moviesListToWatch);
     }
  }
  renderAll();
}

  function moveMovieTo(movieId, targetArray, sourceArray) {
    const index = sourceArray.findIndex((movie) => movie.id === movieId);

    const movie = sourceArray.splice(index, 1)[0];
    movie.watched = targetArray === moviesListToWatched;
    targetArray.push(movie);
  }

function addDragAndDrop() {
  const targets = document.querySelectorAll(".movie-item");

  for (const target of targets) {
    target.addEventListener("dragstart", dragStart);
    target.addEventListener("dragend", dragEnd);

    function dragStart() {
      targetForDD = this;
      this.classList.add("dragging");
      console.log(targetForDD);
    }
    function dragEnd() {
      this.classList.remove("dragging");
            targetForDD = null;
    }
  }
}

//____________________________________________________________________________________________________________________________________________________________________________

//____________________________________________________________________________________________________________________________________________________________________________

//   The renderAll function updates lists and counter states.


loadFromLocalStorage(); 
renderAll();
function renderAll() {
  renderList(moviesListToWatched, moviesListToWatchedEl, true),
  renderList(moviesListToWatch, moviesListToWatchEl, false);

  renderOfAllCounters();
  addDragAndDrop();
    saveToLocalStorage();

}

// Render all counters in one function.
function renderOfAllCounters() {
  document.querySelector("#totalCount").textContent =
    moviesListToWatch.length + moviesListToWatched.length;
  document.querySelector("#pendingCount").textContent =
    moviesListToWatch.length;
  document.querySelector("#watchedCount").textContent =
    moviesListToWatched.length;
  document.querySelector("#pendingCounter").textContent =
    moviesListToWatch.length;
  document.querySelector("#watchedCounter").textContent =
    moviesListToWatched.length;
}

// Render a single list item and container.innerHTML to the document.
function renderList(movies, container, isWatched) {
  const markup = movies.map(
    (movie) =>
      `<li class ="movie-item " data-id="${movie.id}" draggable="true">
      <span class = 'movie-title ${isWatched ? "watched" : ""}' > ${
        movie.name
      } </span>
      <div class="movie-actions">
                 <button class="action-btn watch-btn" data-action ="${
                   isWatched ? "unwatch" : "watch"
                 }" >
                     ${isWatched ? "↩️" : "👁️"}
                 </button>
                 <button class="action-btn delete-btn" data-action ='delete'>
                     🗑️
                 </button>
             </div>
      </li>`
  );
  container.innerHTML = markup.join("");
  
}

//____________________________________________________________________________________________________________________________________________________________________________


// Function for placing movies in LocalStorage.

function saveToLocalStorage() {
  const data = {
    watch: moviesListToWatch,
    watched: moviesListToWatched,
  };

  localStorage.setItem("movies", JSON.stringify(data));
}

function loadFromLocalStorage() {

  const data = localStorage.getItem("movies");

  if (!data) return;

  const parsed = JSON.parse(data);

  moviesListToWatch = parsed.watch;
  moviesListToWatched = parsed.watched;
}


//____________________________________________________________________________________________________________________________________________________________________________

// This function, List Delegation, detects which button within the element was clicked and then performs certain actions.
function onhandleclick(event) {
  const btn = event.target;

  const movieItem = btn.closest(".movie-item");
  const movieId = movieItem.dataset.id;
  const action = btn.dataset.action;

  if (action === "delete") {
    deleteMovie(movieId);
  } else if (action === "watch") {
    replaceMovieToWatched(movieId);
  } else if (action === "unwatch") {
    replaceBackMovieToWatch(movieId);
  }
}

function deleteMovie(movieId) {
  moviesListToWatch = moviesListToWatch.filter((movie) => movie.id !== movieId);
  moviesListToWatched = moviesListToWatched.filter(
    (movie) => movie.id !== movieId
  );
  renderAll();
}

function replaceMovieToWatched(movieId) {
  const index = moviesListToWatch.findIndex((movie) => movie.id === movieId);

  if (index !== -1) {
    const movie = moviesListToWatch.splice(index, 1)[0];
    movie.watched = true;
    moviesListToWatched.push(movie);
    renderAll();
  }
}

function replaceBackMovieToWatch(movieId) {
  const index = moviesListToWatched.findIndex((movie) => movie.id === movieId);

  if (index !== -1) {
    const movie = moviesListToWatched.splice(index, 1)[0];
    movie.watched = false;
    moviesListToWatch.push(movie);
    renderAll();
  }
}

//____________________________________________________________________________________________________________________________________________________________________________

//____________________________________________________________________________________________________________________________________________________________________________

// Writes to a variable named  movie which is entered into Input.
function onInputMovie(event) {
  movieName = event.currentTarget.value;
}

// Checks for duplicate names. If the name entered in Input is duplicated, it is not added to the list for viewing.
function isDuplicateMovie(movieName) {
  const moviesLists = [...moviesListToWatch, ...moviesListToWatched];
  return moviesLists.some(
    (movie) => movie.name.toUpperCase() === movieName.toUpperCase()
  );
}

// Adds a movie.

function onAddMovie() {
  if (movieName !== "") {
    if (isDuplicateMovie(movieName)) {
      inputEl.value = "";
      return;
    }

    const movie = {
      name: movieName,
      id: Date.now().toString(15) + Math.random().toString(15),
      watched: false,
    };

    moviesListToWatch.push(movie);
    inputEl.value = "";
    movieName = "";
    renderAll();
  }
}
//____________________________________________________________________________________________________________________________________________________________________________
