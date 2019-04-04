window.addEventListener("DOMContentLoaded", ()=>{
    
    let starElements = Array.from(document.querySelectorAll(".posts .fa-star")),
        favoritePostHolder = document.querySelector("div[class='favoritePosts']"),
        postHolder = document.querySelector(".postHolder");
   
    initialize();
        
    function initialize(){
        if (isLocalStorageEnabled()){
            addClickListenerToStarElems(starElements);
            displayUI();
            displayFavorites();
        }
    }

    function addClickListenerToStarElems(elems){
        elems.forEach((elem)=>{
            elem.addEventListener("click", (event)=>{togglePostOption(event.target)})
        })
    }

    function displayUI(){
        let postsHolder = document.querySelector(".posts");
        let favorites = getStoredItems('favorites')? JSON.parse(getStoredItems('favorites')):[] ;
        if(favorites){
          favorites.map((post)=>{
            let starIcon = postsHolder.querySelector(`#${post.id} .fa-star`);
            starIcon.classList.remove("far");
            starIcon.classList.add("fas");
          })
        }
    }

    function addToFavoritePosts(post){
        let postObj = createPostObject(post);

        let starIcon = post.querySelector(".fa-star");
        let clonedPostHolder = postHolder.cloneNode(true);
        
        starIcon.classList = "fas fa-star";
          
        clonedPostHolder.id = postObj.id;
        clonedPostHolder.querySelector(".title").textContent = postObj.name;
        clonedPostHolder.querySelector(".description").textContent = postObj.description;
        clonedPostHolder.querySelector(".fa-star").remove();
        clonedPostHolder.classList.remove("hide");
        favoritePostHolder.appendChild(clonedPostHolder);

        addToStorage("favorites", postObj);
    }

    let removeFromFavoritePosts = (post)=>{
        let starIcon = post.querySelector(".fa-star");
        starIcon.classList = "far fa-star";
        
        favoritePostHolder.querySelector(`#${post.id}`).remove();
        
        removeFromStorage("favorites", post);
    }

    function displayFavorites(){
        if(getStoredItems("favorites")){
            JSON.parse(getStoredItems("favorites")).map((post)=>{
                let postHolder = document.querySelector(".postHolder").cloneNode(true);
                postHolder.id = `${post.id}`;
                postHolder.querySelector(".title").textContent = post.name;
                postHolder.querySelector(".description").textContent = post.description;
                postHolder.classList.remove("postHolder",  "hide");
                favoritePostHolder.appendChild(postHolder);
            })
        }
    }

    // HELPER FUNCTIONS
    function addToStorage (key, post){
        if(getStoredItems(key)){
            let favorites = JSON.parse(getStoredItems(key))
            favorites.push(post);
            storeItem("favorites", JSON.stringify(favorites));
            return;
        }
        storeItem("favorites", `[${JSON.stringify(post)}]`);
        
    }

    function removeFromStorage(storageName, post){
        let {id} = createPostObject(post),
            storedFavorites = JSON.parse(getStoredItems(storageName)),
            favoritePosts = storedFavorites.filter((postElem)=>{return postElem.id == id ? false : true});

        storeItem(storageName, JSON.stringify(favoritePosts));
    }
    
    function isLocalStorageEnabled(){ return window.localStorage ? true : false}

    function getStoredItems(storageName){ 
        return localStorage.getItem(storageName)
    }

    function storeItem (storageName, val){ localStorage.setItem(storageName, val) }

    function createPostObject(post){
        return {
          "id": `${post.id}`,
          "name": post.querySelector('.title').textContent,
          "description": post.querySelector(".description").textContent
        }
    }

    function togglePostOption(elem){
        if(elem.classList.contains("far")){
            addToFavoritePosts(elem.parentElement);
            return;
        }
        removeFromFavoritePosts(elem.parentElement);
    }
});