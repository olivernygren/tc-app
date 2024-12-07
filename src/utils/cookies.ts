import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

const COOKIE_EXPIRES_DAYS = 14;
const COOKIE_MAX_AGE = 60 * 60 * 24 * COOKIE_EXPIRES_DAYS; // 2 weeks in seconds

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
