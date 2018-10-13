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
var database = firebase.database();
var user;


// HTML VARS
// ==========================


// FUNCTIONS
// ==========================
var createNewUser = function(form){
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
  .then(function(){
    database.ref('users').push({
      user: user.uid,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  })
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ': ' + errorMessage);
  });
};

var updateUser = function(user){

};

var deleteUser = function(user){

};


// RUN THE TRAPPPPP
// ==========================



$(document).ready(function() {

  // firebase.auth().onAuthStateChanged(function(user) {
  //   window.user = user;

  //   console.log(user);
  //   // Step 1:
  //   //  If no user, sign in anonymously with firebase.auth().signInAnonymously()
  //   //  If there is a user, log out out user details for debugging purposes.
  // });

  user = firebase.auth().currentUser;
  // user = firebase.auth().currentUser;
  // if(user != null){
  //   $('.createUser').hide();
  // }

  $('.createUser').on('submit',function(e){
    e.preventDefault();
    createNewUser(this);
  });
});