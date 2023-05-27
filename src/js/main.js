const mainEl = document.querySelector("main");
const successEl = document.querySelector("#success");
const formEl = document.querySelector("main form");
const formInputFields = document.querySelectorAll("input, select");
const myForm = document.forms[0];

const submitForm = (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    const formData = new FormData(formEl);
    const objData = Object.fromEntries(formData);

    // Perform further actions with the validated form data
    createRecord(objData); // firebase add record
    showSuccess(); // success UI

    // Reset the form
    formEl.reset();
  }
};

formEl.addEventListener("submit", submitForm);

// const formDataToObject = (formData)=> {
//     const obj = {};
//     formData.forEach((value, key) => {
//       obj[key] = value;
//     });
//     return obj;
//   }

const showSuccess = () => {
  mainEl.classList.add("hidden");
  successEl.classList.remove("hidden");
};

// js form validation
/*
In JavaScript, the document.forms property is an array-like object that 
represents all the HTML forms within a document. It allows you to access 
and manipulate individual forms and their elements.

When you access document.forms, you get a collection of all the <form> 
elements present in the document. You can access a specific form using 
either its index or its name as a property of the document.forms collection.
*/

// purpose of validation
// 1. validate data before create make a request from user side.
// 2. show error to user.
// 3. ensure all required field is filled with data.
// 4. ensure the data is valid format before store in db.
// 5. decrease the chance of malicious data to be stored in db.

let nameError = document.getElementById("nameError");
let genderError = document.getElementById("genderError");
let emailError = document.getElementById("emailError");
let dobError = document.getElementById("dobError");
let skillError = document.getElementById("skillError");
let expError = document.getElementById("expError");
let gradError = document.getElementById("gradError");
let termsError = document.getElementById("termsError");

const validateForm = () => {
  const formFields = document.forms.feedback;
  const name = formFields.fullName.value;
  const gender = formFields.elements.gender; // get all radio buttons
  const email = formFields.email.value;
  const dob = formFields.dob.value;
  const skills = formFields.skills.value;
  const graduation = formFields.graduation.value;
  const selectElement = formFields.querySelector("#selectId");
  const terms = formFields.terms;

  let isValid = true;

  if (name.trim() === "") {
    nameError.innerHTML = "Please enter your name";
    isValid = false;
  } else {
    nameError.innerHTML = ""; // Clear the error message
  }

  let isChecked = false;

  for (let i = 0; i < gender.length; i++) {
    if (gender[i].checked) {
      isChecked = true;
      break;
    }
  }

  if (!isChecked) {
    genderError.innerHTML = "Please select your gender";
    isValid = false;
  } else {
    genderError.innerHTML = ""; // Clear the error message
  }

  if (email.trim() === "") {
    emailError.innerHTML = "Email must be filled out";
    isValid = false;
  } else {
    emailError.innerHTML = "";
  }

  if (dob === "") {
    dobError.innerHTML = "Please select your date of birth";
    isValid = false;
  } else {
    var today = new Date();
    var dobParts = dob.split("-");
    var dobDate = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);

    if (dobDate.getTime() > today.getTime()) {
      dobError.innerHTML = "Date of birth cannot be in the future";
      isValid = false;
    } else {
      dobError.innerHTML = ""; // Clear the error message
    }
  }

  if (skills === "") {
    skillError.innerHTML = "Please enter any one skill";
    isValid = false;
  } else {
    skillError.innerHTML = ""; // Clear the error message
  }

  if (graduation === "") {
    gradError.innerHTML = "Please enter year of graduation";
    isValid = false;
  } else {
    gradError.innerHTML = ""; // Clear the error message
  }

  if (selectElement && selectElement.value === "") {
    expError.innerHTML = "please select your experiance";
  } else {
    expError.innerHTML = "";
  }

  if (!terms.checked) {
    termsError.innerHTML = "Please agree to the terms and conditions";
    isValid = false;
  } else {
    termsError.innerHTML = ""; //
  }

  return isValid;
};

formInputFields.forEach((input) => {
  // console.log(input);
  input.addEventListener("change", () => {
    if (input.name == "fullName" && input.value === "") {
      nameError.innerHTML = "Name is required";
    } else {
      nameError.innerHTML = "";
    }

    var emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (input.name == "email" && !emailRegex.test(input.value)) {
      emailError.innerHTML = "Invalid email format";
      isValid = false;
    } else {
      emailError.innerHTML = ""; // Clear the error message
    }

    let isChecked = false;

    for (let i = 0; i < gender.length; i++) {
      if (gender[i].checked) {
        isChecked = true;
        break;
      }
    }

    if (!isChecked) {
      genderError.innerHTML = "Please select your gender";
      isValid = false;
    } else {
      genderError.innerHTML = ""; // Clear the error message
    }

    if (input.name == "dob" && input.value === "") {
      dobError.innerHTML = "Please select your date of birth";
    } else {
      var today = new Date();
      var dobParts = input.value.split("-");
      var dobDate = new Date(dobParts[0], dobParts[1] - 1, dobParts[2]);

      if (dobDate.getTime() > today.getTime()) {
        dobError.innerHTML = "Date of birth cannot be in the future";
      } else {
        dobError.innerHTML = ""; // Clear the error message
      }
      dobError.innerHTML = "";
    }

    if (input.name == "skills" && input.value === "") {
      skillError.innerHTML = "Please enter any one skill";
    } else {
      skillError.innerHTML = ""; // Clear the error message
    }

    if (input.name == "graduation" && input.value === "") {
      gradError.innerHTML = "Please enter year of graduation";
    } else {
      gradError.innerHTML = ""; // Clear the error message
    }

    const selectElement = myForm.querySelector('#selectId');
    if (selectElement && selectElement.value === "") {
      expError.innerHTML = "please select your experiance";
    } else {
      expError.innerHTML = "";
    }
  });
});
