import { doc, DocumentSnapshot, getDoc } from "firebase/firestore";
import { db } from "@Firebase/app";

// returns a promise that resolves to a firebase document using id if not exists returns undefined
const getFirebaseDoc = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getUserById = async (id: string) => getFirebaseDoc("user", id);
export const getThreadById = async (id: string) => getFirebaseDoc("thread", id);
export const getMessageById = async (id: string) =>
  getFirebaseDoc("message", id);
