// FIREBASE
// ==========================
var config = {
  apiKey: "AIzaSyDN33XuMZh2HgwOFk7_-tagJ0-ggUPD9Zw",
  authDomain: "beatscape-48240.firebaseapp.com",
  databaseURL: "https://beatscape-48240.firebaseio.com",
  projectId: "beatscape-48240",
  storageBucket: "",
  messagingSenderId: "912101144942"
};
firebase.initializeApp(config);

// VARS
// ==========================


// HTML VARS
// ==========================


// FUNCTIONS
// ==========================
var createNewUser = function(form){
  var user;
  var firstName = form.createUserFirstName.value;
  var email = form.createUserEmail.value;
  var password = form.createUserPassword.value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function () {
    user = firebase.auth().currentUser;
    // user.sendEmailVerification();
    // console.log('Validation link was sent to ' + email + '.');
  })
  .then(function () {
    user.updateProfile({
      displayName: firstName
    });
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ': ' + errorMessage);
  });
}




// RUN THE TRAPPPPP
// ==========================
$(document).ready(function() {
  $('.createUser').on('submit',function(e){
    e.preventDefault();
    createNewUser(this);
  });
});