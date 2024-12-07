import React from 'react';
import { css, styled } from 'styled-components';
import theme from '@/utils/theme';

export type IconButtonColorsPseudoClass = {
  normal?: string;
  hover?: string;
  active?: string;
  disabled?: string;
};

export type IconButtonVariant = 'simple' | 'border' | 'background';
export type IconButtonShape = 'round' | 'long';

interface IconButtonProps {
  children: React.ReactNode;
  colors?: IconButtonColorsPseudoClass;
  onClick: () => void;
  disabled?: boolean;
  backgroundColors?: IconButtonColorsPseudoClass;
  fitContent?: boolean;
  variant?: IconButtonVariant;
  shape?: IconButtonShape;
}

interface StyledIconButtonProps {
  variant?: IconButtonVariant;
  colors?: IconButtonColorsPseudoClass;
  backgroundColors?: IconButtonColorsPseudoClass;
  fitContent?: boolean;
  shape?: IconButtonShape;
}

const IconButton = ({
  children, onClick, disabled, colors, backgroundColors, fitContent = false, variant = 'simple', shape = 'long',
}: IconButtonProps) => (
  <StyledIconButton
    disabled={disabled}
    colors={colors}
    backgroundColors={backgroundColors}
    onClick={onClick}
    fitContent={fitContent}
    variant={variant}
    shape={shape}
  >
    {children}
  </StyledIconButton>
);

const StyledIconButton = styled.button<StyledIconButtonProps>`
  border: ${({ variant }) => (variant === 'border' ? `1px solid ${theme.colors.charcoalSofter}` : 'none')};
  border-radius: 50px;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ variant, backgroundColors }) => (variant === 'background' ? backgroundColors?.normal : 'transparent')};
  transition: all 0.2s ease;

  ${({ fitContent, shape }) => {
    if (fitContent) {
      return css`
        padding: 0;
      `;
    }
    if (shape === 'round') {
      return css`
        border-radius: 50%;
        padding: ${theme.spacing.xxs};
      `;
    }
    return css`
      border-radius: 50px;
      padding: ${theme.spacing.xxs} ${theme.spacing.s};
    `;
  }}

  &:hover {
    ${({ backgroundColors }) => (backgroundColors?.hover !== undefined ? `background-color: ${backgroundColors.hover}` : '')};
  }

  &:active {
    ${({ backgroundColors }) => (backgroundColors?.active !== undefined ? `background-color: ${backgroundColors.active}` : '')};
  }
`;

export default IconButton;
