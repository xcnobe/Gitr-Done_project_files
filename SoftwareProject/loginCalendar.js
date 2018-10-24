var login = document.getElementById("login");
var button = document.getElementById("button");
// var email = document.getElementById("email");

function switchToSignUp(x) {
	login.innerHTML = "Sign Up";
	x.innerHTML = "";
	button.innerHTML = "Sign Up";
	document.getElementById("pageDiv").style.flex = "0 0 78%";


	//first name
	var fName = document.createElement("DIV");
	fName.classList.add("form-group");
	fName.setAttribute("id", "fName");
    var form = document.getElementById("form");
    form.insertBefore(fName, form.childNodes[0]);

    var fNameLabel = document.createElement("LABEL");
    var fNameLabelText = document.createTextNode("First Name");
    fNameLabel.appendChild(fNameLabelText);
    fNameLabel.setAttribute("for", "firstnameinput");
    fName.appendChild(fNameLabel);


    var fNameInput = document.createElement("INPUT");
    fNameInput.classList.add("form-control");
    fNameInput.setAttribute("type", "text");
    fNameInput.setAttribute("id", "firstnameinput");
    fNameInput.setAttribute("placeholder", "First Name");
    document.getElementById("fName").appendChild(fNameInput);

	//last name
	var lName = document.createElement("DIV");
	lName.classList.add("form-group");
	lName.setAttribute("id", "lName");
    form.insertBefore(lName, form.childNodes[1]);

    var lNameLabel = document.createElement("LABEL");
    var lNameLabelText = document.createTextNode("Last Name");
    lNameLabel.appendChild(lNameLabelText);
    lNameLabel.setAttribute("for", "lastnameinput");
    document.getElementById("lName").appendChild(lNameLabel);


    var lNameInput = document.createElement("INPUT");
    lNameInput.classList.add("form-control");
    lNameInput.setAttribute("type", "text");
    lNameInput.setAttribute("id", "lastnameinput");
    lNameInput.setAttribute("placeholder", "Last Name");
    document.getElementById("lName").appendChild(lNameInput);

	//Confirm password
	var conPass = document.createElement("DIV");
	conPass.classList.add("form-group");
	conPass.setAttribute("id", "confirmPassword");
    form.insertBefore(conPass, form.childNodes[6]);

    var conPassLabel = document.createElement("LABEL");
    var conPassLabelText = document.createTextNode("Confirm Password");
    conPassLabel.appendChild(conPassLabelText);
    conPassLabel.setAttribute("for", "conPassinput");
    document.getElementById("confirmPassword").appendChild(conPassLabel);


    var conPassinput = document.createElement("INPUT");
    conPassinput.classList.add("form-control");
    conPassinput.setAttribute("type", "password");
    conPassinput.setAttribute("id", "conPassinput");
    conPassinput.setAttribute("placeholder", "Confirm Password");
    conPassinput.setAttribute("required", "");
    document.getElementById("confirmPassword").appendChild(conPassinput);
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



