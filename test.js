window.addEventListener("DOMContentLoaded", ()=>{
  
  // Check favorites on page load
function checkFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  let posts = document.getElementsByClassName('post');
  if(favorites == null ) {
    // Set an empty array ready so you can push new objects to it
    let favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // For each post add an empty star
    for(let i = 0; i < posts.length; i++) {
      let noFavoriteStar = createNoFavoriteStar(); 2. // clone element instead of creating a new element
      posts[i].appendChild(noFavoriteStar);
    }
  } else { 3. //remove else statement
    // Set an array that holds the id's from the favorited posts
    let favoritesArray = [];
    for(let i = 0; i < favorites.length; i++) {
      favoritesArray.push(favorites[i].id);
    }
    // For each post set an empty or full array depending on if it's favorited or not
    for(let i = 0; i < posts.length; i++) {
      if(favoritesArray.includes(posts[i].id)) {
        let favoriteStar = createFavoriteStar();
        posts[i].appendChild(favoriteStar);
      } else {
        let noFavoriteStar = createNoFavoriteStar();
        posts[i].appendChild(noFavoriteStar);
      }
    }
  }
}

// Create a full star element
function createFavoriteStar() {
  let favoriteStar = document.createElement('i');
  favoriteStar.classList.add('fas', 'fa-star');
  favoriteStar.setAttribute('onclick', 'removeFavorite(this)');
  return favoriteStar;
}

// create a empty star element
function createNoFavoriteStar() {
  let noFavoriteStar = document.createElement('i');
  noFavoriteStar.classList.add('far', 'fa-star');
  noFavoriteStar.setAttribute('onclick', 'addFavorite(this)');
  return noFavoriteStar;
}
// Add post to favorites
function addFavorite(e) {
  let post = e.parentNode;
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  postFavorite = {
    "id": post.id,
    "name": post.children[0].innerText,
    "description": post.children[1].innerText
  };
  favorites.push(postFavorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  post.removeChild(e);
  let favoriteStar = createFavoriteStar();
  post.appendChild(favoriteStar);
}

// Remove post from favorites
function removeFavorite(e) {
  let post = e.parentNode;
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  let favorites = favorites.filter(function(item) {
    return item.id !== post.id
  })
  localStorage.setItem("favorites", JSON.stringify(favorites));
  post.removeChild(e);
  let noFavoriteStar = createNoFavoriteStar();
  post.appendChild(noFavoriteStar);
}

// List all favorite posts
function listFavorites() {
  let favorites = JSON.parse(localStorage.getItem('favorites'));
  if(favorites.length > 0) {
    for(let i = 0; i < favorites.length; i++) {
      let favoritePost = document.createElement('div');
      let postName = document.createElement('h1');
      postName.innerHTML = favorites[i].name;
      favoritePost.appendChild(postName);
      let postDescription = document.createElement('p');
      postDescription.innerHTML = favorites[i].description;
      favoritePost.appendChild(postDescription);
      document.getElementById('js--favorites__list').appendChild(favoritePost);
    }
  } else {
    let noFavorites = document.createElement('p');
    noFavorites.innerHTML = "You don't have any favorites yet."
    document.getElementById('js--favorites__list').appendChild(noFavorites);
  }
}
});