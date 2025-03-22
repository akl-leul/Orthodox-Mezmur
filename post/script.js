// Mock database for posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function displayPosts() {
    const blogPostsSection = document.getElementById("blog-posts");
    blogPostsSection.innerHTML = ''; // Clear existing posts

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const title = document.createElement("h3");
        title.textContent = post.title;

        const content = document.createElement("p");
        content.textContent = post.content;

        postElement.appendChild(title);
        postElement.appendChild(content);

        blogPostsSection.appendChild(postElement);
    });
}

// Admin form submission
document.getElementById("post-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const newPost = { title, content };
    posts.push(newPost);

    // Save posts to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Clear the form
    document.getElementById("post-form").reset();

    alert("Post added successfully!");
});

// Load posts on blog page
if (document.getElementById("blog-posts")) {
    displayPosts();
}
