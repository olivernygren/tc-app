import { fetchSignInMethodsForEmail, signInWithPopup, UserCredential } from 'firebase/auth';
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
    let isNewUser;
    let userFromDB: User | undefined;
    const result = await signInWithPopup(auth, provider);
    const email = result.user.email ?? '';

    // Check if the email is already associated with an existing user
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);
    if (signInMethods.length === 0) {
      isNewUser = true;
    } else {
      isNewUser = false;
      const userDoc = await getDoc(doc(clientDb, FirestoreCollectionEnum.USERS, result.user.uid));
      if (userDoc.exists()) {
        userFromDB = withDocumentIdOnSingleObject(userDoc);
      }
    }

    const cookie = await convertUserToCookie(result.user);

    return {
      existingUser: userFromDB,
      userCredential: result,
      isNewUser,
      cookie,
      error: undefined,
    } as AuthResults;
  } catch (error) {
    return {
      existingUser: undefined,
      userCredential: undefined,
      isNewUser: undefined,
      cookie: undefined,
      error: JSON.stringify(error),
    } as AuthResults;
  }
};
