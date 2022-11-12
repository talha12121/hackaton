import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
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
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import {
  getDatabase,
  ref as dbref,
  set,
  child,
  get,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

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
const analytics = getAnalytics(app);
const auth = getAuth();
// const db = getFirestore();

const name = document.getElementById("name");
const fname = document.getElementById("fname");
const rollNum = document.getElementById("rollNum");
const contact = document.getElementById("contact");
const cnic = document.getElementById("cnic");
//   const pic = document.getElementById("pic")
const course = document.getElementById("course");
const classes = document.getElementById("classes");

const classes_div = document.getElementsByClassName("classes_div")[0];
const dbRef = dbref(getDatabase());
get(child(dbRef, `classes/${localStorage.getItem("_id")}/students`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      let object = Object.values(snapshot.val());
      let data = object
        .map((val) => {
          return `<div onClick={addStd(${val._id})}>${val.rollNumber} <br> <span>${val.name}</span> </div>`;
        })
        .join("");
      classes_div.innerHTML = data;
      console.log(object);
    } else {
      console.log("No data available");
      classes_div.innerHTML = "No data available";
    }
  })
  .catch((error) => {
    console.error(error);
  });

function addStd(id) {
  localStorage.setItem("std_id", id);
  window.location = "stddata.html";
}
window.addStd = addStd;

let next = document.getElementById("again_next");
next.addEventListener("click", async function () {
  const uploadFiles = (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage();
      let uid = auth.currentUser.uid;

      const storageRef = ref(storage, `users/${uid}.png`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");

              break;
          }
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };
  let myFile = document.getElementById("pic");
  let file = myFile.files[0];

  let url = await uploadFiles(file);
  console.log(url);
  // const user = userCredential.user;

  // const docRef = await addDoc(collection(db, "studentDetails"), {
  //   Name: name.value,
  //   FatherName: fname.value,
  //   RollNumber: rollNum.value,
  //   contact: contact.value,
  //   course: course.value,
  //   class: classes.value,
  //   cnic: cnic.value,
  //   url: url,
  //   class_id : localStorage.setItem("_id")
  // });
  let obj = {
    name: name.value,
    fatherName: fname.value,
    rollNumber: rollNum.value,
    contact: contact.value,
    course: course.value,
    class: classes.value,
    cnic: cnic.value,
    url: url,
  };
  const db = getDatabase();
  const id = new Date().getTime();

  set(dbref(db, `classes/${localStorage.getItem("_id")}/students/` + id), {
    ...obj,
    _id: id,
  });
});
// .catch((error) => {
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   console.log(errorMessage);
// });

const logOut = document.getElementById("logout");
logOut.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut();
  window.location = "index.html";
  console.log("User signed out!");
});
