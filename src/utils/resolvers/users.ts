import {
  collection, doc, getDocs, setDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FirestoreCollectionEnum } from '../enums/enums';
import { withDocumentIdOnObjectsInArray } from '../firebase/firebaseHelpers';
import { UpdateUserPreferencesInput } from '../types/user';

// eslint-disable-next-line import/prefer-default-export
export const getUsers = async () => {
  try {
    const usersCollection = collection(db, FirestoreCollectionEnum.USERS);
    const workoutSnapshot = await getDocs(usersCollection);
    return withDocumentIdOnObjectsInArray(workoutSnapshot.docs);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateUserPreferences = async (userId: string, preferences: UpdateUserPreferencesInput) => {
  if (!userId || !preferences) {
    console.error('Invalid userId or preferences');
    return false;
  }

  const updatedPreferences = {
    ...(preferences.language && { language: preferences.language }),
    ...(preferences.weightUnit && { weightUnit: preferences.weightUnit }),
  };

  try {
    const userDoc = doc(db, FirestoreCollectionEnum.USERS, userId);
    await setDoc(userDoc, { preferences: updatedPreferences }, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating user preferences:', error);
    return false;
  }
};
