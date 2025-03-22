import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, child } from "firebase/database";

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

const postsContainer = document.getElementById('postsContainer');

get(child(ref(db), 'posts')).then((snapshot) => {
    if (snapshot.exists()) {
        const posts = snapshot.val();
        Object.keys(posts).forEach(postId => {
            const post = posts[postId];
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            postElement.innerHTML = `
                <h2>${post.title}</h2>
                <img src="${post.image}" alt="Post Image" />
                <p>${post.content}</p>
            `;
            postsContainer.appendChild(postElement);
        });
    } else {
        postsContainer.innerHTML = '<p>No posts available</p>';
    }
}).catch((error) => {
    console.error("Error fetching posts:", error);
});
