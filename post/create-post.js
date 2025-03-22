import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

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
        window.location.href = "view-posts.html"; // Redirect to the view page
    }).catch((error) => {
        alert("Error: " + error);
    });
});
