const titleInput = document.getElementById('post-title');
const bodyInput = document.getElementById('post-body');
const form = document.getElementById('new-post');

let postsArray = [];

function renderPosts() {
    let html = '';
    postsArray.forEach(post => {
        html += `
            <div class="post">
                <h3>${post.title}</h3>
                <p>${post.body}</p>
            </div>
        `;
    });
    document.getElementById('blog-list').innerHTML = html;
}

fetch('https://apis.scrimba.com/jsonplaceholder/posts')
    .then(response => response.json())
    .then(data => {
        postsArray = data.slice(0, 5);
        renderPosts();
    });

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const dataObject = {
        title: titleInput.value,
        body: bodyInput.value
    };
    
    const options = {
        method: 'POST', 
        body: JSON.stringify(dataObject), 
        headers: { 
            'Content-Type': 'application/json'
        }
    };
    
    fetch('https://apis.scrimba.com/jsonplaceholder/posts', options)
        .then(response => response.json())
        .then(post => {
            postsArray.unshift(post);
            renderPosts();
            form.reset();
        });
});
