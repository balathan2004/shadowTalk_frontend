export interface ResponseConfig {
  message: string;
  status: 200 | 300;
}

export interface userDataInterface {
  readonly _id: string;
  readonly displayName: string;
  readonly email: string;
  readonly photoUrl: string;
  readonly createdAt: number;
  readonly username: string;
}

export interface ChatMessageInterface {
  readonly _id: string; // Unique chat ID
  readonly msgId: string; // unique msg id
  readonly senderId: string; // ID of the user sending the message
  readonly receiverId: string; // ID of the user receiving the message
  readonly content: string; // Text content of the message
  readonly createdAt: number; // Timestamp of when the message was created
}

export interface AuthResponseConfig extends ResponseConfig {
  userCred: userDataInterface | null;
}
