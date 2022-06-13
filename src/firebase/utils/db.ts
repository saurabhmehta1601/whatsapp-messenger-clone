import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  addDoc,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "@Firebase/app";
import { IMessage } from "chat-app-types";

// returns a promise that resolves to a firebase document using id if not exists returns undefined
const getFirebaseDoc = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() };
};

export const getUserByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("user", id);
export const getThreadByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("thread", id);
export const getMessageByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("message", id);

export const getMessagesInThreadSnapShot = async (
  threadId: string,
  callback: (snapShots: any) => void
) => {
  const messageCollectionRef = collection(db, "message");
  const q = query(messageCollectionRef, where("threadId", "==", threadId));
  onSnapshot(q, callback);
};

export const addMessageToFirestore = async (
  message: Omit<IMessage, "id" | "createdAt">
) => {
  const messageDocRef = await addDoc(collection(db, "message"), {
    ...message,
    createdAt: Timestamp.now(),
  });
  return messageDocRef.id;
};
