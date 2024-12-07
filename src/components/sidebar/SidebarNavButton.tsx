import { NormalTypography } from '@/lib/Typography';
import theme from '@/utils/theme';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface SidebarNavButtonProps {
  text: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
}

const SidebarNavButton = ({
  text, icon, href, isActive
}: SidebarNavButtonProps) => (
  <Link href={href}>
    <StyledNavButton isActive={isActive}>
      {icon}
      <NormalTypography color={isActive ? theme.colors.gold : theme.colors.white}>
        {text}
      </NormalTypography>
    </StyledNavButton>
  </Link>
);

const StyledNavButton = styled.div<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  padding: 0 ${theme.spacing.xs};
  height: 52px;
  border-radius: 10px;
  cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
  transition: all 0.15s ease-in-out;
  background-color: ${({ isActive }) => (isActive ? theme.colors.charcoalSofter : 'transparent')};

  &:hover {
    background-color: ${theme.colors.charcoalSofter};
    transform: scale(${({ isActive }) => (isActive ? 1 : 1.02)});
  }
`;

export default SidebarNavButton;
