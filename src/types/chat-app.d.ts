declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    text: string;
    senderName: string;
    senderId: string;
    createdAt: any;
    threadId: string;
  }
  export interface IThread {
    id: string;
    name?: string;
    messages: IMessage[];
    lastMessage: string;
    lastMessagedAt: any;
    photoURL?: string;
  }
  export interface IUser {
    id: string;
    photoURL: string;
    displayName: string;
    threadIds: string[];
  }
}
