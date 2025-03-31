// Mock database for posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];

function displayPosts() {
    const blogPostsSection = document.getElementById("blog-posts");
    blogPostsSection.innerHTML = ''; // Clear existing posts

    posts.forEach((post, index) => {
        const postElement = document.createElement("div");
        postElement.classList.add("post");

        const title = document.createElement("h3");
        title.textContent = post.title;

        const content = document.createElement("p");
        content.textContent = post.content;

        const img = document.createElement("img");
        img.src = post.image;
        img.alt = post.title;

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editPost(index);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deletePost(index);

        postElement.appendChild(title);
        postElement.appendChild(content);
        postElement.appendChild(img);
        postElement.appendChild(editButton);
        postElement.appendChild(deleteButton);

        blogPostsSection.appendChild(postElement);
    });
}

function editPost(index) {
    const post = posts[index];
    document.getElementById("title").value = post.title;
    document.getElementById("content").value = post.content;
    document.getElementById("post-form").setAttribute("data-edit-index", index);
    document.getElementById("image").value = "";  // Clear file input
}

function deletePost(index) {
    posts.splice(index, 1);
    localStorage.setItem("posts", JSON.stringify(posts));
    displayPosts();
}

// Admin form submission
document.getElementById("post-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageFile = document.getElementById("image").files[0];
    const imageUrl = imageFile ? URL.createObjectURL(imageFile) : "";

    const postData = { title, content, image: imageUrl };

    // Check if it's editing an existing post
    const editIndex = document.getElementById("post-form").getAttribute("data-edit-index");
    if (editIndex !== null) {
        posts[editIndex] = postData;
        document.getElementById("post-form").removeAttribute("data-edit-index"); // Reset the form
    } else {
        posts.push(postData);
    }

    // Save posts to localStorage
    localStorage.setItem("posts", JSON.stringify(posts));

    // Clear the form
    document.getElementById("post-form").reset();
    alert(editIndex !== null ? "Post updated successfully!" : "Post added successfully!");
    displayPosts();
});

// Load posts on blog page
if (document.getElementById("blog-posts")) {
    displayPosts();
}

// Load existing posts in admin page
if (document.getElementById("posts-list")) {
    displayPosts();
}
