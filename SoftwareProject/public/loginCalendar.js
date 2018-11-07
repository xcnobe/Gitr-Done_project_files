var login = document.getElementById("login");
var button = document.getElementById("button");
// var email = document.getElementById("email");

function switchToSignUp(x) {
    document.getElementById("login").innerHTML = "Sign Up"
	document.getElementById("pageDiv").style.flex = "0 0 78%";
    document.getElementById("formLog").style.display = "none";
    document.getElementById("formSign").style.display = "block";
}

function validPassword() {
	var password = document.getElementById('exampleInputPassword1');
	var confirmPassword = document.getElementById('conPassinput');

	if (password.value != confirmPassword.value) {
    	confirmPassword.setCustomValidity("Passwords Don't Match");
  	} 
  	else {
    	confirmPassword.setCustomValidity('');
    }
    password.onchange = validPassword;
	confirmPassword.onkeyup = validPassword;
}



