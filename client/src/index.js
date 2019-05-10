import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
// import "font-awesome/css/font-awesome.min.css";
// import "bootstrap/dist/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
// import Home from "./Pages/Home";
import ImageUpload from "./components/ImageUpload";
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBwQaN6FFx5yjUBtTnB-DVmkcBHWgjPA88",
    authDomain: "puplife-9a9c7.firebaseapp.com",
    databaseURL: "https://puplife-9a9c7.firebaseio.com",
    projectId: "puplife-9a9c7",
    storageBucket: "puplife-9a9c7.appspot.com",
    messagingSenderId: "278913242521"
  };
  firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
