import theme from '@/utils/theme';
import React from 'react';
import { styled } from 'styled-components';
import { HeadingsTypography, NormalTypography } from '@/lib/Typography';
import { useTranslation } from 'next-i18next';
import {
  ClipboardDocumentListIcon, Cog6ToothIcon, FolderOpenIcon, Squares2X2Icon,
  UserIcon, LockClosedIcon
} from '@heroicons/react/24/outline';
import {
  Squares2X2Icon as Solid2X2IconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  FolderOpenIcon as FolderOpenIconSolid,
  ArrowTrendingUpIcon,
  Cog6ToothIcon as Cog6ToothIconSolid,
  UserIcon as UserIconSolid,
  LockOpenIcon
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import { RoutesEnum } from '@/utils/enums/enums';
import { useUser } from '@/context/UserProvider';
import { Divider } from '@/lib/divider/Divider';
import Button from '@/lib/buttons/Button';
import { auth } from '@/utils/firebase/firebaseClient';
import { TokenEnum } from '@/utils/cookies';
import Cookies from 'js-cookie';
import { signOut } from 'firebase/auth';
import SidebarNavButton from './SidebarNavButton';

const Sidebar = () => {
  const { t } = useTranslation('nav');
  const { user, hasAdminRights } = useUser();
  const router = useRouter();

  const getIcon = (href: string) => {
    const iconColor = getIconColor(href);
    const isActive = router.pathname === href;

    switch (href) {
      case RoutesEnum.DASHBOARD:
        if (isActive) {
          return (
            <Solid2X2IconSolid
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <Squares2X2Icon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.PROGRAMS:
        if (isActive) {
          return (
            <ClipboardDocumentListIconSolid
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <ClipboardDocumentListIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.EXERCISES:
        if (isActive) {
          return (
            <FolderOpenIconSolid
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <FolderOpenIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.PROGRESS:
        return (
          <ArrowTrendingUpIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.SETTINGS:
        if (isActive) {
          return (
            <Cog6ToothIconSolid
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <Cog6ToothIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.PROFILE:
        if (isActive) {
          return (
            <UserIconSolid
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <UserIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      case RoutesEnum.ADMIN:
        if (isActive) {
          return (
            <LockOpenIcon
              width={24}
              height={24}
              color={iconColor}
            />
          );
        }
        return (
          <LockClosedIcon
            width={24}
            height={24}
            color={iconColor}
          />
        );
      default:
        return null;
    }
  };

  const getIconColor = (href: string) => {
    if (router.pathname === href) {
      return theme.colors.gold;
    }

    return theme.colors.white;
  };

  const topLinks = [
    {
      text: t('sidebar.dashboard'),
      href: RoutesEnum.DASHBOARD,
      icon: getIcon(RoutesEnum.DASHBOARD),
    },
    {
      text: t('sidebar.programs'),
      href: RoutesEnum.PROGRAMS,
      icon: getIcon(RoutesEnum.PROGRAMS),
    },
    {
      text: t('sidebar.exercises'),
      href: RoutesEnum.EXERCISES,
      icon: getIcon(RoutesEnum.EXERCISES),
    },
    {
      text: t('sidebar.progress'),
      href: RoutesEnum.PROGRESS,
      icon: getIcon(RoutesEnum.PROGRESS),
    },
  ];

  const bottomLinks = [
    {
      text: t('sidebar.settings'),
      href: RoutesEnum.SETTINGS,
      icon: getIcon(RoutesEnum.SETTINGS),
    },
    {
      text: t('sidebar.profile'),
      href: RoutesEnum.PROFILE,
      icon: getIcon(RoutesEnum.PROFILE),
      endItem: user !== null ? (
        <NormalTypography variant="s" color={theme.colors.silver}>
          {`@${user.username}`}
        </NormalTypography>
      ) : undefined
    },
    ...(hasAdminRights ? [{
      text: t('sidebar.admin'),
      href: RoutesEnum.ADMIN,
      icon: getIcon(RoutesEnum.ADMIN),
    }] : []),
  ];

  // Sign out
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
    <Container>
      <HeadingsTypography variant="h1">TC</HeadingsTypography>
      <Links>
        {topLinks.map((link) => (
          <SidebarNavButton
            key={link.href}
            text={link.text}
            icon={link.icon}
            href={link.href}
            isActive={router.pathname === link.href}
          />
        ))}
      </Links>
      <BottomLinks>
        <Divider color={theme.colors.charcoalSofter} />
        {bottomLinks.map((link) => (
          <SidebarNavButton
            key={link.href}
            text={link.text}
            icon={link.icon}
            href={link.href}
            isActive={router.pathname === link.href}
            endItem={link.endItem}
          />
        ))}
      </BottomLinks>
      <PaddedContainer>
        <Button
          onClick={handleSignOut}
          variant="secondary"
          color="charcoal"
          fullWidth
        >
          {t('sidebar.logout')}
        </Button>
      </PaddedContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${theme.colors.charcoalSoft};
  border-radius: ${theme.borderRadius.xl};
  height: 100%;
  max-height: calc(100dvh - 48px);
  padding: ${theme.spacing.m} ${theme.spacing.xs};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  width: 320px;
  position: sticky;
`;

const Links = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
  flex: 1;
`;

const BottomLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

const PaddedContainer = styled.div`
  padding: 0 ${theme.spacing.xxs};
  width: 100%;
`;

export default Sidebar;
