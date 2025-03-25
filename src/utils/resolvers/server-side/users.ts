import { adminDb } from '@/utils/firebase/firebaseAdmin';

export const getUserById = async (userId: string) => {
  if (!userId) {
    return null;
  }

  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    return null;
  }
};
