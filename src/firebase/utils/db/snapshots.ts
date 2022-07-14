import { db } from "@Firebase/app";
import {
  collection,
  doc,
  DocumentSnapshot,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// SUBSCRIBE to a firebase collection
export const getMessagesInGroupSnapShot = (
  groupId: string,
  callback: (snapShots: any) => void
) => {
  const messageCollectionRef = collection(db, "messages");
  const q = query(
    messageCollectionRef,
    where("groupId", "==", groupId),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, callback);
};

export const getUserSnapshot = (
  userId: string,
  callback: (snapShots: any) => void
) => {
  const userRef = doc(db, "users", userId);
  return onSnapshot(userRef, callback);
};

export const getGroupSnapshot = (
  groupId: string,
  callback: (snap: DocumentSnapshot) => void
) => {
  const groupRef = doc(db, "groups", groupId);
  return onSnapshot(groupRef, callback);
};
