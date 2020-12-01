import { useEffect, useState } from 'react';
import firebase from '../services/firebase';

const useCollection = (name) => {
  const db = firebase.firestore();
  const [data, set] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection(name).onSnapshot((snapshot) => {
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
