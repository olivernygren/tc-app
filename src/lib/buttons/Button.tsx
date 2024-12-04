'use client';

import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import theme from '@/utils/theme';
import {
  ButtonColorType,
  ButtonSizeType,
  ButtonVariantType,
} from '@/utils/types/elements';
import {
  getBackgroundColor,
  getBorderColor,
  getButtonHeight,
  getButtonIconColor,
  getButtonPadding,
  getButtonTextColor,
  setSvgColor,
} from '@/utils/styles/styleHelpers';
import { MinusIcon } from '@heroicons/react/24/outline';
import { ButtonTypography } from '../Typography';

export interface ButtonProps {
  variant?: ButtonVariantType;
  onClick?: () => void;
  children: any;
  disabled?: boolean;
  fullWidth?: boolean;
  color?: ButtonColorType;
  // textColor?: string;
  size?: ButtonSizeType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
  id?: string;
  type?: 'button' | 'submit';
}

const Button = ({
  variant = 'primary',
  onClick,
  children,
  disabled,
  fullWidth,
  color = 'white',
  // textColor = theme.colors.white,
  size = 'm',
  startIcon,
  loading,
  endIcon,
  id,
  type = 'button',
}: ButtonProps) => {
  const [buttonState, setButtonState] = useState<'regular' | 'hover' | 'active'>('regular');

  return (
    <StyledButton
      variant={variant || 'primary'}
      onClick={() => {
        if (onClick && !disabled && !loading) {
          onClick();
        }
      }}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      color={color}
      type={type}
      size={size}
      onMouseEnter={() => setButtonState('hover')}
      onMouseLeave={() => setButtonState('regular')}
      onMouseDown={() => setButtonState('active')}
      onMouseUp={() => setButtonState('hover')}
    >
      {loading ? (
        <RotationalSpinner>
          <MinusIcon
            width={24}
            height={24}
            fill={getButtonIconColor(
              variant,
              color,
              disabled,
              buttonState === 'regular' ? undefined : buttonState,
            )}
          />
        </RotationalSpinner>
      ) : (
        startIcon
      )}
      <ButtonTypography
        id={id}
        variant={size}
        color={getButtonTextColor(
          variant,
          color,
          disabled,
          buttonState === 'regular' ? undefined : buttonState,
        )}
        align="center"
      >
        {children}
      </ButtonTypography>
      {!loading && endIcon}
    </StyledButton>
  );
};

const StyledButton = styled.button<ButtonProps>`
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'fit-content')};
  padding: ${({ size }) => getButtonPadding(size)};
  height: ${({ size }) => getButtonHeight(size)};
  border-radius: ${({ size }) => (size === 's' ? theme.borderRadius.m : theme.borderRadius.l)};
  background-color: ${({ color, variant, disabled }) => getBackgroundColor(variant, color!, disabled)};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ size }) => (size === 's' ? '6px' : theme.spacing.xxs)};
  transition: all 0.2s ease;

  ${({ variant, color, disabled }) => (variant === 'secondary'
    ? css`
      border-color: ${getBorderColor(color, disabled)};
      border-width: 1.5px;
      border-style: solid;
    `
    : css`
      border: none;
    `)}

  ${({ variant, color, disabled }) => setSvgColor(getButtonIconColor(variant, color, disabled))};

  &:hover {
    /* transform: ${({ disabled }) => (disabled ? 'none' : 'scale(1.02)')}; */
    background-color: ${({ color, variant, disabled }) => getBackgroundColor(variant, color!, disabled, 'hover')};
    ${({ variant, color, disabled }) => variant === 'secondary'
      && css`
        border-color: ${getBorderColor(color, disabled, 'hover')};
      `}
  }

  &:active {
    /* transform: ${({ disabled }) => (disabled ? 'none' : 'scale(0.98)')}; */
    background-color: ${({ color, variant, disabled }) => getBackgroundColor(variant, color!, disabled, 'active')};
    ${({ variant, color, disabled }) => variant === 'secondary'
      && css`
        border-color: ${getBorderColor(color, disabled, 'active')};
      `}
  }

  &:disabled {
    background-color: ${({ color, variant, disabled }) => getBackgroundColor(variant, color!, disabled)};
    border-color: ${({ color, disabled }) => getBorderColor(color, disabled)};
    cursor: not-allowed;
  }
`;

const RotationalSpinner = styled.div`
  animation: spin 1s linear infinite;
  height: 24px;
  width: 24px;

  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Button;
