import { INewGroup, IUser } from "chat-app-types";
import { addGroupIdToUserInFirestore, addGroupToFirestore } from "./CRUD";

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

  // TODO: set uploaded image url to group photURL
};
