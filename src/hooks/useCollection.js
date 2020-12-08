import { useEffect, useState } from 'react';
import firebase from '../services/firebase';

const getCollection = (db, name, where) =>
  !where ? db.collection(name) : db.collection(name).where(...where);

const useCollection = (name, where) => {
  const db = firebase.firestore();
  const [data, set] = useState([]);

  useEffect(() => {
    const unsubscribe = getCollection(db, name, where).onSnapshot((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      set(data);
    });
    return unsubscribe;
  }, [name]);

  const add = (data) => db.collection(name).add(data);
  const remove = (id) => db.collection(name).doc(id).delete();

  return { data, add, remove };
};

export default useCollection;
