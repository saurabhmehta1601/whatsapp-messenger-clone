import {
  collection,
  doc,
  getDoc,
  addDoc,
  Timestamp,
  setDoc,
  getDocs,
  updateDoc,
  FieldValue,
  arrayUnion,
} from "firebase/firestore";
import { db } from "@Firebase/app";
import {
  IMessage,
  IGroup,
  IGroupWithLastMessage,
  IUser,
  INewGroup,
  INewMessage,
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

export const getGroupByIdFromFirestore = async (id: string) =>
  getFirebaseDoc("groups", id) as Promise<IGroup | undefined>;

export const getGroupByIdWithLastMessageFromFirestore = async (
  id: string
): Promise<undefined | IGroupWithLastMessage | IGroup> => {
  const group = await getGroupByIdFromFirestore(id);
  if (group && group.lastMessageId) {
    group.id = id;
    const message = await getMessageByIdFromFirestore(group.lastMessageId);
    if (message) {
      return {
        ...group,
        lastMessage: { text: message.text, createdAt: message.createdAt },
      };
    }
  }
  return group;
};

// GET all documents in a collection
export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: IUser[] = [];
  querySnapshot.forEach((doc) => {
    users.push({ id: doc.id, ...(doc.data() as Omit<IUser, "id">) });
  });
  return users;
};

// ADD document to a firebase collection
export const addUserToFirestoreIfNotExists = async (
  userId: string,
  user: Omit<IUser, "id">
) => {
  const userDocRef = doc(db, "users", userId);
  const userSnap = await getDoc(userDocRef);
  if (userSnap.exists()) {
    return { id: userSnap.id, ...userSnap.data() };
  } else return setDoc(userDocRef, user, { merge: true });
};

export const addMessageToFirestore = (message: INewMessage) => {
  return addDoc(collection(db, "messages"), {
    ...message,
    createdAt: Timestamp.now(),
  });
};

export const addGroupToFirestore = (group: INewGroup) => {
  return addDoc(collection(db, "groups"), group);
};

// UPDATE document in a firebase collection
export const updateGroupInFirestore = (id: string, group: Partial<IGroup>) => {
  const groupDocRef = doc(db, "groups", id);
  return setDoc(groupDocRef, group, { merge: true });
};

export const addGroupIdToUserInFirestore = (
  userId: string,
  groupId: string
) => {
  const userRef = doc(db, "users", userId);
  return updateDoc(userRef, { groupIds: arrayUnion(groupId) });
};
