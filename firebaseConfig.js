// firebaseConfig.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/functions';

// Your Firebase config object
const firebaseConfig = {
    apiKey: 'AIzaSyCsv3CsVJL4ri6Gz6I3UiCfxatoYVWoxbw',
    authDomain: 'thesis-ad543.firebaseapp.com',
    projectId: 'thesis-ad543',
    storageBucket: 'thesis-ad543appspot.com',
    messagingSenderId: '1836074086378738059',
    appId: '1:885904173811:android:ef336df3417631e854a586',
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export const auth = firebase.auth();
  export default firebase;