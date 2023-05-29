const loginFormEl = document.querySelector("form#loginForm");
let emailError = document.getElementById("emailError");
let passError = document.getElementById("passError");

const LoginRequest = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(
      email,
      password
    );
    let user = userCredential.user;

    const userObj = localStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    let errorCode = error.code;
    let errorMessage = error.message;

    if ((errorCode = "auth/user-not-found")) {
      passError.innerHTML = "user not found";
    }

    if ((errorCode = "auth/too-many-requests")) {
      passError.innerHTML = "tried too much.. try again later";
    }

    console.log(errorMessage, errorCode);
  }
};

const validateForm = () => {
  const formFields = document.forms.loginForm;

  const email = formFields.email.value;
  const password = formFields.password.value;

  let isValid = true;

  if (email.trim() === "") {
    emailError.innerHTML = "Email must be filled out";
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (password.trim() === "") {
    passError.innerHTML = "Password must be filled out";
    isValid = false;
  } else {
    passError.innerHTML = "";
  }

  return isValid;
};

checkUserLogin = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));

  // Redirect to home page
  if (userObj) {
    window.location.replace("admin.html");
  }
};

const handleLoginForm = async (e) => {
  e.preventDefault();
  const isValid = validateForm();

  if (isValid) {
    const formInput = new FormData(loginFormEl);
    const { email, password } = Object.fromEntries(formInput);

    var loginButton = document.getElementById("loginButton");

    // Disable the button and show loader
    loginButton.disabled = true;
    loginButton.classList.add("button-loading");
    loginButton.innerHTML = "Loading";

    // // Simulating a delay for the login process (you can replace this with your actual login logic)
    setTimeout( async () =>{
      try {
        // Perform further actions with the validated form data
        await LoginRequest(email, password); // await the asynchronous operation
  
        // Reset the form
        loginFormEl.reset();
  
        await checkUserLogin();
      } catch (error) {
        // Handle any errors that occur during the async operations
        console.error("An error occurred:", error);
      }
      // Enable the button and restore the original text
      loginButton.disabled = false;
      loginButton.classList.remove("button-loading");
      loginButton.innerHTML = "Login";

    }, 2000); // Simulating a 3-second login process

    
  }
};

loginFormEl.addEventListener("submit", handleLoginForm);
