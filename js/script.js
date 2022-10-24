let postsWraper = document.getElementById("posts-wraper");
let overlayBlock = document.getElementById("overlay");
let ovelayText = document.getElementById("overlay-text")
let overlayClose = document.getElementById("closeButton");
let addPostButton = document.getElementById("add-post-button");
let addPostOverlay = document.getElementById("addPostOverlay");
let form = document.getElementById("form");
let input = document.getElementById("AddPostInput");


function ajax(url, callback) {
    let requestPost = new XMLHttpRequest();
    requestPost.open("GET", url);
    requestPost.addEventListener("load", function () {
      let dataResponse = JSON.parse(requestPost.responseText);
      callback(dataResponse);
    });
    requestPost.send();
};

function PostRenderLogic(post) {
    const divWraper = document.createElement("div");
    divWraper.classList.add("post-block");
    divWraper.setAttribute("data-id", post.id);
  
    const h3Post = document.createElement("h3");
    h3Post.innerText = post.id;
  
    const h2Post = document.createElement("h2");
    h2Post.innerText = post.title;
  
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Post";
    deleteButton.classList.add("delete-btn");
    deleteButton.setAttribute("data-id", post.id);
  
    divWraper.appendChild(h3Post);
    divWraper.appendChild(h2Post);
    divWraper.appendChild(deleteButton);
  
    deleteButton.addEventListener("click", function(event) {
      event.stopPropagation();
      const id = event.target.getAttribute("data-id");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      fetch(url, {
        method: "DELETE",
      }).then(() => divWraper.remove());
    });
  
    divWraper.addEventListener("click", function(event) {
      const id = event.target.getAttribute("data-id");
      overlayBlock.classList.add("active");
      let url = `https://jsonplaceholder.typicode.com/posts/${id}`;
      ajax(url, function () {
        let p = document.createElement("p");
        p.innerText = post.body;
        ovelayText.appendChild(p);
      });
    });
  
    postsWraper.appendChild(divWraper);
};


addPostButton.addEventListener("click", function() {
    addPostOverlay.classList.add("active");
    input.value = " ";
})

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let formData = {
        title: event.target[0].value
    }
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify(formData),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((newPost) => {
    PostRenderLogic(newPost);
    addPostOverlay.classList.remove("active");
  })
})

overlayClose.addEventListener("click", function () {
    overlayBlock.classList.remove("active");
    ovelayText.innerHTML = " ";
});



ajax("https://jsonplaceholder.typicode.com/posts", function (dataResponse) {
  dataResponse.forEach((item) => {
    PostRenderLogic(item);
  });
});