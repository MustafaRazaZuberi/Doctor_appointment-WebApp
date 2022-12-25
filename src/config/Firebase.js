import swal from "sweetalert";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot, where, query, getDoc, getDocs
} from "https://www.gstatic.com/firebasejs/9.11.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-storage.js"




import { initializeApp } from "https://www.gstatic.com/firebasejs/9.11.0/firebase-app.js";
// const firebaseConfig = {
//   apiKey: "AIzaSyD5s29H3rac3p3fua9JnzEAwYfbbINqCE4",
//   authDomain: "q-app-3e758.firebaseapp.com",
//   projectId: "q-app-3e758",
//   storageBucket: "q-app-3e758.appspot.com",
//   messagingSenderId: "457375202481",
//   appId: "1:457375202481:web:65027debc5d8dfc65fb690",
//   measurementId: "G-HB45G16P70"
// };
const firebaseConfig = {
  apiKey: "AIzaSyDuIUVGMNiFOjpgWH5cxnLs5HEfyAtZH20",
  authDomain: "q-application-34f49.firebaseapp.com",
  projectId: "q-application-34f49",
  storageBucket: "q-application-34f49.appspot.com",
  messagingSenderId: "579066790725",
  appId: "1:579066790725:web:e9d978358f52241077b42c",
  measurementId: "G-R2TV66EE04"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

const signInGoogle = async () => {
  try {
    var provider = new GoogleAuthProvider();
    const result = await auth;
    await signInWithPopup(auth, provider);
    await addUserToDB();
    await swal("Congratulations!", "Loggined successfully!", "success");
    localStorage.setItem("auth", JSON.stringify(auth))
  } catch (e) {
    console.log(e.message);
  }
};
// console.log(auth);

// adding users to database
const addUserToDB = async () => {
  const uid = auth.currentUser.uid;
  var userProfile = { email: "", name: "", photoURL: "" };
  userProfile.email = auth.currentUser.email;
  userProfile.name = auth.currentUser.displayName;
  userProfile.photoURL = auth.currentUser.photoURL;

  return setDoc(doc(db, "AllUsers", uid), userProfile);
};


// Auth Keep loggined
function keeploggined() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("User is loggined");
    } else {
      console.log("User is signed out");
    }
  });
}
keeploggined()



// const addCompanyToDB = (companyName,since,companyImg,companyAddress,startTime,endTime)=>{
//   const companyData = { userId,companyName,since,companyImg,companyAddress,startTime,endTime}
//   console.log(companyData)
//   const userId = auth.currentUser.uid
//   return addDoc(collection(db, "companies"), companyData)
// }



export default signInGoogle;


export {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  getFirestore,
  doc,
  setDoc,
  swal,
  auth,
  db,
  FacebookAuthProvider,
  addUserToDB,
  addDoc,
  collection,
  getStorage, ref, uploadBytes, getDownloadURL,
  storage,
  onSnapshot, where, query, getDoc, getDocs,

};

