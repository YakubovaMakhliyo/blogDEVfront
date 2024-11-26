/** @format */

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";

// const app = firebase.initializeApp({
//     apiKey: "AIzaSyBQHEirv5yQZfG0t6B19LIRoHoCFQUZKck",
//     authDomain: "twitter-clone-10d09.firebaseapp.com",
//     projectId: "twitter-clone-10d09",
//     storageBucket: "twitter-clone-10d09.appspot.com",
//     messagingSenderId: "165342497256",
//     appId: "1:165342497256:web:9c1cc549b64ace6b1b7c5d"
// });

// const auth = app.auth();
// export { auth };
// export default app;
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCw-li0IscS2rJr68dSjoJL3KM3eFq5PfE",
  authDomain: "twitter-clone-1faac.firebaseapp.com",
  databaseURL: "https://twitter-clone-1faac.firebaseio.com",
  projectId: "twitter-clone-1faac",
  storageBucket: "twitter-clone-1faac.appspot.com",
  messagingSenderId: "316208638057",
  appId: "1:316208638057:web:75a37bf24fab32ff145af8",
  measurementId: "G-HGFP2LDXP9",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
