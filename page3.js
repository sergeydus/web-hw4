var selectedcity;
var startdate;
var enddate;
var stars;
var database;
var uidRef;
var userId;
var OrderedCar //bool
var myvacations = [];

$(document).ready(function(){
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      selectedcity= sessionStorage.getItem('city');
      if(selectedcity==null){
        window.location.replace("Weather.html");  
      }
      else{
        $("#head").text($("#head").text()+selectedcity);
        firebase.storage().ref().child('images/'+firebase.auth().currentUser.uid).getDownloadURL().then((e) =>{
          console.log(e+"@@@@");
          $("#profileImage").attr("src",e);
          $("#imagelink").attr("href",e);
        })
          console.log(firebase.auth().currentUser);
          database = firebase.database();
          userId = firebase.auth().currentUser.uid;
          uidRef = firebase.database().ref('users/' +userId);
          uidRef.on('value', function(snapshot) {
            if(snapshot.val()){
              console.log(snapshot.val());
              let res= snapshot.val();
              let arr=(Object.keys(snapshot.val()));
              for(let i=0;i<arr.length;i++){
                myvacations[i]=res[arr[i]];
              }
              console.log(myvacations);
              draworders();
            }
          });
        }
    }  
    else {
       // No user is signed in.
      window.location.replace("login.html");
    }
  });
  $("#myform").submit(function(e) {
    console.log("weew");
    e.preventDefault();
    // console.log($("#startdate").val());
    startdate =($("#startdate").val());
    enddate =($("#enddate").val());
    if(startdate==''|| enddate==''){
      alert("please enter a proper date/s.");
      return;
    }
    startdate = new Date(startdate);
    enddate = new Date(enddate);
    if(enddate.getTime()<startdate.getTime()){
      alert("Start date needs to be before End Date!");
      return;
    }
    if(!checkvaliddate(startdate.getTime(),enddate.getTime())){
      alert("Your dates collide with your previous orders!");
      return;
    }
    OrderedCar = $("#car").is(":checked");
    stars=$("#stars").val();
    //console.log(date,stars,OrderedCar);
    writeUserData(startdate.getTime(),enddate.getTime(),stars,OrderedCar);
  });
  $("#logoutButton").click(function(e) {
    e.preventDefault();
    firebase.auth().signOut().then(function() {
      document.location.replace ="login.html";
    }, function(error) {
      // An error happened.
      console.error(error);
    });
  });
});
function writeUserData(startDate,endDate, stars, WantsCar) {
  // Date.gettime();
  //console.log(Date);
  let newPostRef = uidRef.push();
  newPostRef.set({
    City:selectedcity,
    startDate:startDate,
    endDate:endDate,
    Stars:stars,
    WantsCar:WantsCar
  });
}
function draworders(){
  $("#orders").empty();
  for(let i=0;i<myvacations.length;i++){
    $("#orders").append(
      ` <div class="row justify-content-md-center">
          <div class="col-md-auto">
            <ul>
              <li class="gray1">City: `+myvacations[i].City+`</li>
              <li class="gray2">From:  `+(new Date(myvacations[i].startDate).toDateString())+`</li>
              <li class="gray1">Till:  `+(new Date(myvacations[i].endDate).toDateString())+`</li>
              <li class="gray2">Car:  `+myvacations[i].WantsCar+`</li>
              <li class=gray1 >Hotel stars:   `+myvacations[i].Stars+`</li>
            </ul>
          </div>
        </div>
      `
    );
  }
}
function checkvaliddate(date1,date2){
  for(let i=0;i<myvacations.length;i++){
    if(date1>=myvacations[i].startDate &&date1<=myvacations[i].endDate)
      return false;
    if(date2>=myvacations[i].startDate &&date2<=myvacations[i].endDate)
      return false;
    if(date1<=myvacations[i].startDate &&date2>=myvacations[i].endDate)
      return false;
    }
  return true;
}
