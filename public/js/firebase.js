// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAOp9usflu3vUqdHRuC4TEWPq823AA04lE",
  authDomain: "fir-app-ad0cd.firebaseapp.com",
  projectId: "fir-app-ad0cd",
  storageBucket: "fir-app-ad0cd.appspot.com",
  messagingSenderId: "559855500470",
  appId: "1:559855500470:web:2bec1b9f718362d814ba17",
};

// firebase tools
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// const storage = firebase.storage();
const auth = firebase.auth();

// A document in Fire store is represented as a JavaScript object

const createRecord = async (reqData) => {
  try {
    const db_collection = await db.collection("userData");
    const docRef = await db_collection.add(reqData);

    console.log("Document written with ID: ", docRef.id);
    return docRef;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // rethrow the error to propagate it to the caller
  }
};


// function storeImageInFirestore(file) {
//   if (!file || !file.name) {
//     console.log("Invalid file object");
//     return Promise.reject("Invalid file object");
//   }

//   const storageRef = firebase
//     .storage()
//     .ref()
//     .child("images/" + file.name);
//   return storageRef
//     .put(file)
//     .then((snapshot) => {
//       console.log("Image uploaded successfully");
//       return snapshot.ref
//         .getDownloadURL()
//         .then((downloadURL) => {
//           console.log("Download URL:", downloadURL);
//           const imageUrl = downloadURL;
//           return firebase
//             .firestore()
//             .collection("images")
//             .add({ imageUrl })
//             .then((docRef) => {
//               console.log("Document written with ID:", docRef.id);
//               return docRef.id;
//             })
//             .catch((error) => {
//               console.log("Error adding document:", error);
//               throw error;
//             });
//         })
//         .catch((error) => {
//           console.log("Error retrieving download URL:", error);
//           throw error;
//         });
//     })
//     .catch((error) => {
//       console.log("Error uploading image:", error);
//       throw error;
//     });
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const fileInput = document.getElementById("file-input");
//   const submitButton = document.getElementById("submit-button");

//   submitButton.addEventListener("click", function (e) {
//     e.preventDefault();

//     const file = fileInput.files[0];

//     // Create a URL for the file
//     // const fileURL = URL.createObjectURL(file);

//     //     storeImageInFirestore(file)
//     //       .then((documentId) => {
//     //         console.log("Image stored in Firestore with document ID:", documentId);
//     //       })
//     //       .catch((error) => {
//     //         console.log("Error storing image in Firestore:", error);
//     //       });
//   });
// });
