import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/lib/buttons/Button';
import { Divider } from '@/lib/divider/Divider';
import { LabelTypography, HeadingsTypography, NormalTypography } from '@/lib/Typography';
import { getUserById } from '@/utils/resolvers/server-side/users';
import theme from '@/utils/theme';
import { GenderEnum, User } from '@/utils/types/user';
import { PencilIcon } from '@heroicons/react/24/outline';
import { GenderFemale, GenderMale } from '@phosphor-icons/react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import styled from 'styled-components';

export const getServerSideProps = async (context: any) => {
  const userCookie = context.req.cookies.user;
  const user = await getUserById(userCookie);

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'profile'])),
    },
  };
};

interface ProfilePageProps {
  user: User | null;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
  const { t } = useTranslation('profile');

  const getGenderIcon = () => {
    switch (user?.gender) {
      case GenderEnum.MALE:
        return <GenderMale size={20} color={theme.colors.white} />;
      case GenderEnum.FEMALE:
        return <GenderFemale size={20} color={theme.colors.white} />;
      default:
        return <GenderMale size={20} color={theme.colors.white} />;
    }
  };

  return (
    <>
      <TCHead title={t('meta-title')} />
      <PageLayout>
        <Header>
          <HeadingsTypography variant="h1">
            {t('profile')}
          </HeadingsTypography>
          <Button
            variant="secondary"
            color="charcoal"
            size="s"
            endIcon={<PencilIcon width={16} height={16} color={theme.colors.white} />}
          >
            {t('edit')}
          </Button>
        </Header>
        <Divider />
        {user !== null && (
          <Content>
            <HeadingsTypography variant="h5">
              {t('account-info')}
            </HeadingsTypography>
            <ProfileInfoItems>
              <ProfileInfoItem>
                <LabelTypography variant="s" color={theme.colors.silver}>{t('name').toUpperCase()}</LabelTypography>
                <NormalTypography>{user.name}</NormalTypography>
              </ProfileInfoItem>
            </ProfileInfoItems>
            <ProfileInfoItems>
              <ProfileInfoItem>
                <LabelTypography variant="s" color={theme.colors.silver}>{t('email').toUpperCase()}</LabelTypography>
                <NormalTypography>{user.email}</NormalTypography>
              </ProfileInfoItem>
            </ProfileInfoItems>
            <ProfileInfoItems>
              <ProfileInfoItem>
                <LabelTypography variant="s" color={theme.colors.silver}>{t('gender').toUpperCase()}</LabelTypography>
                <GenderContainer>
                  <NormalTypography>{t(`genders.${user.gender}`)}</NormalTypography>
                  {getGenderIcon()}
                </GenderContainer>
              </ProfileInfoItem>
            </ProfileInfoItems>
          </Content>
        )}
      </PageLayout>
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  padding-top: ${theme.spacing.xs};
`;

const ProfileInfoItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.s};
`;

const ProfileInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxs};
`;

const GenderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxs};
`;

export default ProfilePage;
