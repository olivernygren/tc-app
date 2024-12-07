import { adminDb } from '@/utils/firebase/firebaseAdmin';

export const getUserById = async (userId: string) => {
  if (!userId) {
    console.error('Invalid userId');
    return null;
  }

  try {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      console.error('User not found');
      return null;
    }
    return { id: userDoc.id, ...userDoc.data() };
  } catch (error) {
    console.error('🔴 Error fetching user:', error);
    return null;
  }
};
