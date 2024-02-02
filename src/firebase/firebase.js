import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBfHVB2eSB9-Q1uKTRCSO4Nz_wSyaiY4dA",
    authDomain: "hivestore-4a4f3.firebaseapp.com",
    projectId: "hivestore-4a4f3",
    storageBucket: "hivestore-4a4f3.appspot.com",
    messagingSenderId: "1077538112285",
    appId: "1:1077538112285:web:47a62b7844b7166bcdd7f4",
    measurementId: "G-TYB7QH67FD"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage();

export const uploadImgHook = async (image, setProgress) => {
  const imageRef = ref(storage, `images/${image.name}`);
  const uploadTask = uploadBytesResumable(imageRef, image);

  return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
              const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
              console.log('Upload is ' + progress + '% done');
              setProgress(progress);
          },
          (error) => {
              // A full list of error codes is available at
              // https://firebase.google.com/docs/storage/web/handle-errors
              switch (error.code) {
                case 'storage/unauthorized':
                  // User doesn't have permission to access the object
                  break;
                case 'storage/canceled':
                  // User canceled the upload
                  break;
          
                // ...
          
                case 'storage/unknown':
                  // Unknown error occurred, inspect error.serverResponse
                  break;
              }
              reject(error);
            }
          ,
          () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                  console.log('File available at', downloadURL);

                  resolve(downloadURL);
              })
              .catch(error => {
                reject(error);
              });
          }
      );
  });  
};

