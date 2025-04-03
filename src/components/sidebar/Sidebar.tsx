import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RoutesEnum } from '@/utils/enums/enums';
import { useUser } from '@/context/UserProvider';
import { auth } from '@/utils/firebase/firebaseClient';
import { TokenEnum } from '@/utils/cookies';
import Cookies from 'js-cookie';
import { signOut } from 'firebase/auth';
import {
  Flex, For, Heading, Stack, StackSeparator, Text
} from '@chakra-ui/react';
import {
  FolderOpen, LayoutGrid, Lock, NotebookPen, Settings, TrendingUp,
  User
} from 'lucide-react';
import Button from '@/lib/buttons/Button';
import SidebarNavButton from './SidebarNavButton';

const Sidebar = () => {
  const { t } = useTranslation('nav');
  const { user, hasAdminRights } = useUser();
  const router = useRouter();

  const getIconColor = (href: string) => (router.pathname === href ? '#5eead4' : '#ffffff');
  const iconSize = 20;
  const iconStrokeWidth = 1.5;

  const topLinks = [
    {
      text: t('sidebar.dashboard'),
      href: RoutesEnum.DASHBOARD,
      icon: <LayoutGrid strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.DASHBOARD)} />
    },
    {
      text: t('sidebar.programs'),
      href: RoutesEnum.PROGRAMS,
      icon: <NotebookPen strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.PROGRAMS)} />
    },
    {
      text: t('sidebar.exercises'),
      href: RoutesEnum.EXERCISES,
      icon: <FolderOpen strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.EXERCISES)} />
    },
    {
      text: t('sidebar.progress'),
      href: RoutesEnum.PROGRESS,
      icon: <TrendingUp strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.PROGRESS)} />
    },
  ];

  const bottomLinks = [
    {
      text: t('sidebar.settings'),
      href: RoutesEnum.SETTINGS,
      icon: <Settings strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.SETTINGS)} />
    },
    {
      text: t('sidebar.profile'),
      href: RoutesEnum.PROFILE,
      icon: <User strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.PROFILE)} />,
      endItem: user ? (
        <Text textStyle="sm" color="gray.500">
          {`@${user.username}`}
        </Text>
      ) : undefined,
    },
    ...(hasAdminRights
      ? [
        {
          text: t('sidebar.admin'),
          href: RoutesEnum.ADMIN,
          icon: <Lock strokeWidth={iconStrokeWidth} size={iconSize} color={getIconColor(RoutesEnum.ADMIN)} />,
        },
      ]
      : []),
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      Cookies.remove(TokenEnum.ID_TOKEN);
      Cookies.remove(TokenEnum.REFRESH_TOKEN);
      Cookies.remove('user');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  return (
    <Stack
      separator={<StackSeparator color="gray.800" />}
      py={6}
      bg="bg.subtle"
      height="100vh"
      gap={4}
      borderRightWidth={1}
      borderRightColor="gray.800"
    >
      <Flex px={4} mb={2}>
        <Heading size="2xl">
          Training Central
        </Heading>
      </Flex>
      <Stack gap={2} flexGrow={1} px={4}>
        <For each={topLinks}>
          {(link) => (
            <SidebarNavButton
              key={link.href}
              text={link.text}
              href={link.href}
              icon={link.icon}
              isActive={router.pathname === link.href}
            />
          )}
        </For>
      </Stack>
      <Stack gap={2} px={4}>
        <For each={bottomLinks}>
          {(link) => (
            <SidebarNavButton
              key={link.href}
              text={link.text}
              href={link.href}
              icon={link.icon}
              isActive={router.pathname === link.href}
              endItem={link.endItem}
            />
          )}
        </For>
        <Button
          variant="outline"
          size="lg"
          mt={4}
          onClick={handleSignOut}
        >
          {t('sidebar.logout')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default Sidebar;
