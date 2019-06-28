
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAxQL_7W1okSepYdUcyw-M-tvO7-ota1yY",
    authDomain: "web-hw4-ae599.firebaseapp.com",
    databaseURL: "https://web-hw4-ae599.firebaseio.com",
    projectId: "web-hw4-ae599",
    storageBucket: "web-hw4-ae599.appspot.com",
    messagingSenderId: "675692791634",
    appId: "1:675692791634:web:b56ad6e659260b7e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  $(document).ready(function(){
    $("#registerButton").click(function(e){
      e.preventDefault();
      console.log("teset");
      let email = $("#emailInput").val();
    let pass = $("#passwordInput").val();
    console.log(email + pass);
      firebase.auth().createUserWithEmailAndPassword(email, pass).catch(function(error) {
				    // Handle Errors here.
				    var errorCode = error.code;
				    var errorMessage = error.message;
            alert(errorMessage);
				});
    });
    $("#loginButton").click(function(e){
      e.preventDefault();
      let email = $("#emailInput").val();
    let pass = $("#passwordInput").val();
    console.log(email + pass);
      firebase.auth().signInWithEmailAndPassword(email, pass).catch(function(error) {
					// Handle Errors here.
					var errorCode = error.code;
					var errorMessage = error.message;
					alert(errorMessage);
				});
    });
    firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
        var displayName = user.displayName;
         var email = user.email;
          var emailVerified = user.emailVerified;
         var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          var providerData = user.providerData;
				location.href = "page2.html";
			} else {
				// User is signed out.
				// ...
			}
		});
  
  });