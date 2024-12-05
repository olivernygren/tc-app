import { HeadingsTypography } from '@/lib/Typography';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'nav'])),
  },
});

const SettingsPage = () => (
  <HeadingsTypography variant="h1">
    Settings
  </HeadingsTypography>
);

export default SettingsPage;
