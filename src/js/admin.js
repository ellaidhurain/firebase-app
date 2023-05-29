// const getRecord = () => {
//     return new Promise((resolve, reject) => {
//       db.collection("userData")
//         .get()
//         .then((resData) => {
//           const documentDataArray = [];
//           resData.forEach((doc) => {
//             const documentData = doc.data();
//             documentDataArray.push(documentData);
//           });
//           resolve(documentDataArray);
//         })
//         .catch((error) => {
//           console.log("Error fetching collection:", error);
//           reject(error);
//         });
//     });
//   };


const getRecord = async () => {
  try {
    // Read collection data
    const resData = await db.collection("userData").get();

    const documentDataArray = [];

    resData.forEach((doc) => {
      const documentData = doc.data();
      documentDataArray.push(documentData);
    });

    return documentDataArray;
  } catch (error) {
    console.log("Error fetching collection:", error);
    throw error; // rethrow the error to propagate it to the caller
  }
};

const handleGetUser = () => {
  const userObj = JSON.parse(localStorage.getItem("user"));
  const tbodyEl = document.querySelector("#table-body");
  const fragment = document.createDocumentFragment();
  
  if (!userObj) {
    window.location.replace("login.html");
  }

  showLoader();
  setTimeout( async ()=>{
    if (userObj) {
        const userData = await getRecord();
        
        let S_No = 1
    
        userData.map(({fullName,email,skills}) => {
            
          const tr = document.createElement("tr");
          tr.classList.add("text-center")
          const serialNo = document.createElement("td");
          serialNo.textContent = S_No
          S_No++
    
          serialNo.classList.add("p-2" ,"border");
    
          const Name = document.createElement("td");
          Name.textContent = fullName;
          Name.classList.add("p-2" ,"border");
    
          const Email = document.createElement("td");
          Email.textContent = email;
          Email.classList.add("p-2" ,"border");
    
          const Skills = document.createElement("td");
          Skills.textContent = skills;
          Skills.classList.add("p-2" ,"border");
    
          const Action = document.createElement("td");
          Action.classList.add("p-2","border");
    
          const viewBtn = document.createElement("button");
          viewBtn.textContent = "view";
          viewBtn.classList.add("bg-green-500", "hover:bg-green-400","m-2", "px-4", "py-2" ,"rounded-md", "text-white")
          
          const deleteBtn = document.createElement("button");
          deleteBtn.textContent = "delete";
          deleteBtn.classList.add("bg-red-500", "hover:bg-red-400", "px-4", "py-2" ,"rounded-md", "text-white")
          
          Action.append(viewBtn,deleteBtn);
          
          tr.append(serialNo, Name,  Email,Skills, Action);
    
          fragment.append(tr);
    
          tbodyEl.appendChild(fragment);
    
        });
    
      }else{
        const tbEl = document.querySelector("#table") 
        tbEl.innerHTML = `<div class="text-center m-4"><p">No user Found</p></div>`
      }    

    hideLoader()
  }, 1000);

 
};

handleGetUser();

const logout = () => {
  localStorage.removeItem("user");
  window.location.replace("login.html");
};

// Show the loader
function showLoader() {
    var loaderContainer = document.getElementById("loader-container");
    loaderContainer.classList.remove("hidden");
  }
  
  // Hide the loader
  function hideLoader() {
    var loaderContainer = document.getElementById("loader-container");
    loaderContainer.classList.add("hidden");
  }
  