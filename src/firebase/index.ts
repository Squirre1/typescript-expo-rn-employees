import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6I__kfYShdqYo__JNqung0FSABlV0y1U",
  authDomain: "test-b7670.firebaseapp.com",
  databaseURL: "https://test-b7670.firebaseio.com",
  projectId: "test-b7670",
  storageBucket: "test-b7670.appspot.com",
  messagingSenderId: "164080606914"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const database = firebase.database();
