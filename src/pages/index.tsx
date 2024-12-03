import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';
import theme from '@/utils/theme';
import { HeadingsTypography } from '@/lib/Typography';

export async function getStaticProps(context: any) {
  return {
    props: {
      users: [],
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

interface HomePageProps {
  users: any;
}

export default function HomePage({ users }: HomePageProps) {
  const { t } = useTranslation('common');

  console.log(users);

  return (
    <>
      <TCHead title="TC | Home" />
      <div>
        <HeadingsTypography variant="h1">Hello, world!</HeadingsTypography>
        <p style={{ color: theme.colors.white }}>{t('test')}</p>
        {users?.map((user: any) => (
          <div key={user.documentId}>
            <p style={{ color: theme.colors.white }}>{user.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
