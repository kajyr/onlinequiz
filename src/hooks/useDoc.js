import { useEffect, useState, useRef } from 'react';
import firebase from '../services/firebase';

const useDoc = (collection, docId) => {
  const db = firebase.firestore();
  const document = useRef();
  const [data, set] = useState();

  useEffect(() => {
    document.current = db.collection(collection).doc(docId);
    const unsubscribe = document.current.onSnapshot((doc) => {
      set(doc.data());
    });

    return unsubscribe;
  }, [collection, docId]);

  return {
    data,
    update: (diff) => {
      if (document.current) {
        document.current.update(diff);
      }
    },
  };
};

export default useDoc;
