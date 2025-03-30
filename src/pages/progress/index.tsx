import React from 'react';
import { Heading } from '@chakra-ui/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'nav'])),
  },
});

const ProgressPage = () => (
  <Heading textStyle="4xl">
    Progress
  </Heading>
);

export default ProgressPage;
