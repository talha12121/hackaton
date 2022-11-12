

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCRUAzGqgSzMvOsymrQ0MoFx_rafL1e-P0",
    authDomain: "hackaton-533c5.firebaseapp.com",
    projectId: "hackaton-533c5",
    storageBucket: "hackaton-533c5.appspot.com",
    messagingSenderId: "883330982046",
    appId: "1:883330982046:web:e945cdd52386cfef30db8f",
    measurementId: "G-MZGT4DNC4K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);


  const btn = document.getElementById("submit");
btn.addEventListener("click", submit);
   const login =()=>{
    const login_email = document.getElementById("login-email");
    const login_pass = document.getElementById("login-pass");
    const auth = getAuth();
    signInWithEmailAndPassword(auth, login_email.value, login_pass.value)
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("user", user);
    window.location="new.html"
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error");
    console.log(errorMessage)
  });
   }
   const loginBtn = document.getElementById("login");
   loginBtn.addEventListener("click", login);