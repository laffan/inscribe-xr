import { useState, useEffect } from "react";
import slugify from "slugify";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject
} from "firebase/storage";
import { createImagePrompt, getUserDocs } from "./firestore";

import { auth, firestore, storage } from "./config";

/* ==========================================
  Parse filename and make it a little cleaner/safer.
*/

function createFilename(string) {
  const strObj = string.split(".");
  let r = (Math.random() + 1).toString(36).substring(7);
  const name = slugify(strObj[0], {
    lower: true,
    strict: true,
  }).slice(0, 30);
  return `${r}-${name}.${strObj[1]}`;
}

export const deleteFile = (path) => {
  const desertRef = ref(storage, path);

  deleteObject(desertRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};


export const uploadImagePrompt = async (files) => {
  const promises = [];

  files.forEach((file) => {
    const filename = Date.now();
    const storageRef = ref(storage, `${auth.currentUser.uid}/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    promises.push(
      new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const prog = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          },
          (error) => {
            console.log(error);
            reject(error);
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              const { name, size, type } = file;

              await createImagePrompt({
                name: name,
                path: {
                  filename: filename + ".jpeg",
                  basename: filename,
                  basepath: url.split(filename)[0],
                  tokenpath: url.split(filename)[1],
                },
                sizes: [400, 1500],
                filesize: size,
                url,
              });

              resolve();
            } catch (error) {
              console.log(error);
              reject(error);
            }
          }
        );
      })
    );
  });

  await Promise.all(promises);
  const newUploads = await getUserDocs("uploads");
  return newUploads;
};
