var selectedcity;

$(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
          window.location.replace("login.html");
        }
      });
    selectedcity= sessionStorage.getItem('city');
    console.log("selected city is:",selectedcity);
    console.log(firebase.auth().currentUser);
});