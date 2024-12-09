import { EmphasisTypography } from '@/lib/Typography';
import theme from '@/utils/theme';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface SidebarNavButtonProps {
  text: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
  endItem?: React.ReactNode;
}

const SidebarNavButton = ({
  text, icon, href, isActive, endItem,
}: SidebarNavButtonProps) => (
  <Link href={href}>
    <StyledNavButton isActive={isActive}>
      {icon}
      <EmphasisTypography
        className="button-text"
        color={isActive ? theme.colors.gold : theme.colors.white}
      >
        {text}
      </EmphasisTypography>
      {endItem && endItem}
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

  .button-text {
    flex: 1;
  }

  &:hover {
    background-color: ${theme.colors.charcoalSofter};
    transform: scale(${({ isActive }) => (isActive ? 1 : 1.02)});
  }
`;

export default SidebarNavButton;
