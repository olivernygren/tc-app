import { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut
} from 'firebase/auth';
import Button from '@/lib/buttons/Button';
import { NormalTypography } from '@/lib/Typography';
import theme from '@/utils/theme';
import { useUser } from '@/context/UserProvider';
import { User, UserRolesEnum } from '@/utils/types/user';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { FirestoreCollectionEnum } from '@/utils/enums/enums';
import Cookies from 'js-cookie';
import { CookieKey, setCookie, TokenEnum } from '@/utils/cookies';
import { signInWithGoogle } from '@/utils/firebase/authHelpers';
import { withDocumentIdOnSingleObject } from '@/utils/firebase/firebaseHelpers';
import { auth, clientDb, provider } from '../../utils/firebase/firebaseClient';

const AuthComponent = () => {
  const { user } = useUser();

  const [signedInUser, setSignedInUser] = useState<User | null>(null);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    if (user) {
      setSignedInUser(user);
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    const {
      existingUser, cookie, error, isNewUser, userCredential,
    } = await signInWithGoogle();

    if (error || !cookie) {
      setAuthError(error ?? 'auth error');
      return;
    }

    if ((existingUser || userCredential) && cookie) {
      if (isNewUser && userCredential) {
        const input = {
          email: userCredential.user.email ?? '',
          name: userCredential.user.displayName ?? '',
          role: UserRolesEnum.USER,
          createdAt: new Date().toISOString(),
        };

        await setDoc(doc(clientDb, FirestoreCollectionEnum.USERS, userCredential.user.uid), input);
        const newlyAddedUser = await getDoc(doc(clientDb, FirestoreCollectionEnum.USERS, userCredential.user.uid));

        if (newlyAddedUser.exists()) {
          const newlyAddedUserWithDocId = withDocumentIdOnSingleObject<User>(newlyAddedUser);
          setSignedInUser(newlyAddedUserWithDocId);
        }
      }

      if (!isNewUser && existingUser) {
        setSignedInUser(existingUser);
      }

      setCookie(CookieKey.TOKEN, cookie, undefined);
    }
  };

  const createAccountWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const input = {
        email: result.user.email ?? '',
        name: result.user.displayName ?? '',
        role: UserRolesEnum.USER,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(clientDb, FirestoreCollectionEnum.USERS, result.user.uid), input);

      Cookies.set('user', result.user.uid);
    } catch (error) {
      console.error('Error creating account:', error);
      Cookies.remove('user');
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignedInUser(null);
      Cookies.remove(TokenEnum.ID_TOKEN);
      Cookies.remove(TokenEnum.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div>
      {signedInUser ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.s }}>
          <Button
            onClick={handleSignOut}
            variant="secondary"
            color="charcoal"
            fullWidth
          >
            Sign Out
          </Button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.s }}>
          <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
          <Button variant="secondary" color="charcoal" onClick={createAccountWithGoogle}>Create Account with Google</Button>
          {authError && (
            <NormalTypography color={theme.colors.red}>
              {authError}
            </NormalTypography>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthComponent;
