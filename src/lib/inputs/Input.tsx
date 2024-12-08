import theme, { devices } from '@/utils/theme';
import React from 'react';
import styled, { css } from 'styled-components';
import { EmphasisTypography, LabelTypography } from '../Typography';

interface InputProps {
  type?: 'email' | 'password' | 'text' | 'number' | 'tel';
  onChange: (event: React.FormEvent<HTMLInputElement>) => void;
  value: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  compact?: boolean;
  label?: string;
  required?: boolean;
  error?: string;
  maxLength?: number;
  autoFocus?: boolean;
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  customFontSize?: number;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onStartIconClick?: () => void;
  onEndIconClick?: () => void;
}

const Input = ({
  type,
  onChange,
  value,
  name,
  disabled,
  placeholder,
  compact,
  label,
  required,
  error,
  maxLength,
  autoFocus,
  fullWidth,
  startIcon,
  endIcon,
  customFontSize,
  onKeyPress,
  onEndIconClick,
  onStartIconClick
}: InputProps) => (
  <LabeledInputContainer fullWidth={fullWidth}>
    {label && <EmphasisTypography variant="s" color={theme.colors.silverSoft}>{label}</EmphasisTypography>}
    <InputContainer
      fullWidth={fullWidth}
      compact={compact}
      hasEndIcon={Boolean(endIcon)}
      hasStartIcon={Boolean(startIcon)}
      disabled={disabled}
      error={Boolean(error)}
    >
      {startIcon && <IconContainer onClick={onStartIconClick}>{startIcon}</IconContainer>}
      <StyledInput
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        compact={compact}
        required={required}
        maxLength={maxLength}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
        onKeyPress={onKeyPress}
        customFontSize={customFontSize}
      />
      {endIcon && <IconContainer onClick={onEndIconClick}>{endIcon}</IconContainer>}
    </InputContainer>
    {error && <LabelTypography variant="s" color={theme.colors.red}>{error}</LabelTypography>}
  </LabeledInputContainer>
);

interface InputContainerProps {
  fullWidth?: boolean;
  compact?: boolean;
  hasStartIcon?: boolean;
  hasEndIcon?: boolean;
  disabled?: boolean;
  error?: boolean;
}

const LabeledInputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxs};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
`;

const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxs};
  min-width: 120px;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  border-radius: ${theme.borderRadius.m};
  border: 1px solid ${({ error }) => (error ? theme.colors.red : theme.colors.charcoalSofter)};
  background-color: ${({ disabled }) => (disabled ? theme.colors.charcoalDark : theme.colors.charcoal)};
  padding: 0 ${({ hasStartIcon, hasEndIcon }) => (hasStartIcon || hasEndIcon ? '10px' : theme.spacing.xs)};
  height: ${({ compact }) => (compact ? '44px' : '52px')};
  transition: border-color 0.2s ease;

  ${({ disabled }) => (disabled ? css`
      cursor: not-allowed;
    ` : css`
      &:hover {
        border-color: ${theme.colors.silver};
      }

      &:focus-within {
        border-color: ${theme.colors.silverDark};
      }
  `)}
`;

const StyledInput = styled.input<InputProps>`
  border: none;
  background-color: transparent !important;
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: ${({ customFontSize }) => customFontSize || 17}px;
  color: ${theme.colors.white};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'text')};

  &::placeholder {
    color: ${({ disabled }) => (disabled ? theme.colors.silverDark : theme.colors.silver)};
  }

  &:disabled {
    color: ${theme.colors.silver};
  }

  @media ${devices.tablet} {
    font-size: 16px;
  }

  /* Override auto-fill styles */
  &:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px ${theme.colors.charcoal} inset !important;
    -webkit-text-fill-color: ${theme.colors.white} !important;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Input;
