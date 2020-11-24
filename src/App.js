import React, { useState, useEffect, Fragment } from 'react';
import app, {auth} from "./firebase"
import firebase from "firebase"

function App() {

  const [loggedIn, setLoggedIn] = useState(false)

  const onSubmit = async (e) => {
    console.log("onSubmit")
    e.preventDefault()

    var provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');

    try {
      var result = await app.auth().signInWithRedirect(provider)

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      console.log(token)
      // The signed-in user info.
      var user = result.user;
      // ...
      setLoggedIn(true)
    } catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    }
  }

  useEffect(() => {
    console.log("Component load")
    auth.onAuthStateChanged((user) => {
      setLoggedIn(user)
    });
  }, [])

  return (
    <div>
      {!!loggedIn ? (   
        <Fragment>
          {loggedIn.displayName}
          <button type="button" onClick={() => auth.signOut()}> Log out </button>
        </Fragment> 
      ) :       <button type="button" onClick={onSubmit}>
        Log in 
      </button> }

    </div>
  );
}

export default App;
