const key = '2013cbb8d05f985325a7945757d64373';
var validcity = false;
if(key=='') document.getElementById('temp').innerHTML = ('Remember to add your api key!');

function weatherBallon( cityName ) {
	fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + cityName+ '&appid=' + key)  
	.then(function(resp) { return resp.json() }) // Convert data to json
	.then(function(data) {
		console.log(data);
		validcity=true;
		drawWeather(data);
	})
	.catch(function(e) {
		alert("City not found!")
		console.log(e);
		validcity =false;
		// catch any errors
	});
}
function drawWeather( weatherlist ) {
	$("#weather").empty();
	for(let i=0; i<5; i++){
		let d= weatherlist.list[i*8];
		let celcius = Math.round(parseFloat(d.main.temp)-273.15);
		let fahrenheit = Math.round(((parseFloat(d.main.temp)-273.15)*1.8)+32);
		let description = d.weather[0].description; 
		let icon = d.weather[0].icon;
		console.log(description);
		$("#weather").append(`
			<div class="forecast" >
				<div id="description`+i+`">`+description+`</div>
					<h1 id="temp`+i+`">`+celcius + '&deg'+` <img src="http://openweathermap.org/img/wn/`+icon+`@2x.png"></h1>
				<div id="location">`+weatherlist.city.name+`</div>
			</div>
			`
		);
		// document.getElementById('description').innerHTML = description;
		// document.getElementById('temp').innerHTML = celcius + '&deg;';
		// document.getElementById('location').innerHTML = d.name;
		
	}
		// if( description.indexOf('rain') > 0 ) {
		// 	document.body.className = 'rainy';
		// } else if( description.indexOf('cloud') > 0 ) {
		// 	document.body.className = 'cloudy';
		// } else if( description.indexOf('sunny') > 0 ) {
		// 	document.body.className = 'sunny';
		// } else {
		// 	document.body.className = 'clear';
		// }
}

//get by defult
window.onload = function() {
	console.log(document.getElementById("city").value);
	weatherBallon('London');	
}

function movePage3() {
	let city =document.getElementById("city").value;
	if(city == "" || city == null || !validcity){
		alert ("Please select a city.");
		return;
	}
	console.log("the sity is:",city);
	sessionStorage.setItem('city', city);
	document.location.href ="page3.html";
}

//get from input
function myFunc() {
	var x = document.getElementById("city").value;
	weatherBallon(x);	
	console.log(x);
	return x;
}

