const mainEl = document.querySelector("main");
const successEl = document.querySelector("#success");
const formEl = document.querySelector("main form");

const submitForm = (e) =>{
    e.preventDefault();

    const formData = new FormData(formEl);
    const objData = Object.fromEntries(formData);

    // const objData = formDataToObject(formData);
      
    createRecord(objData); // firebase add record
    // showSuccess(); // success UI
}

// const formDataToObject = (formData)=> {
//     const obj = {};
//     formData.forEach((value, key) => {
//       obj[key] = value;
//     });
//     return obj;
//   }
  

const showSuccess = () =>{
    mainEl.classList.add("hidden");
    successEl.classList.remove("hidden");
}

formEl.addEventListener('submit', submitForm)

