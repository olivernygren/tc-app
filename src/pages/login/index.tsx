import AuthComponent from '@/components/auth/AuthComponent';
import TCHead from '@/components/head/TCHead';
import { HeadingsTypography, NormalTypography } from '@/lib/Typography';
import { getUserById } from '@/utils/resolvers/server-side/users';
import theme from '@/utils/theme';
import { User } from '@/utils/types/user';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import styled from 'styled-components';

export const getServerSideProps = async (context: any) => {
  const userCookie = context.req.cookies.user;
  console.log('userCookie', userCookie);

  const user = await getUserById(userCookie);

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'login'])),
    }
  };
};

interface LoginPageProps {
  user: User | null;
}

const LoginPage = ({ user }: LoginPageProps) => {
  const { t } = useTranslation('login');

  console.log('user', user);

  return (
    <>
      <TCHead title="Logga in" />
      <Layout>
        <HeadingsTypography variant="h1">{t('login')}</HeadingsTypography>
        <NormalTypography>{user?.id}</NormalTypography>
        <NormalTypography>{user?.name}</NormalTypography>
        <AuthComponent />
      </Layout>
    </>
  );
};

const Layout = styled.div`
  height: 100dvh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${theme.spacing.m}
`;

export default LoginPage;
