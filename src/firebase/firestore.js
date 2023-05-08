import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  getDocs,
  setDoc,
  query,
  where,
  arrayUnion,
  updateDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { auth, firestore } from "./config";
import { deleteFile } from "./storage";

/* ==========================================
  createReflection
  Create a new reflection
*/

export const createReflection = async () => {
  const docRef = await addDoc(collection(firestore, "reflections"), {
    content: "A new reflection ... ",
    owner: auth.currentUser.uid,
    type: "text",
    promptId: "",
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });

  const newDoc = await getDoc(docRef);

  if (newDoc.exists()) {
    return { id: newDoc.id, ...newDoc.data() };
  }
};
/* ==========================================
  createReflection
  Create a new reflection
*/

export const createTextPrompt = async (prompt) => {
  const docRef = await addDoc(collection(firestore, "prompts"), {
    content: prompt,
    type: "text",
    owner: auth.currentUser.uid,
    created: serverTimestamp(),
    updated: serverTimestamp(),
  });

  // Retrieve the new document

  // const docRef = doc(firestore, "documents", id);
  const newDoc = await getDoc(docRef);

  if (newDoc.exists()) {
    return { id: newDoc.id, ...newDoc.data() };
  }
};

/* ==========================================
  delete Reflection
  Delete a an upload and associated storage files
*/

export const deleteReflection = async (id) => {
  const docRef = doc(firestore, "reflections", id);
  await deleteDoc(docRef);
};

/* ==========================================
  deleteTextPrompt
  Delete a an upload and associated storage files
*/

export const deleteTextPrompt = async (id) => {
  const docRef = doc(firestore, "prompts", id);
  await deleteDoc(docRef);
};

/* ==========================================
  deleteImagePrompt
  Delete a an upload and associated storage files
*/
export const deleteImagePrompt = async (id) => {
  const promptRef = doc(firestore, "prompts", id);
  const docSnap = await getDoc(promptRef);

  // If record exists
  if (docSnap.exists()) {
    const doc = docSnap.data();

    // create urls and delete each file in turn
    const fileDeletionPromises = doc.sizes.map((s) => {
      const url = `${auth.currentUser.uid}/${doc.path.basename}_${s}x${s}.jpeg`;
      return deleteFile(url);
    });

    await Promise.all(fileDeletionPromises);
    await deleteDoc(promptRef);
    const newPrompts = await getUserDocs("prompts");

    return newPrompts;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};

/* ==========================================
    Get user docs from a particular collection
  */
export const getUserDocs = async (collectionName) => {

  const ref = collection(firestore, collectionName);
  const q = query(ref, where("owner", "==", auth.currentUser.uid));

  const querySnapshot = await getDocs(q);
  const entries = [];
  querySnapshot.forEach((doc) => {
    entries.push({ id: doc.id, ...doc.data() });
  });

  return entries;
};
/* ==========================================
//     Get Documents
//   */
// export const getDocuments = async () => {
//   const ref = collection(firestore, "documents");
//   const q = query(ref, where("owner", "==", auth.currentUser.uid));

//   const querySnapshot = await getDocs(q);
//   const entries = [];
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     entries.push({ id: doc.id, ...doc.data() });
//   });

//   return entries;
// };

// /*
//   Return Document
// */
// const returnDocument = async (id) => {
//   const docRef = doc(firestore, "documents", id);
//   const document = await getDoc(docRef);

//   if (document.exists()) {
//     return { id: document.id, ...document.data() };
//   } else {
//     // doc.data() will be undefined in this case
//     return false;
//   }
// };

/* ==========================================
    Set Current Document
  */
export const setCurrentReflection = async (reflectionId) => {
  const userRef = doc(firestore, "users", auth.currentUser.uid);

  await updateDoc(userRef, {
    "state.currentReflection": reflectionId,
  });
};

/* ==========================================
    Set Prompt
  */
export const setPrompt = async (reflectionId, promptId) => {
  const docRef = doc(firestore, "reflections", reflectionId);

  await updateDoc(docRef, {
    promptId: promptId,
    updated: serverTimestamp(),
  });
};
/* ==========================================
    Save Document
  */
export const saveReflection = async (docId, content) => {
  const docRef = doc(firestore, "reflections", docId);

  await updateDoc(docRef, {
    content: content,
    updated: serverTimestamp(),
  });
};

/* ==========================================
    Save Transforms
  */
export const saveTransforms = async (sceneId, transforms) => {
  const ref = doc(firestore, "scenes", sceneId);

  await updateDoc(ref, {
    trackedTransforms: transforms,
  });
};

/* ==========================================
  createUpload
  Create a new document
*/

export const createImagePrompt = async (obj) => {
  const uploadRef = await addDoc(collection(firestore, "prompts"), {
    ...obj,
    type: "image",
    owner: auth.currentUser.uid,
    uploaded: serverTimestamp(),
  });

  return true;
};

/*
    Save Document
  */
// const saveDocument = async (id, content) => {
//   const docRef = doc(firestore, "documents", id);
//   await updateDoc(docRef, {
//     content: content,
//     updated: serverTimestamp(),
//   });
// };

//  /*
//   createPrefs
//   Create a new userPref
// */
// // const createPrefs = async () => {
// //   const docRef = await addDoc(collection(firestore, "userprefs"), {
// //     user: auth.currentUser.uid,
// //     complexity: 1,
// //     fontsize: 1
// //   });
// //   return docRef.id;
// // };

// /*
//   Get Prefs
// */
// // const getPrefs = async (uid) => {
// //   const docsRef = collection(firestore, "userprefs");
// //   const q = query(docsRef, where("user", "==", auth.currentUser.uid));

// //   const querySnapshot = await getDocs(q);
// //   const documents = [];
// //   querySnapshot.forEach((doc) => {
// //     // doc.data() is never undefined for query doc snapshots
// //     documents.push({ id: doc.id, ...doc.data() });
// //   });

// //   console.log( documents );
// //   if ( documents.length ) {
// //     return documents[0]
// //   }
// //   else {
// //     createPrefs();
// //   }
// // };

// /*
//   Update Prefs
// */
// const updatePrefs = async (field, val) => {
//   const docsRef = collection(firestore, "userprefs");
//   const q = query(docsRef, where("user", "==", auth.currentUser.uid));
//   const querySnapshot = await getDocs(q);

//   const documents = [];
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     documents.push({ id: doc.id, ...doc.data() });
//   });

//   console.log( documents );
//   if ( documents.length ) {
//     return documents[0]
//   }
//   else {
//     console.log("nothing there")
//     const prefID = await createPrefs();
//     const docRef = doc(firestore, "userprefs", prefID);
//     await updateDoc(docRef, {
//       [field]: val,
//     });
//     console.log("Prefs created")
//     return true;
//   }
// };

// return {
//   setCurrentDocument,
//   createDocument,
//   // deleteDocument,
//   // listDocuments,
//   // returnDocument,
//   saveDocument,
//   // saveName,
//   // // getPrefs,
//   // updatePrefs
// };
// };

// export default functions;
