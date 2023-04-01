import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import secrets from './secrets';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, child, set, update, get } from "firebase/database";

const root = ReactDOM.createRoot(document.getElementById('root'));

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCEJl8XEa93Bjop7CZ-p26yGO-Hm3EfSsY",
  databaseURL: "https://mrj-react-test-default-rtdb.firebaseio.com/",
};

const firebaseApp = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(firebaseApp);

// const email = prompt("Email");
// const password = prompt("Password");

const auth = getAuth();
// TODO - set up login view
// If not signed in, render login view

function startLogin(loginError) {
  console.log(auth.currentUser);
  renderLogin(submitLogin, loginError);
  // submitLogin(secrets.email, secrets.password);
}

// Function that gets called when user submits login form
function submitLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(
      (userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user.email);
        // usertag = user.email.split("@")[0];

        var userRef = ref(database, 'users/' + user.uid);
        onValue(userRef, function(snapshot) {
          console.log(snapshot.val());
          let userData = snapshot.val();
          
          var saveUserData = ((data) => {
            set(ref(database, 'users/' + user.uid), data);
          });
          
          // If signed in and user data changes, render app view
          renderApp(userData, saveUserData);
        }, function (errorObject) {
          console.log("Failed to read data: " + errorObject.code);
        });
      }
    )
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "\n", errorMessage);
      startLogin(errorCode);
    });
}

function renderApp(userData, saveCallback) {
  root.render(
    <React.StrictMode>
      <App userData={userData} saveUserData={saveCallback} />
    </React.StrictMode>
  );
}

function renderLogin(submitLogin, loginError) {
  root.render(
    <React.StrictMode>
      <Login submitLogin={submitLogin} loginError={loginError} />
    </React.StrictMode>
  );
}

startLogin(false);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();