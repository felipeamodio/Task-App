import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyBinL7ui-gMaa1Q2tUMZ8Zzrta9KL7IFfw",
  authDomain: "tarefas-fa301.firebaseapp.com",
  projectId: "tarefas-fa301",
  storageBucket: "tarefas-fa301.appspot.com",
  messagingSenderId: "1034199439490",
  appId: "1:1034199439490:web:3c2cebbcb65c4163c7bc9b"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase;