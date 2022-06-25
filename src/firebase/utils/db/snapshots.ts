import { db } from "@Firebase/app";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

// SUBSCRIBE to a firebase collection
export const getMessagesInThreadSnapShot = (
  threadId: string,
  callback: (snapShots: any) => void
) => {
  const messageCollectionRef = collection(db, "messages");
  const q = query(
    messageCollectionRef,
    where("threadId", "==", threadId),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, callback);
};
