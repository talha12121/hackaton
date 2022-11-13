import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

// import {
//   getDoc,
//   doc,
//   getDocs,
//   getFirestore,
//   collection,
//   query,
//   addDoc,
//   orderBy,
//   onSnapshot,
//   where,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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
// const analytics = getAnalytics(app);
const auth = getAuth();
// const db = getFirestore();
const database = getDatabase();

const classes_div = document.getElementsByClassName("classes_div")[0];
const dbRef = ref(getDatabase());
get(child(dbRef, `classes`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let object = Object.values(snapshot.val());
      let data = object
        .map((val) => {
          return `<div onClick={addStd(${val._id})}>${val.courseName} <br> <span>${val.teacherName}</span> </div>`;
        })
        .join("");
      classes_div.innerHTML = data;
      console.log(object);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });

function addStd(id) {
  localStorage.setItem("_id", id);
  window.location = "data.html"
}window.addStd = addStd

function writeUserData(e) {
  const timing = document.getElementById("timing");
  const schedule = document.getElementById("schedule");
  const teacherName = document.getElementById("teacherName");
  const sectionName = document.getElementById("sectionName");
  const courseName = document.getElementById("courseName");
  const batch = document.getElementById("batch");
  let obj = {
    timimg: timing.value,
    schedule: schedule.value,
    teacherName: teacherName.value,
    sectionName: sectionName.value,
    courseName: courseName.value,
    batch: batch.value,
  };
  // const id = Math.floor(Math.random() * 892347893335234);
  const id = new Date().getTime();
  const db = getDatabase();
  set(ref(db, "classes/" + id), {
    ...obj,
    _id: id,
  });
}
let addClass = document.getElementById("next");
addClass.addEventListener("click", writeUserData);
// let next = document.getElementById("next");
// next.addEventListener("click", async function () {
//   const docRef = await addDoc(collection(db, "Classes"), {
//     Timimg: timing.value,
//     schedule: schedule.value,
//     teacherName: teacherName.value,
//     sectionName: sectionName.value,
//     courseName: courseName.value,
//     batch: batch.value,
//   });
//   // window.location = "data.html"

//   console.log("Document written with ID: ", docRef.id);
//   if (docRef.id) {
//     if (
//       timing.value == "" ||
//       schedule.value == "" ||
//       teacherName.value == "" ||
//       courseName.value == "" ||
//       sectionName.value == "" ||
//       batch.value == ""
//     ) {
//       swal("ALL FIELDS REQUIRED");
//     } else {
//       window.location = "data.html";
//     }
//   }
// });

const logOut = document.getElementById("logout");
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location.replace("index.html")
  console.log("User signed out!");
});
