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
var user = '';


// HTML VARS
// ==========================
var createUser = $('.createUser');
var signInUser = $('.signInUser');
var logoutLink = $('.logout');
var currentUserDiv = $('.current-user');
var noCurrentUserDiv = $('.no-current-user');


// FUNCTIONS
// ==========================
var createNewUser = function(form){
  var firstName = form.createUserFirstName.value;
  var email = form.createUserEmail.value;
  var password = form.createUserPassword.value;
  
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function () {
    user = firebase.auth().currentUser;
    showUserInfo(user);
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

var logInUser = function(form){
  var email = form.signInUserEmail.value;
  var password = form.signInUserPassword.value;

  firebase.auth().signInWithEmailAndPassword(email,password)
  .then(function(){
    user = firebase.auth().currentUser;
    showUserInfo(user);
  })
  .catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + ': ' + errorMessage);
  });
};

var updateUser = function(user){

};

var deleteUser = function(user){

};

var showUserInfo = function(currentUser){
  if(currentUser){
    currentUserDiv.removeClass('hide');
    noCurrentUserDiv.addClass('hide');
    $('.current-user h2 > span').text(user.displayName);
  } else{
    currentUserDiv.addClass('hide');
    noCurrentUserDiv.removeClass('hide');
  }
};


// set user var to current user on initial load, if current user in session
database.ref().once('value',function(){
  user = firebase.auth().currentUser;
  showUserInfo(user);
});


// RUN THE TRAPPPPP
// ==========================
$(document).ready(function() {

  createUser.on('submit',function(e){
    e.preventDefault();
    createNewUser(this);
  });

  signInUser.on('submit',function(e){
    e.preventDefault();
    logInUser(this);
  });

  logoutLink.on('click', function(e){
    // e.preventDefault();
    firebase.auth().signOut();
  });
  
  $("#signInUser").hide();
  $("#button2").hide();

  $("#button").on('click', function(){
    $("#createUser").hide();
    $("#signInUser").show();
    $("#button2").show();
  });
  $("#button2").on('click', function(){
    $("#createUser").show();
    $("#signInUser").hide();
    $("#button2").hide();
  });
}); 