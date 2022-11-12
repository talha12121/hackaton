import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
  import {
    getAuth,
   
  } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
  import { 
    getDoc,
     doc,
     getDocs,
     getFirestore,
     collection,
     query,
     addDoc,
     orderBy,
     onSnapshot,
     where
    }  from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
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
  const auth = getAuth();
  const db = getFirestore();

  const name = document.getElementById("name")
  const fname = document.getElementById("fname")
  const rollNum = document.getElementById("rollNum")
  const contact = document.getElementById("contact")
  const cnic = document.getElementById("cnic")
  const pic = document.getElementById("pic")
  const course = document.getElementById("course")
  const classes = document.getElementById("classes")



  
  let next=document.getElementById("again_next")
next.addEventListener("click",async function(){
const docRef = await addDoc(collection(db, "Student Detail"), {
Name: name.value,
  FatherName: fname.value,
  RollNumber:rollNum.value,
  contact:contact.value,
  course:course.value,
  class:classes.value,

  

});
// window.location = "data.html"

console.log("Document written with ID: ", docRef.id);
// if(timing=="" && schedule =="" && teacherName =="" && courseName == ""&&sectionName=="" && batch==""){
//     Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'ALL FIELD REQUIRED!',
       
//       })
// }else{
// window.location = "data.html"
// }
}
)



  const logOut = document.getElementById("logout"); 
  logOut.addEventListener('click', e => {
    e.preventDefault();
     auth.signOut();
     window.location="index.html"
    console.log('User signed out!');
})
