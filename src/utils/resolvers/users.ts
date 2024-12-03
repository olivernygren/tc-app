import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FirestoreCollectionEnum } from '../enums/enums';
import { withDocumentIdOnObjectsInArray } from '../firebase/firebaseHelpers';

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
