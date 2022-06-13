declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    text: string;
    senderName: string;
    senderId: string;
    createdAt: string;
  }
  export interface IThread {
    id: string;
    name?: string;
    messages: IMessage[];
    lastMessage: string;
    lastMessagedAt: string;
    photoURL?: string;
  }
  export interface IUser {
    id: string;
    photoURL: string;
    displayName: string;
    threadIds: string[];
  }
}
