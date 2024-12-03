import styled from 'styled-components';
import {
  ButtonColorType,
  ButtonSizeType,
  ButtonVariantType,
  ModalSizeType,
} from '@/utils/types/elements';
import theme, { devices } from '../theme';

export const setSvgColor = (color: string): string => `
  svg {
    fill: ${color};

    & path[fill] {
      fill: ${color};
    }

    & path[stroke] {
      stroke: ${color};
    }

    & circle[fill] {
      fill: ${color};
    }    
  }
`;

export const getBackgroundColor = (
  variant: ButtonVariantType | undefined,
  color: ButtonColorType,
  disabled?: boolean,
  state?: 'hover' | 'active',
) => {
  if (disabled) {
    if (variant === 'secondary') {
      switch (color) {
        case 'gold':
          return theme.colors.goldDark;
        case 'charcoal':
          return theme.colors.silver;
        default:
          return theme.colors.silver;
      }
    }
    switch (color) {
      case 'gold':
        return theme.colors.charcoal;
      case 'charcoal':
        return theme.colors.silver;
      default:
        return theme.colors.charcoal;
    }
  }

  if (variant === 'secondary') {
    if (!state) return 'transparent';

    if (state === 'hover') {
      switch (color) {
        case 'gold':
          return theme.colors.goldDarker;
        case 'charcoal':
          return theme.colors.charcoalSoft;
        default:
          return theme.colors.silverSofter;
      }
    }

    if (state === 'active') {
      switch (color) {
        case 'gold':
          return theme.colors.gold;
        case 'charcoal':
          return theme.colors.charcoal;
        default:
          return theme.colors.white;
      }
    }
  }

  if (!state) return theme.colors[color];

  if (state === 'hover') {
    switch (color) {
      case 'gold':
        return theme.colors.goldDarker;
      case 'charcoal':
        return theme.colors.charcoalSoft;
      default:
        return theme.colors.silverSofter;
    }
  }

  if (state === 'active') {
    switch (color) {
      case 'gold':
        return theme.colors.goldDarker;
      case 'charcoal':
        return theme.colors.silver;
      default:
        return theme.colors.gold;
    }
  }

  switch (color) {
    case 'gold':
      return theme.colors.gold;
    case 'charcoal':
      return theme.colors.charcoal;
    default:
      return theme.colors.white;
  }
};

export const getBorderColor = (
  color: ButtonColorType | undefined,
  disabled?: boolean,
  state?: 'hover' | 'active',
) => {
  if (disabled) {
    switch (color) {
      case 'gold':
        return theme.colors.goldDark;
      case 'charcoal':
        return theme.colors.charcoal;
      default:
        return theme.colors.silver;
    }
  }

  if (state === 'hover') {
    switch (color) {
      case 'gold':
        return theme.colors.goldDarker;
      case 'charcoal':
        return theme.colors.charcoalSofter;
      default:
        return theme.colors.silverSofter;
    }
  }

  if (state === 'active') {
    switch (color) {
      case 'gold':
        return theme.colors.gold;
      case 'charcoal':
        return theme.colors.silver;
      default:
        return theme.colors.white;
    }
  }

  switch (color) {
    case 'gold':
      return theme.colors.gold;
    case 'charcoal':
      return theme.colors.charcoalSoft;
    default:
      return theme.colors.white;
  }
};

export const getButtonHeight = (size: ButtonSizeType | undefined) => {
  switch (size) {
    case 's':
      return '40px';
    case 'm':
      return '48px';
    case 'l':
      return '54px';
    default:
      return '48px';
  }
};

export const getButtonPadding = (size: ButtonSizeType | undefined) => {
  switch (size) {
    case 's':
      return `0 ${theme.spacing.xs}`;
    case 'm':
      return `0 ${theme.spacing.s}`;
    case 'l':
      return `0 ${theme.spacing.m}`;
    default:
      return `0 ${theme.spacing.s}`;
  }
};

export const getButtonIconColor = (
  variant: ButtonVariantType | undefined,
  color: ButtonColorType | undefined,
  disabled?: boolean,
) => {
  if (disabled) {
    if (variant === 'secondary') {
      return theme.colors.silver;
    }
    switch (color) {
      case 'gold':
        return theme.colors.charcoal;
      case 'charcoal':
        return theme.colors.silver;
      default:
        return theme.colors.charcoal;
    }
  }
  if (variant === 'secondary') {
    switch (color) {
      case 'gold':
        return theme.colors.gold;
      case 'charcoal':
        return theme.colors.white;
      default:
        return theme.colors.white;
    }
  }
  switch (color) {
    case 'gold':
      return theme.colors.charcoal;
    case 'charcoal':
      return theme.colors.white;
    default:
      return theme.colors.charcoal;
  }
};

export const getButtonTextColor = (
  variant: ButtonVariantType | undefined,
  color: ButtonColorType,
  disabled?: boolean,
) => {
  if (disabled) {
    if (variant === 'secondary') {
      return theme.colors.silver;
    }
    switch (color) {
      case 'gold':
        return theme.colors.charcoal;
      case 'charcoal':
        return theme.colors.silver;
      default:
        return theme.colors.charcoal;
    }
  }
  if (variant === 'secondary') {
    switch (color) {
      case 'gold':
        return theme.colors.gold;
      case 'charcoal':
        return theme.colors.white;
      default:
        return theme.colors.white;
    }
  }
  switch (color) {
    case 'gold':
      return theme.colors.charcoal;
    case 'charcoal':
      return theme.colors.white;
    default:
      return theme.colors.charcoal;
  }
};

export const getModalWidth = (
  size: ModalSizeType | undefined,
  isMobile: boolean,
  mobileBottomSheet: boolean | undefined,
) => {
  if (mobileBottomSheet && isMobile) {
    return '100%';
  }

  switch (size) {
    case 's':
      return '540px';
    case 'm':
      return '640px';
    case 'l':
      return '900px';
    default:
      return '640px';
  }
};

export const getModalContentPadding = (
  noPadding?: boolean,
  headerDivider?: boolean,
  isMobile?: boolean,
) => {
  if (noPadding) return '0';

  if (isMobile)
    return headerDivider
      ? `${theme.spacing.l}`
      : `0 ${theme.spacing.m} ${theme.spacing.m} ${theme.spacing.m}`;

  return headerDivider
    ? `${theme.spacing.m}`
    : `0 ${theme.spacing.l} ${theme.spacing.l} ${theme.spacing.l}`;
};

export const getModalBorderRadius = (
  mobileBottomSheet?: boolean,
  mobileFullScreen?: boolean,
) => {
  if (mobileFullScreen) return 0;

  return mobileBottomSheet
    ? `${theme.borderRadius.l} ${theme.borderRadius.l} 0 0`
    : theme.borderRadius.l;
};

export const getCustomMediaQuery = (size: string) => `(max-width: ${size})`;

export const ColumnLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: ${theme.spacing.m};

  @media ${devices.laptop} {
    display: flex;
    flex-direction: column;
    /* grid-template-columns: 1fr;
    grid-template-rows: auto; */
  }

  @media ${devices.tablet} {
    gap: ${theme.spacing.s};
  }
`;
