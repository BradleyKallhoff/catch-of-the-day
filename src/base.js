import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDnFqb8B2WxZCtqXqJBF42EaNeUUPUdDRs",
    authDomain: "catch-of-the-day-kall.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-kall.firebaseio.com",
    projectId: "catch-of-the-day-kall",
    storageBucket: "catch-of-the-day-kall.appspot.com",
    messagingSenderId: "32487541851",
    appId: "1:32487541851:web:09711e0e22545bfeed837e",
    measurementId: "G-JKDHV3XL4R"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;