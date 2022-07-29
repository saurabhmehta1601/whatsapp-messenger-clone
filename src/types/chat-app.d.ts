declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    sender: {
      id: string;
      name: string;
    };
    groupId: string;
    createdAt: any;
  }

  interface ITextMessage extends IMessage {
    type: "text";
    text: string;
  }
  interface IImageMessage extends IMessage {
    type: "image";
    imageURL: string;
  }

  export type IChatMessage = IImageMessage | ITextMessage;
  interface INewTextMessage extends Omit<IMessage, "id" | "createdAt"> {
    type: "text";
    text: string;
  }

  interface INewImageMessage extends Omit<IMessage, "id" | "createdAt"> {
    type: "image";
    image: File;
  }

  type INewChatMessage = INewTextMessage | INewImageMessage;
  export interface IGroup {
    id: string;
    name: string | null;
    photoURL: string | null;
    lastMessageId: string | null;
  }

  export type INewGroup = Omit<IGroup, "id" | "lastMessageId">;

  export interface IGroupWithLastMessage extends Omit<IGroup, "lastMessageId"> {
    lastMessage: {
      text: string;
      createdAt: any;
    };
  }
  export interface IUser {
    id: string;
    photoURL: string | null;
    displayName: string | null;
    phoneNumber: string | null;
    groupIds: string[];
    status: string | null;
  }
}
