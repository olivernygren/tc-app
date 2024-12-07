import theme from '@/utils/theme';
import React from 'react';
import styled from 'styled-components';

interface TabBarProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  bottomBorder?: boolean;
}

const TabBar = ({
  children, fullWidth = true, bottomBorder = true
}: TabBarProps) => (
  <StyledTabBar fullWidth={fullWidth} bottomBorder={bottomBorder}>
    {children}
  </StyledTabBar>
);

const StyledTabBar = styled.div<TabBarProps>`
  display: flex;
  align-items: flex-end;
  gap: ${theme.spacing.xxs};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  box-shadow: ${({ bottomBorder }) => (bottomBorder ? `inset 0 -1px 0 0 ${theme.colors.charcoalSofter}` : 'none')};
`;

export default TabBar;
