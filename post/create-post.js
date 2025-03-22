import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, remove, update } from "firebase/database";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD1mvuDcQQgh4xsBcBtOKfaZBwZbppBDQk",
  authDomain: "orthodox-mezmur-3c8fc.firebaseapp.com",
  projectId: "orthodox-mezmur-3c8fc",
  storageBucket: "orthodox-mezmur-3c8fc.firebasestorage.app",
  messagingSenderId: "424302277895",
  appId: "1:424302277895:web:abcd726974294c496ec1a2",
  measurementId: "G-CBEV8TEBLT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Display existing posts on the page
const postsContainer = document.getElementById('postsContainer');

function fetchPosts() {
    get(ref(db, 'posts')).then((snapshot) => {
        if (snapshot.exists()) {
            const posts = snapshot.val();
            postsContainer.innerHTML = ''; // Clear the container before displaying
            Object.keys(posts).forEach(postId => {
                const post = posts[postId];
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <img src="${post.image}" alt="Post Image" />
                    <p>${post.content}</p>
                    <button onclick="editPost('${postId}')">Edit</button>
                    <button onclick="deletePost('${postId}')">Delete</button>
                `;
                postsContainer.appendChild(postElement);
            });
        } else {
            postsContainer.innerHTML = '<p>No posts available</p>';
        }
    }).catch((error) => {
        console.error("Error fetching posts:", error);
    });
}

// Create post functionality
document.getElementById("createPostForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const image = document.getElementById("image").value;
    const content = document.getElementById("content").value;

    const postId = new Date().getTime().toString(); // Using timestamp as ID

    set(ref(db, 'posts/' + postId), {
        title: title,
        image: image,
        content: content
    }).then(() => {
        alert("Post created successfully!");
        fetchPosts(); // Re-fetch the posts to display the new one
        document.getElementById("createPostForm").reset(); // Clear the form
    }).catch((error) => {
        alert("Error: " + error);
    });
});

// Edit post functionality
function editPost(postId) {
    get(ref(db, 'posts/' + postId)).then((snapshot) => {
        if (snapshot.exists()) {
            const post = snapshot.val();
            document.getElementById("title").value = post.title;
            document.getElementById("image").value = post.image;
            document.getElementById("content").value = post.content;

            document.getElementById("createPostForm").addEventListener("submit", function(event) {
                event.preventDefault();
                update(ref(db, 'posts/' + postId), {
                    title: document.getElementById("title").value,
                    image: document.getElementById("image").value,
                    content: document.getElementById("content").value
                }).then(() => {
                    alert("Post updated successfully!");
                    fetchPosts(); // Refresh the posts list
                    document.getElementById("createPostForm").reset();
                }).catch((error) => {
                    alert("Error updating post: " + error);
                });
            });
        }
    }).catch((error) => {
        alert("Error retrieving post: " + error);
    });
}

// Delete post functionality
function deletePost(postId) {
    remove(ref(db, 'posts/' + postId)).then(() => {
        alert("Post deleted successfully!");
        fetchPosts(); // Refresh the posts list
    }).catch((error) => {
        alert("Error deleting post: " + error);
    });
}

// Initial fetch of posts
fetchPosts();
