declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    text: string;
    sender: {
      id: string;
      name: string;
    };
    groupId: string;
    createdAt: any;
  }

  type INewMessage = Omit<IMessage, "id" | "createdAt">;
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
