import {
  CollectionReference,
  DocumentData,
  QuerySnapshot,
  WriteResult,
  Timestamp,
  FieldValue,
  DocumentSnapshot,
} from "firebase-admin/firestore";
import { db } from "../config";
import { mapFirebaseError } from "../utils";
import { LoginInfo, SignupInfo } from "../types";

class UserRepository {
  private userCollection: CollectionReference<DocumentData>;

  constructor() {
    this.userCollection = db.collection("users");
  }

  async getUserByEmail(email: string): Promise<DocumentSnapshot<DocumentData>> {
    try {
      const snapshot = await this.userCollection.doc(email).get();

      return snapshot;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  async createUser(signupInfo: SignupInfo): Promise<WriteResult> {
    const userRef = this.userCollection.doc(signupInfo.email);

    try {
      const result = await userRef.create({
        ...signupInfo,
        createdAt: Timestamp.now(),
        emailVerified: false,
        role: "USER",
        status: "OFFLINE",
        friends: [],
        chatrooms: [],
      });

      return result;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  async login(loginInfo: LoginInfo): Promise<QuerySnapshot<DocumentData>> {
    try {
      const user = await this.userCollection
        .where("email", "==", loginInfo.email)
        .where("password", "==", loginInfo.password)
        .limit(1)
        .get();

      return user;
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }

  async updateUserChatrooms(email: string, roomId: string): Promise<void> {
    try {
      await this.userCollection.doc(email).update({
        chatrooms: FieldValue.arrayUnion(roomId),
      });
    } catch (err) {
      throw mapFirebaseError(err);
    }
  }
}

export default new UserRepository();
