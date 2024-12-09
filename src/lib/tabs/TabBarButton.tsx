import React from 'react';
import styled, { css } from 'styled-components';
import theme from '@/utils/theme';
import { EmphasisTypography, NormalTypography } from '../Typography';

interface TabBarButtonProps {
  text: string;
  endIcon?: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const TabBarButton = ({
  text, endIcon, isActive, onClick,
}: TabBarButtonProps) => (
  <StyledTabBarButton onClick={onClick} isActive={isActive}>
    <TabTextContainer>
      <EmphasisTypography variant="s" color={isActive ? theme.colors.gold : theme.colors.silver}>
        {text}
      </EmphasisTypography>
      {endIcon}
    </TabTextContainer>
    {isActive && <ActiveIndicator />}
  </StyledTabBarButton>
);

const StyledTabBarButton = styled.div<{ isActive?: boolean }>`
  width: fit-content;
  padding: ${theme.spacing.xs} 0;
  cursor: pointer;
  border-top-right-radius: ${theme.borderRadius.s};
  border-top-left-radius: ${theme.borderRadius.s};
  background-color: transparent;
  position: relative;
  z-index: 1;
  transition: all 0.2s ease;
  box-shadow: inset 0 -1px 0 0 ${theme.colors.charcoalSofter};
  
  ${({ isActive }) => !isActive && css`
    &:hover {
      /* background-color: ${theme.colors.charcoalSofter};  */
      ${NormalTypography} {
        color: ${theme.colors.white};
      }
    }
  `}
`;

const TabTextContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxs};
  padding: 0 ${theme.spacing.xxs};
`;

const ActiveIndicator = styled.div`
  width: 100%;
  height: 3px;
  background-color: ${theme.colors.gold};
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-top-right-radius: ${theme.borderRadius.s};
  border-top-left-radius: ${theme.borderRadius.s};
  animation: fadeInIndicator .75s ease;

  @keyframes fadeInIndicator {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default TabBarButton;
