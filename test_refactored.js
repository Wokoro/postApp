window.addEventListener("DOMContentLoaded", ()=>{
    let starElements = Array.from(document.querySelectorAll(".posts .fa-star"));
    let favoritePostHolder = document.querySelector("div[class='favoritePosts']");
    let postHolder = document.querySelector(".postHolder");
    
    addListenerToStarElems(starElements);
    
    let updateUI = ()=>{
        let postsHolder = document.querySelector(".posts");
        let favorites = getStoredItems('favorite');
        if(favorites){
          favorites.map((post)=>{
            let starIcon = postsHolder.querySelector(`#${post.id} .fa-star`);
            starIcon.classList.remove("far");
            starIcon.classList.add("fas");
          })
        }
    }

    let addToFavoritePosts = (post)=>{
        let postObj = createPostObject(post);
        console.log(postObj)

        let starIcon = post.querySelector(".fa-star");
        let clonedPostHolder = postHolder.cloneNode(true);
        
        starIcon.classList = "fas fa-star";
        addToStorage("favorites", post);
    
        clonedPostHolder.id = postObj.id;
        clonedPostHolder.querySelector(".title").textContent = postObj.name;
        clonedPostHolder.querySelector(".description").textContent = postObj.description;
        clonedPostHolder.classList.remove("hide");
        favoritePostHolder.appendChild(clonedPostHolder);
    }

    let removeFromFavoritePosts = (post)=>{
        let starIcon = post.querySelector(".fa-star");
        starIcon.classList = "far fa-star";
       // removeFromStorage("favorites", post);
        favoritePostHolder.querySelector(`#${post.id}`).remove();
    }

    let displayFavorites = ()=>{
        if(getStoredItems("favorites")){
            getStoredItems("favorites").map((post)=>{
                let postHolder = document.querySelector(".postHolder").cloneNode(true),
                    postTitle = postHolder.querySelector(".title"),
                    postDescription = postHolder.querySelector(".description");
                
                postHolder.id = `post${post.id}`;
                postTitle = post.name;
                postDescription = post.description;
                postHolder.classList.remove("postHolder");
                favoritePostHolder.appendChild(postHolder);
            })
        }
    }

    // HELPER FUNCTIONS
    function addToStorage (key, post){
        if(getStoredItems(key)){
            alert(getStoredItems(key))
            let favorites = JSON.parse(getStoredItems(key))
            favorites.push(createPostObject(post));
            storeItem("favorites", favorites);
            return;
        }
        storeItem("favorites", post);
    }

    function removeFromStorage(storageName, post){
        let [postId = id] = createPostObject(post);
        let storedFavorites = JSON.parse(getStoredItems(storageName))
        let favoritePosts = storedFavorites.filter((postElem)=>{postElem.id == postId ? true : false});
        storeItem(storageName, favoritePosts);
    }
    
    function isLocalStorageEnabled(){ return window.localStorage ? true : false}

    function getStoredItems(storageName){ 
        alert(localStorage.getItem(storageName))
    }

    function storeItem (storageName, val){ localStorage.setItem(storageName, JSON.stringify(val)) }

    function createPostObject(post){
        return {
          "id": `${post.id}`,
          "name": post.querySelector('.title').textContent,
          "description": post.querySelector(".description").textContent
        }
    }

    function addListenerToStarElems(elems){
        elems.forEach((elem)=>{
            elem.addEventListener("click", (event)=>{togglePostOption(event.target)})
        })
    }

    function togglePostOption(elem){
        if(elem.classList.contains("far")){
            addToFavoritePosts(elem.parentElement);
            return;
        }
        removeFromFavoritePosts(elem.parentElement);
    }
});