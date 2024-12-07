import { FirebaseError } from '@firebase/util';
import * as firebaseAdmin from 'firebase-admin';
import { AuthUser, createAuthUser } from '../auth/authUser';
import { refreshExpiredIdToken } from './refreshExpiredIdToken';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: 'training-central-app',
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const verifyIdToken = async (
  idToken: string,
  refreshToken: string
): Promise<AuthUser | undefined> => {
  let firebaseUser;
  let authUser: AuthUser;
  try {
    firebaseUser = await firebaseAdmin.auth().verifyIdToken(idToken);
    const signInProvider = firebaseUser.firebase.sign_in_provider;
    authUser = createAuthUser({
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      provider: signInProvider,
    }, idToken, refreshToken);
  } catch (e) {
    const firebaseError = e as FirebaseError;
    if (['auth/id-token-expired', 'auth/argument-error'].includes(firebaseError.code)) {
      try {
        const newIdToken = await refreshExpiredIdToken(refreshToken);
        firebaseUser = await firebaseAdmin.auth().verifyIdToken(newIdToken);
        const signInProvider = firebaseUser.firebase.sign_in_provider;

        authUser = createAuthUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          provider: signInProvider,
        }, newIdToken, refreshToken);
      } catch {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  return authUser;
};

const adminDb = firebaseAdmin.firestore();

// eslint-disable-next-line import/prefer-default-export
export { verifyIdToken, adminDb };
