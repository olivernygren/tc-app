import { adminDb } from '@/utils/firebase/firebaseAdmin';
import { withDocumentIdOnObjectsInArray } from '@/utils/firebase/firebaseHelpers';
import { Exercise } from '@/utils/types/exercise';
import { UserRolesEnum } from '@/utils/types/user';

export const getAllExercises = async (userId: string) => {
  if (!userId) {
    return null;
  }

  try {
    const exercises = [];
    const userDoc = await adminDb.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      return null;
    }

    if (userDoc.data()?.role === UserRolesEnum.ADMIN) {
      const allExercises = await adminDb.collection('exercises').get();
      exercises.push(withDocumentIdOnObjectsInArray<Exercise>(allExercises.docs));
    }

    const userExercises = await adminDb
      .collection('exercises')
      .where('creatorId', '==', userId)
      .get();

    if (!userExercises.empty) {
      exercises.push(withDocumentIdOnObjectsInArray<Exercise>(userExercises.docs));
    }

    const removedDuplicates = exercises.flat().filter((exercise, index, self) => index === self.findIndex((t) => (
      t.documentId === exercise.documentId
    )));
    const sortedExercises = removedDuplicates.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    return sortedExercises;
  } catch (error) {
    return [];
  }
};
