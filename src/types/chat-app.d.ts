declare module "chat-app-types" {
  export interface IMessage {
    id: string;
    text: string;
    sender: {
      id: string;
      name: string;
    };
    threadId: string;
    createdAt: any;
  }
  export interface IThread {
    id: string;
    name: string | null;
    private: boolean;
    photoURL: string | null;
    lastMessageId: string;
  }

  export interface IThreadWithLastMessage
    extends Omit<IThread, "lastMessageId"> {
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
    threadIds: string[];
    status: string | null;
  }
}
