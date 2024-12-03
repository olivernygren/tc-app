import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { FirestoreCollectionEnum } from '../enums/enums';
import { ExerciseInput } from '../types/exercise';

// export const getUsers = async () => {
//   try {
//     const usersCollection = collection(db, FirestoreCollectionEnum.USERS);
//     const workoutSnapshot = await getDocs(usersCollection);
//     return withDocumentIdOnObjectsInArray(workoutSnapshot.docs);
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// };

// eslint-disable-next-line import/prefer-default-export
export const createExercise = async (
  exercise: ExerciseInput,
  onComplete?: () => void,
) => {
  try {
    const exercisesCollection = collection(
      db,
      FirestoreCollectionEnum.EXERCISES,
    );
    await addDoc(exercisesCollection, exercise);
    if (onComplete) {
      onComplete();
    }
  } catch (error) {
    console.error(error);
  }
};
