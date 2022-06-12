declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    text: string;
    senderName: string;
    createdAt: string;
  }
  export interface IThread {
    id: string;
    name?: string;
    messages: IMessage[];
  }
  export interface IUser {
    photoURL: string;
    displayName: string;
  }
}
