var login = document.getElementById("login");
var button = document.getElementById("button");
// var email = document.getElementById("email");

function switchToSignUp(x) {
    document.getElementById("login").innerHTML = "Sign Up"
	document.getElementById("pageDiv").style.flex = "0 0 82%";
    document.getElementById("formLog").style.display = "none";
    document.getElementById("formSign").style.display = "block";
}


$(document).ready(function() {
	//var address = String(item.location).replace(/ /g,"+");
	var url = 'https://api.opencagedata.com/geocode/v1/json?q=Boulder%2C%20Colorado&key=3d7f8606462b4cf0911585ab6ddea519';
	$.ajax({url:url, dataType:"jsonp"}).then(function(data) {
		var lat = data.results[1].geometry.lat;
		var long = data.results[1].geometry.lng;

		var url2 = 'https://api.darksky.net/forecast/c9265fa4ef46bbd5265f4ed915fd3d7b/' + lat + ',' + long;
		$.ajax({url:url2, dataType:"jsonp"}).then(function(data2) {
			var temp = data2.currently.temperature;
			var icon = data2.currently.icon;
			var sum = data2.currently.summary;
			var jsTemp = document.getElementById('hiddenInput1');
			var jsIcon = document.getElementById('hiddenInput2');
			var jsSum = document.getElementById('hiddenInput3');
			jsTemp.value = temp;
			jsIcon.value = icon;
			jsSum.value = sum;
		})
	})
});