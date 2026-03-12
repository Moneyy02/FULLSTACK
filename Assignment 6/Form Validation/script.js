const form = document.getElementById("form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");

const toggleBtn = document.getElementById("togglePassword");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const phoneError = document.getElementById("phoneError");
const passwordError = document.getElementById("passwordError");

const strength = document.getElementById("strength");

let submissions = JSON.parse(localStorage.getItem("submissions")) || [];


// NAME VALIDATION
nameInput.addEventListener("input", () => {
    if(nameInput.value.length < 3){
        nameError.textContent = "Name must be at least 3 characters";
    } else {
        nameError.textContent = "";
    }
});


// EMAIL VALIDATION
emailInput.addEventListener("input", () => {

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(emailInput.value)){
    emailError.textContent = "Invalid email";
} else {
    emailError.textContent = "";
}

});


// PHONE VALIDATION
phoneInput.addEventListener("input", () => {

const phonePattern = /^[0-9]{10}$/;

if(!phonePattern.test(phoneInput.value)){
    phoneError.textContent = "Phone must be 10 digits";
} else {
    phoneError.textContent = "";
}

});


// PASSWORD STRENGTH
passwordInput.addEventListener("input", () => {

const value = passwordInput.value;

if(value.length < 6){
    strength.textContent = "Weak";
    strength.style.color = "red";
}
else if(value.match(/[A-Z]/) && value.match(/[0-9]/)){
    strength.textContent = "Strong";
    strength.style.color = "green";
}
else{
    strength.textContent = "Medium";
    strength.style.color = "orange";
}

});


// SHOW HIDE PASSWORD
toggleBtn.addEventListener("click", () => {

if(passwordInput.type === "password"){
    passwordInput.type = "text";
    toggleBtn.textContent = "Hide";
}
else{
    passwordInput.type = "password";
    toggleBtn.textContent = "Show";
}

});


// FORM SUBMIT
form.addEventListener("submit", (e) => {

e.preventDefault();

const data = {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value
};

submissions.push(data);

localStorage.setItem("submissions", JSON.stringify(submissions));

alert("Registration Successful!");

form.reset();
strength.textContent = "";

});