import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref as dbref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCRUAzGqgSzMvOsymrQ0MoFx_rafL1e-P0",
  authDomain: "hackaton-533c5.firebaseapp.com",
  projectId: "hackaton-533c5",
  storageBucket: "hackaton-533c5.appspot.com",
  messagingSenderId: "883330982046",
  appId: "1:883330982046:web:e945cdd52386cfef30db8f",
  measurementId: "G-MZGT4DNC4K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore();

// const name = document.getElementById("name");
// const fname = document.getElementById("fname");
// const rollNum = document.getElementById("rollNum");
// const contact = document.getElementById("contact");
// const cnic = document.getElementById("cnic");
// //   const pic = document.getElementById("pic")
// const course = document.getElementById("course");
// const classes = document.getElementById("classes");

const classes_div = document.getElementsByClassName("card")[0];
const dbRef = dbref(getDatabase());
get(
  child(
    dbRef,
    `classes/${localStorage.getItem("_id")}/students/${localStorage.getItem(
      "std_id"
    )}`
  )
)
  .then((snapshot) => {
    if (snapshot.exists()) {
    //   let object = Object.values(snapshot.val());
      classes_div.innerHTML = ` <img src=${snapshot.val().url} class="card-img-top" alt="...">
      <div class="card-body">
          <h5 class="card-title">Name: ${snapshot.val().name}</h5>
          <h5 class="card-title">Father Name: ${snapshot.val().fatherName}</h5>
          <h5 class="card-title">Contact: ${snapshot.val().contact}</h5>
          <h5 class="card-title">Roll No: ${snapshot.val().rollNumber}</h5>
          <h5 class="card-title">CNIC: ${snapshot.val().cnic}</h5>
          <h5 class="card-title">Course: ${snapshot.val().course}</h5>
          <h5 class="card-title">Class: ${snapshot.val().class}</h5>
      </div>`;
      console.log(snapshot.val());
    } else {
      console.log("No data available");
      classes_div.innerHTML = "No data available";
    }
  })
  .catch((error) => {
    console.error(error);
  });

// function addStd(id) {
//   localStorage.setItem("std_id", id);
//   window.location = "stddata.html";
// }
// window.addStd = addStd;

const logOut = document.getElementById("logout");
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location = "index.html";
  console.log("User signed out!");
});
