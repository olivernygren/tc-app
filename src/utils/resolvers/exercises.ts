import { addDoc, collection } from 'firebase/firestore';
import { FirestoreCollectionEnum } from '../enums/enums';
import { ExerciseInput } from '../types/exercise';
import { clientDb } from '../firebase/firebaseClient';

// eslint-disable-next-line import/prefer-default-export
export const createExercise = async (
  exercise: ExerciseInput,
  onComplete?: () => void,
) => {
  try {
    const exercisesCollection = collection(
      clientDb,
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
