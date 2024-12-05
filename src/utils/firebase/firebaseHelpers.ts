import {
  QueryDocumentSnapshot,
  DocumentData,
  DocumentSnapshot,
} from 'firebase/firestore';

export const withDocumentIdOnObjectsInArray = <T>(
  docs: QueryDocumentSnapshot<DocumentData>[],
): T[] => docs.map((doc) => ({
    ...(doc.data() as T),
    documentId: doc.id,
  }));

export const withDocumentIdOnSingleObject = <T>(
  docSnap: DocumentSnapshot,
): T & { documentId: string } => ({
    ...(docSnap.data() as T),
    documentId: docSnap.id,
  });
