import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  addDoc,
  where,
  Timestamp,
  orderBy,
  setDoc,
} from "firebase/firestore";
import { db } from "@Firebase/app";
import { IMessage, IThread, IUser } from "chat-app-types";

// returns a promise that resolves to a firebase document using id if not exists returns undefined
const getFirebaseDoc = async (collectionName: string, docId: string) => {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  } else return undefined;
};

// GET single document from a firebase collection
export const getUserByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("user", id) as Promise<IUser | undefined>;
export const getThreadByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("thread", id) as Promise<IThread | undefined>;
export const getMessageByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("message", id) as Promise<IMessage | undefined>;

// SUBSCRIBE to a firebase collection
export const getMessagesInThreadSnapShot = (
  threadId: string,
  callback: (snapShots: any) => void
) => {
  const messageCollectionRef = collection(db, "message");
  const q = query(
    messageCollectionRef,
    where("threadId", "==", threadId),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, callback);
};

// ADD document to a firebase collection
export const addUserToFirestore = (userId: string, user: Omit<IUser, "id">) => {
  const userDocRef = doc(db, "user", userId);
  return setDoc(userDocRef, user, { merge: true });
};

export const addMessageToFirestore = (
  message: Omit<IMessage, "id" | "createdAt">
) => {
  return addDoc(collection(db, "message"), {
    ...message,
    createdAt: Timestamp.now(),
  });
};

export const addThreadToFirestore = (thread: IThread) => {
  return addDoc(collection(db, "thread"), thread);
};

// UPDATE document in a firebase collection
export const updateThreadInFirestore = (
  id: string,
  thread: Partial<IThread>
) => {
  const threadDocRef = doc(db, "thread", id);
  return setDoc(threadDocRef, thread, { merge: true });
};
