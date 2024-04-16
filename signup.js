// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB9Zx3O98WAU-3q6ccjscpdRz15Q4z5sOk",
  authDomain: "resume-f84b7.firebaseapp.com",
  projectId: "resume-f84b7",
  storageBucket: "resume-f84b7.appspot.com",
  messagingSenderId: "488010523839",
  appId: "1:488010523839:web:5c19d005b0aa2bf1fc520a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// submit button

const submit = document.getElementById('submit');
submit.addEventListener("click",function(event){
  event.preventDefault()
  const auth = getAuth();

  //inputs
  const fname = document.getElementById('user1').value;
  const lname = document.getElementById('user2').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;

    alert("Creating Account....")
    window.location.href ="createresume.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;

    alert("Error")
    // ..
  });
})