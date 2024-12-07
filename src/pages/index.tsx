import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';
import theme from '@/utils/theme';
import { EmphasisTypography, HeadingsTypography } from '@/lib/Typography';

export async function getStaticProps(context: any) {
  return {
    props: {
      users: [],
      ...(await serverSideTranslations(context.locale, ['common', 'nav'])),
    },
  };
}

interface HomePageProps {
  users: any;
}

export const HomePage = ({ users }: HomePageProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      <TCHead title="TC | Home" />
      <div>
        <HeadingsTypography variant="h1">Training Central</HeadingsTypography>
        <EmphasisTypography>{t('test')}</EmphasisTypography>
        {users?.map((user: any) => (
          <div key={user.id}>
            <p style={{ color: theme.colors.white }}>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePage;
