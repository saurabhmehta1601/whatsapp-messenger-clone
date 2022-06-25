import {
  collection,
  doc,
  getDoc,
  addDoc,
  Timestamp,
  setDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@Firebase/app";
import {
  IMessage,
  IThread,
  IThreadWithLastMessage,
  IUser,
} from "chat-app-types";

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
  getFirebaseDoc("users", id) as Promise<IUser | undefined>;

export const getMessageByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("messages", id) as Promise<IMessage | undefined>;

export const getThreadByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("threads", id) as Promise<IThread | undefined>;

export const getThreadByIdWithLastMessageFromFirestore = async (
  id: string
): Promise<undefined | IThreadWithLastMessage | IThread> => {
  const thread = await getThreadByIdFromFirestore(id);
  if (thread) {
    const message = await getMessageByIdFromFirestore(thread.lastMessageId);
    if (message) {
      return {
        ...thread,
        lastMessage: { text: message.text, createdAt: message.createdAt },
      };
    }
  }
  return thread;
};

// GET all documents in a collection
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: IUser[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...doc.data() as Omit<IUser, "id">});
  });
  return users;
};

// ADD document to a firebase collection
export const addUserToFirestore = (userId: string, user: Omit<IUser, "id">) => {
  const userDocRef = doc(db, "users", userId);
  return setDoc(userDocRef, user, { merge: true });
};

export const addMessageToFirestore = (
  message: Omit<IMessage, "id" | "createdAt">
) => {
  return addDoc(collection(db, "messages"), {
    ...message,
    createdAt: Timestamp.now(),
  });
};

export const addThreadToFirestore = (thread: IThread) => {
  return addDoc(collection(db, "threads"), thread);
};

// UPDATE document in a firebase collection
export const updateThreadInFirestore = (
  id: string,
  thread: Partial<IThread>
) => {
  const threadDocRef = doc(db, "threads", id);
  return setDoc(threadDocRef, thread, { merge: true });
};
