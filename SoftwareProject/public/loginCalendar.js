var login = document.getElementById("login");
var button = document.getElementById("button");
// var email = document.getElementById("email");

function switchToSignUp(x) {
    document.getElementById("login").innerHTML = "Sign Up"
	document.getElementById("pageDiv").style.flex = "0 0 82%";
    document.getElementById("formLog").style.display = "none";
    document.getElementById("formSign").style.display = "block";
}