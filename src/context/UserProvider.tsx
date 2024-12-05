import React, {
  createContext, useState, useEffect, useContext,
  useMemo,
} from 'react';
import { getDoc, doc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import Cookies from 'js-cookie';
import { User } from '@/utils/types/user';
import { auth, db } from '@/utils/firebase/firebase';
import { withDocumentIdOnSingleObject } from '@/utils/firebase/firebaseHelpers';
import { FirestoreCollectionEnum } from '../utils/enums/enums';

interface UserContextProps {
  user: User | null;
  hasAdminRights: boolean;
}

const UserContext = createContext<UserContextProps>({ user: null, hasAdminRights: false });

export const useUser = () => useContext(UserContext);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [hasAdminRights, setHasAdminRights] = useState<boolean>(() => {
    const storedUser = Cookies.get('user');
    return storedUser ? JSON.parse(storedUser).role === 'ADMIN' : false;
  });
  const [loading, setLoading] = useState<boolean>(true);

  const contextValue = useMemo(() => ({ user, hasAdminRights }), [user, hasAdminRights]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userObj) => {
      if (userObj) {
        const userDocRef = doc(db, FirestoreCollectionEnum.USERS, userObj.uid);
        console.log(userObj.uid);

        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userWithDocId = withDocumentIdOnSingleObject<User>(userDocSnap);
          setUser(userWithDocId);
          Cookies.set('user', JSON.stringify(userWithDocId), { expires: 365 * 3, secure: true, sameSite: 'strict' });
          if (userWithDocId?.role === 'ADMIN') {
            setHasAdminRights(true);
          }
        } else {
          console.log('No such user!');
        }
      } else {
        setUser(null);
        setHasAdminRights(false);
        Cookies.remove('user');
      }
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (loading && !user) {
    return children as React.ReactElement;
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
