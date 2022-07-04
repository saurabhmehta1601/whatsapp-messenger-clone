import { INewGroup } from "chat-app-types";
import { addGroupIdToUserInFirestore, addGroupToFirestore } from "./CRUD";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@Firebase/app";
import { setDoc } from "firebase/firestore";

export const createGroup = async (group: {
  img: { name: string; content: File };
  info: INewGroup;
  membersId: string[];
}) => {
  // TODO: Create a group in Firestore
  const newGroupRef = await addGroupToFirestore(group.info);
  // TODO: Add the group to the members's groupIds
  group.membersId.forEach((memberId) => {
    addGroupIdToUserInFirestore(memberId, newGroupRef.id);
  });
  // TODO: Upload groupImg to firebase store
  const storageRef = ref(storage, group.img.name);
  const snap = await uploadBytes(storageRef, group.img.content);
  console.log("uploaded snap", snap);
  const downloadURL = await getDownloadURL(storageRef);
  // TODO: set uploaded image url to group photURL
  setDoc(newGroupRef, { photoURL: downloadURL }, { merge: true });
};
