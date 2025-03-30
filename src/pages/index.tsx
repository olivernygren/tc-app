import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';
import theme from '@/utils/theme';
import { Heading, Stack, Text } from '@chakra-ui/react';

export async function getStaticProps(context: any) {
  return {
    props: {
      users: [],
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'dashboard'])),
    },
  };
}

interface HomePageProps {
  users: any;
}

export const HomePage = ({ users }: HomePageProps) => {
  const { t } = useTranslation(['dashboard', 'common']);

  return (
    <>
      <TCHead title="TC | Home" />
      <Stack gap={4}>
        <Heading textStyle="4xl">{t('dashboard')}</Heading>
        <Text>{t('common:test')}</Text>
        {users?.map((user: any) => (
          <div key={user.id}>
            <p style={{ color: theme.colors.white }}>{user.email}</p>
          </div>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
