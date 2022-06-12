import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "@Firebase/app";
import { IMessage } from "chat-app-types";

// returns a promise that resolves to a firebase document using id if not exists returns undefined
const getFirebaseDoc = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export const getUserByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("user", id);
export const getThreadByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("thread", id);
export const getMessageByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("message", id);

export const getMessagesInThread = async (threadId: string) => {
  const messageCollectionRef = collection(db, "message");
  const q = query(messageCollectionRef, where("threadId", "==", threadId));
  const messages: Array<IMessage> = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    messages.push(doc.data() as IMessage);
  });
  return messages;
};
