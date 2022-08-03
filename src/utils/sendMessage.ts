import {
  addMessageToFirestore,
  updateGroupInFirestore,
  uploadFile,
} from "@Firebase/utils/db/CRUD";
import { IMediaMessage, INewChatMessage } from "chat-app-types";

export const sendMessage = async (message: INewChatMessage) => {
  let createdMessage = null;

  if (message.type == "media") {
    const downloadURL = await uploadFile({
      name: message.name,
      file: message.file,
    });

    const newMediaMessage: Omit<IMediaMessage, "id" | "createdAt"> = {
      type: "media",
      fileName:
        message.name.split(".")[0] < 15
          ? message.name
          : message.name.substring(0, 15) + "..." + message.extension,
      mediaURL: downloadURL,
      sender: message.sender,
      groupId: message.groupId,
      extention: message.extension,
    };
    createdMessage = await addMessageToFirestore(newMediaMessage as any);
  }

  if (message.type === "text") {
    createdMessage = await addMessageToFirestore(message);
  }

  //  if message is added to firestore or firebase storage,
  if (createdMessage) {
    await updateGroupInFirestore(message.groupId, {
      lastMessageId: createdMessage.id,
    });
    console.log("message added to firebase with id", createdMessage?.id);
  }
};
