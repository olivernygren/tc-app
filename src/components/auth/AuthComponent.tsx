import { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import Button from '@/lib/buttons/Button';
import { NormalTypography } from '@/lib/Typography';
import theme from '@/utils/theme';
import { useUser } from '@/context/UserProvider';
import { User, UserRolesEnum } from '@/utils/types/user';
import { setDoc, doc } from 'firebase/firestore';
import { FirestoreCollectionEnum } from '@/utils/enums/enums';
import { auth, db, provider } from '../../utils/firebase/firebase';

const AuthComponent = () => {
  const { user } = useUser();

  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setSignedInUser(user);
    }
  }, [user]);

  // Sign in with Google
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const input = {
        email: result.user.email ?? '',
        name: result.user.displayName ?? '',
        role: UserRolesEnum.USER,
        createdAt: new Date(),
      };

      await setDoc(doc(db, FirestoreCollectionEnum.USERS, result.user.uid), input);

      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in:', error);
      sessionStorage.removeItem('user');
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignedInUser(null);
      console.log('User signed out');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div style={{
      marginTop: 'auto'
    }}
    >
      {signedInUser ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.spacing.s }}>
          <NormalTypography>
            Welcome,
            {' '}
            {signedInUser.username}
            !
          </NormalTypography>
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
        <Button onClick={signIn}>Sign In with Google</Button>
      )}
    </div>
  );
};

export default AuthComponent;
