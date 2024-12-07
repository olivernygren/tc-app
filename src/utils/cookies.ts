import { User } from 'firebase/auth';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const COOKIE_EXPIRES_DAYS = 365 * 3; // 3 years
const COOKIE_MAX_AGE = 60 * 60 * 24 * COOKIE_EXPIRES_DAYS; // 3 years in seconds

export interface TokenCookie {
  idToken: string;
  refreshToken: string;
}

export enum CookieKey {
  TOKEN = 'token',
}

export enum TokenEnum {
  ID_TOKEN = 'idToken',
  REFRESH_TOKEN = 'refreshToken',
}

export const getCookie = (key: string, parse: boolean, context?: GetServerSidePropsContext) => {
  const cookies = context ? nookies.get(context) : nookies.get(null);
  const cookiesKeys = Object.keys(cookies);
  const isEmpty = cookiesKeys.length === 0;

  if (!isEmpty && cookiesKeys.includes(key)) {
    return parse ? JSON.parse(cookies[key]) : cookies[key];
  }

  return {};
};

export const deleteCookie = (key: string, context?: GetServerSidePropsContext) => {
  nookies.destroy(context, key, {
    path: '/'
  });
};

export const setRawCookie = (key: string, data: string, context?: GetServerSidePropsContext) => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + COOKIE_EXPIRES_DAYS);

  nookies.destroy(context, key);
  nookies.set(context, key, data, {
    path: '/',
    expires: tomorrow,
    maxAge: COOKIE_MAX_AGE
  });
};

export const setCookie = (key: string, data: any, context?: GetServerSidePropsContext) => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + COOKIE_EXPIRES_DAYS);

  if (key === CookieKey.TOKEN) {
    const idTokenKey = `${key}_${TokenEnum.ID_TOKEN}`;
    const refreshTokenKey = `${key}_${TokenEnum.REFRESH_TOKEN}`;

    nookies.destroy(context, idTokenKey);
    nookies.destroy(context, refreshTokenKey);

    const { idToken, refreshToken } = data as TokenCookie;
    nookies.set(context, idTokenKey, idToken, {
      path: '/',
      expires: tomorrow,
      maxAge: COOKIE_MAX_AGE,
    });
    nookies.set(context, refreshTokenKey, refreshToken, {
      path: '/',
      expires: tomorrow,
      maxAge: COOKIE_MAX_AGE,
    });
  } else {
    nookies.destroy(context, key);
    nookies.set(context, key, JSON.stringify(data), {
      path: '/',
      expires: tomorrow,
      maxAge: COOKIE_MAX_AGE,
    });
  }
};

export const convertUserToCookie = async (user: User | null): Promise<TokenCookie> => {
  if (!user) {
    throw new Error('User is undefined');
  }

  const data: TokenCookie = {
    idToken: await user?.getIdToken(),
    refreshToken: user?.refreshToken,
  };

  return data;
};
