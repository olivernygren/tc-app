import { signInWithPopup, UserCredential } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { auth, clientDb, provider } from './firebaseClient';
import { convertUserToCookie, TokenCookie } from '../cookies';
import { FirestoreCollectionEnum } from '../enums/enums';
import { withDocumentIdOnSingleObject } from './firebaseHelpers';
import { User } from '../types/user';

export interface AuthResults {
  existingUser?: User;
  userCredential?: UserCredential;
  cookie?: TokenCookie;
  isNewUser?: boolean;
  error?: string;
}

export const signInWithGoogle = async () => {
  try {
    let isNewUser: boolean = false;
    let userFromDB: User | undefined;
    const result = await signInWithPopup(auth, provider);

    // Check if the user document exists in Firestore
    const userDoc = await getDoc(doc(clientDb, FirestoreCollectionEnum.USERS, result.user.uid));
    if (userDoc.exists()) {
      isNewUser = false;
      userFromDB = withDocumentIdOnSingleObject(userDoc);
    } else {
      isNewUser = true;
    }

    const cookie = await convertUserToCookie(result.user);

    return {
      existingUser: userFromDB,
      userCredential: result,
      isNewUser,
      cookie,
      error: undefined,
    } as AuthResults;
  } catch (error: any) {
    return {
      existingUser: undefined,
      userCredential: undefined,
      isNewUser: undefined,
      cookie: undefined,
      error: error.code,
    } as AuthResults;
  }
};
