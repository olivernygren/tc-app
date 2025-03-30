import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import Button from '@/lib/buttons/Button';
import { getUserById } from '@/utils/resolvers/server-side/users';
import { GenderEnum, User } from '@/utils/types/user';
import {
  Flex, Heading, Separator, Stack, Text
} from '@chakra-ui/react';
import { Mars, Pencil, Venus } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

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
        return <Mars size={20} color="white" />;
      case GenderEnum.FEMALE:
        return <Venus size={20} color="white" />;
      default:
        return <Mars size={20} color="white" />;
    }
  };

  return (
    <>
      <TCHead title={t('meta-title')} />
      <PageLayout>
        <Heading textStyle="4xl">
          {t('profile')}
        </Heading>
        <Separator />
        {user !== null && (
          <Stack gap={6}>
            <Flex w="100%" justifyContent="space-between" alignItems="center">
              <Heading textStyle="2xl">
                {t('account-info')}
              </Heading>
              <Button
                variant="outline"
                size="sm"
              >
                {t('edit')}
                <Pencil strokeWidth={1.5} size={16} color="white" />
              </Button>
            </Flex>
            <Stack gap={2}>
              <Stack gap={1}>
                <Text textStyle="xs" color="fg.muted">{t('name').toUpperCase()}</Text>
                <Text>{user.name}</Text>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Stack gap={1}>
                <Text textStyle="xs" color="fg.muted">{t('username').toUpperCase()}</Text>
                <Text>{user.username}</Text>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Stack gap={1}>
                <Text textStyle="xs" color="fg.muted">{t('email').toUpperCase()}</Text>
                <Text>{user.email}</Text>
              </Stack>
            </Stack>
            <Stack gap={2}>
              <Stack gap={1}>
                <Text textStyle="xs" color="fg.muted">{t('gender').toUpperCase()}</Text>
                <Flex alignItems="center" gap={2}>
                  <Text>{t(`genders.${user.gender}`)}</Text>
                  {getGenderIcon()}
                </Flex>
              </Stack>
            </Stack>
          </Stack>
        )}
      </PageLayout>
    </>
  );
};

export default ProfilePage;
