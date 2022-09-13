import { INewGroup } from "chat-app-types";
import { addGroupIdToUserInFirestore, addGroupToFirestore } from "./CRUD";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@Firebase/app";
import { setDoc } from "firebase/firestore";

export const createGroup = async (group: {
  img: { name: string; content: File } | null;
  info: INewGroup;
  membersId: string[];
}) => {
  //  Create a group in Firestore
  const newGroupRef = await addGroupToFirestore(group.info);
  //  Add the group to the members's groupIds
  group.membersId.forEach((memberId) => {
    addGroupIdToUserInFirestore(memberId, newGroupRef.id);
  });

  // if group image uploaded
  if (group.img) {
    //  Upload groupImg to firebase storage
    const storageRef = ref(storage, group.img.name);
    const snap = await uploadBytes(storageRef, group.img.content);
    const downloadURL = await getDownloadURL(storageRef);
    //  set uploaded image url to group photURL
    setDoc(newGroupRef, { photoURL: downloadURL }, { merge: true });
  }

  return newGroupRef;
};
