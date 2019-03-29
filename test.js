// Check favorites on page load
function checkFavorites() {
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  var posts = document.getElementsByClassName('post');
  if(favorites == null ) {
    // Set an empty array ready so you can push new objects to it
    var favorites = [];
    localStorage.setItem("favorites", JSON.stringify(favorites));
    // For each post add an empty star
    for(var i = 0; i < posts.length; i++) {
      var noFavoriteStar = createNoFavoriteStar();
      posts[i].appendChild(noFavoriteStar);
    }
  } else {
    // Set an array that holds the id's from the favorited posts
    var favoritesArray = [];
    for(var i = 0; i < favorites.length; i++) {
      favoritesArray.push(favorites[i].id);
    }
    // For each post set an empty or full array depending on if it's favorited or not
    for(var i = 0; i < posts.length; i++) {
      if(favoritesArray.includes(posts[i].id)) {
        var favoriteStar = createFavoriteStar();
        posts[i].appendChild(favoriteStar);
      } else {
        var noFavoriteStar = createNoFavoriteStar();
        posts[i].appendChild(noFavoriteStar);
      }
    }
  }
}

// Create a full star element
function createFavoriteStar() {
  var favoriteStar = document.createElement('i');
  favoriteStar.classList.add('fas', 'fa-star');
  favoriteStar.setAttribute('onclick', 'removeFavorite(this)');
  return favoriteStar;
}

// create a empty star element
function createNoFavoriteStar() {
  var noFavoriteStar = document.createElement('i');
  noFavoriteStar.classList.add('far', 'fa-star');
  noFavoriteStar.setAttribute('onclick', 'addFavorite(this)');
  return noFavoriteStar;
}

// Add post to favorites
function addFavorite(e) {
  var post = e.parentNode;
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  postFavorite = {
    "id": post.id,
    "name": post.children[0].innerText,
    "description": post.children[1].innerText
  };
  favorites.push(postFavorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  post.removeChild(e);
  var favoriteStar = createFavoriteStar();
  post.appendChild(favoriteStar);
}

// Remove post from favorites
function removeFavorite(e) {
  var post = e.parentNode;
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  var favorites = favorites.filter(function(item) {
    return item.id !== post.id
  })
  localStorage.setItem("favorites", JSON.stringify(favorites));
  post.removeChild(e);
  var noFavoriteStar = createNoFavoriteStar();
  post.appendChild(noFavoriteStar);
}

// List all favorite posts
function listFavorites() {
  var favorites = JSON.parse(localStorage.getItem('favorites'));
  if(favorites.length > 0) {
    for(var i = 0; i < favorites.length; i++) {
      var favoritePost = document.createElement('div');
      var postName = document.createElement('h1');
      postName.innerHTML = favorites[i].name;
      favoritePost.appendChild(postName);
      var postDescription = document.createElement('p');
      postDescription.innerHTML = favorites[i].description;
      favoritePost.appendChild(postDescription);
      document.getElementById('js--favorites__list').appendChild(favoritePost);
    }
  } else {
    var noFavorites = document.createElement('p');
    noFavorites.innerHTML = "You don't have any favorites yet."
    document.getElementById('js--favorites__list').appendChild(noFavorites);
  }
}
