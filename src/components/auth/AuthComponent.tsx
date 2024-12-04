import { useEffect, useState } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import Button from '@/lib/buttons/Button';
import { NormalTypography } from '@/lib/Typography';
import theme from '@/utils/theme';
import { auth, provider } from '../../utils/firebase/firebase';

const AuthComponent = () => {
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  // Sign in with Google
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setSignedInUser(result.user);
      console.log('User signed in:', result.user);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  // Sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setSignedInUser(null);
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setSignedInUser(user);
    });
    return unsubscribe;
  }, []);

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
            {signedInUser.displayName}
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
