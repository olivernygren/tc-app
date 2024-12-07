export type AuthUser = {
  uid: string
  email: string
  idToken: string
  refreshToken: string
  provider: string
};

export type FirebaseUserDetails = {
  uid: string
  email?: string
  provider: string
};

export const createAuthUser = (
  data: FirebaseUserDetails,
  idToken: string,
  refreshToken: string
): AuthUser => {
  if (!data.email) {
    throw new Error('Email needs to be provided!');
  }
  return ({
    uid: data.uid,
    email: data.email,
    idToken,
    refreshToken,
    provider: data.provider,
  });
};
