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
  var id;
  $(document).ready(function(){
    firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
        var displayName = user.displayName;
         var email = user.email;
          var emailVerified = user.emailVerified;
         var photoURL = user.photoURL;
          var isAnonymous = user.isAnonymous;
          var uid = user.uid;
          id=uid;
          var providerData = user.providerData;
          console.log(displayName +" "+ email+" "+uid);
          document.getElementById("welcomeMessage").innerHTML="Welcome "+email;
          firebase.storage().ref().child('images/'+uid).getDownloadURL().then((e) =>{
            console.log(e);
            $("#profileImage").attr("src",e);
            $("#imagelink").attr("href",e);
          });
          //console.log(temp);
          //console.log("wakba "+temp['i']);
          $("#imageUploadDiv").css({visibility:"visible"});
          $("#NextPageButton").css({visibility:"visible"});
			} else {
				// User is signed out.
				// ...
								location.href = "login.html";
			}
		});
    $("#logoutButton").click(function(e) {
      e.preventDefault();
      console.log("logout");
      firebase.auth().signOut().then(function() {
        document.location.replace ="login.html";
      }, function(error) {
        // An error happened.
        console.error(error);
      });
    });
   $("input[type='file']").on('change', function(e){
			if(e.target.files.length == 0){
				console.log('cancelled');
				return;
			}
			$("#uploadBtn").text('uploading...');
			var storageRef = firebase.storage().ref();
			var name = storageRef.child("images/" + id);
			name.put(e.target.files[0]).then(function(snapshot){
					name.getDownloadURL().then(function(url){
            location.reload();
						let ref = messagesRef.push();
						ref.set({
							type: "image",
							message: url,
							sender: email, 	
						});
						$("input[type='file']").val(null);
					}).catch(function(err){ console.log(err); });
			}).catch(function(err){ console.log(err);});
		});
    console.log("test "+id);
  });
