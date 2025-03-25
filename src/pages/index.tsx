import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';
import theme from '@/utils/theme';
import { EmphasisTypography, HeadingsTypography } from '@/lib/typography/Typography';
import styled from 'styled-components';

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
      <PageContent>
        <PageHeader>
          <HeadingsTypography variant="h1">{t('dashboard')}</HeadingsTypography>
        </PageHeader>
        <EmphasisTypography>{t('common:test')}</EmphasisTypography>
        {users?.map((user: any) => (
          <div key={user.id}>
            <p style={{ color: theme.colors.white }}>{user.email}</p>
          </div>
        ))}
      </PageContent>
    </>
  );
};

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.s};
`;

const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${theme.spacing.m};
  width: 100%;
  border-bottom: 1px solid ${theme.colors.charcoalSoft};
  padding-bottom: ${theme.spacing.xs};
`;

export default HomePage;
