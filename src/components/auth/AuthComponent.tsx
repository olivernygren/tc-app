import { useEffect, useState } from 'react';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import theme from '@/utils/theme';
import Button from '@/lib/buttons/Button';
import { auth } from '../../utils/firebase/firebase';

const AuthComponent = () => {
  const [signedInUser, setSignedInUser] = useState<User | null>(null);

  const provider = new GoogleAuthProvider();

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
    <div>
      {signedInUser ? (
        <div>
          <p style={{ color: theme.colors.white }}>
            Welcome, {signedInUser.displayName}!
          </p>
          <Button onClick={handleSignOut}>Sign Out</Button>
        </div>
      ) : (
        <Button onClick={signIn}>Sign In with Google</Button>
      )}
    </div>
  );
};

export default AuthComponent;
