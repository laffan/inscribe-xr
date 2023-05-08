import { firestore } from "./../firebase";
import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { useStoreActions } from "easy-peasy";
import { auth } from "./../firebase";

const subscriptions = () => {
    const updateCollections = useStoreActions(
    (actions) => actions.collections.update
  );

  /*
    Subscribe user
  */

  const getUser = () => {
    const [user, setUser] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "users"),
          where("uid", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          let users = [];
          querySnapshot.forEach((doc) => {
            users.push({ ...doc.data(), id: doc.id });
          });
          setUser(users[0]);
        }
      );
      return unsubscribe;
    }, [auth.currentUser]);

    return { user };
  };
  /*
    Subscribe documents
  */

  const getDocuments = () => {
    const [documents, setDocuments] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "documents"),
          where("owner", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          let documents = [];
          querySnapshot.forEach((doc) => {
            documents.push({ ...doc.data(), id: doc.id });
          });
          setDocuments(documents);
        }
      );
      return unsubscribe;
    }, [auth.currentUser]);

    return { documents };
  };
  
  /*
    Subscribe collections
  */

  const getCollections = () => {
    const [collections, setCollections] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "collections"),
          where("owner", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          let collections = [];
          querySnapshot.forEach((doc) => {
            collections.push({ ...doc.data(), id: doc.id });
          });
          setCollections(collections);
}
      );
      return unsubscribe;
    }, [auth.currentUser]);

    return { collections };
  };


 /*
    Subscribe scenes
  */
  
  const getScenes = () => {
    const [scenes, setScenes] = useState([]);
    useEffect(() => {
      const unsubscribe = onSnapshot(
        query(
          collection(firestore, "scenes"),
          where("owner", "==", auth.currentUser.uid)
        ),
        (querySnapshot) => {
          let scenes = [];
          querySnapshot.forEach((doc) => {
            scenes.push({ ...doc.data(), id: doc.id });
          });
          setScenes(scenes);
        }
      );
      return unsubscribe;
    }, [auth.currentUser]);

    return { scenes };
  };

  return {
    getScenes,
    getWorkspaces,
    getCollections,
    getDocuments,
    getUser
  };
};

export default subscriptions;
