import { HeadingsTypography } from '@/lib/Typography';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'nav'])),
  },
});

const ProfilePage = () => (
  <HeadingsTypography variant="h1">
    Profile
  </HeadingsTypography>
);

export default ProfilePage;
