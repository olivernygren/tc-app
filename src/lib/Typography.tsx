'use client';

import styled from 'styled-components';
import theme, { devices } from '@/utils/theme';

export type HeadingsTypographyVariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6';
export type NormalTypographyVariantType = 'xs' | 's' | 'm' | 'l';
export type EmphasisTypographyVariantType = NormalTypographyVariantType;
export type ButtonTypographyVariantType = 's' | 'm' | 'l';
export type LabelTypographyVariantType = 'xs' | 's' | 'm';

export interface RootTypographyProps {
  id?: string;
  color?: string;
  align?: 'left' | 'center' | 'right';
  as?: string;
  noWrap?: boolean;
  pointer?: boolean;
  overflowEllipsis?: boolean;
}

interface FontStylingOptions {
  fontSize: number;
  lineHeight: number;
  weight: number;
  mobileFontSize: number;
  mobileLineHeight?: number;
}

export interface HeadingsTypographyProps extends RootTypographyProps {
  variant: HeadingsTypographyVariantType;
}

export interface NormalTypographyProps extends RootTypographyProps {
  variant?: NormalTypographyVariantType;
}

export interface EmphasisTypographyProps extends RootTypographyProps {
  variant?: EmphasisTypographyVariantType;
}

export interface ButtonTypographyProps extends RootTypographyProps {
  variant: ButtonTypographyVariantType;
}

export interface LabelTypographyProps extends RootTypographyProps {
  variant: LabelTypographyVariantType;
}

const getFontStyling = (options: FontStylingOptions): string => `
  font-size: ${options.fontSize}px;
  line-height: ${options.lineHeight};
  font-weight: ${options.weight};
  cursor: inherit;

  @media ${devices.tablet} {
    font-size: ${options.mobileFontSize}px;
    line-height: ${options.mobileLineHeight || options.lineHeight};
  }
`;

const headingFontWeight = 700;
const normalFontWeight = 400;
const emphasisFontWeight = 600;
const buttonFontWeight = 500;
const labelFontWeight = 500;

const getHeadingVariantStyling = (
  variant: HeadingsTypographyVariantType,
): string => {
  switch (variant) {
    case 'h1':
      return getFontStyling({
        fontSize: 40,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 30,
      });
    case 'h2':
      return getFontStyling({
        fontSize: 32,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 24,
      });
    case 'h3':
      return getFontStyling({
        fontSize: 28,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 22,
      });
    case 'h4':
      return getFontStyling({
        fontSize: 24,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 20,
      });
    case 'h5':
      return getFontStyling({
        fontSize: 20,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 17,
      });
    case 'h6':
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 15,
      });
    default:
      return getFontStyling({
        fontSize: 24,
        lineHeight: 1.25,
        weight: headingFontWeight,
        mobileFontSize: 22,
      });
  }
};

const getNormalVariantStyling = (
  variant: NormalTypographyVariantType,
): string => {
  switch (variant) {
    case 'xs':
      return getFontStyling({
        fontSize: 13,
        lineHeight: 1.35,
        weight: normalFontWeight,
        mobileFontSize: 12,
      });
    case 's':
      return getFontStyling({
        fontSize: 15,
        lineHeight: 1.35,
        weight: normalFontWeight,
        mobileFontSize: 14,
      });
    case 'm':
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.35,
        weight: normalFontWeight,
        mobileFontSize: 16,
      });
    case 'l':
      return getFontStyling({
        fontSize: 20,
        lineHeight: 1.35,
        weight: normalFontWeight,
        mobileFontSize: 18,
      });
    default:
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.35,
        weight: normalFontWeight,
        mobileFontSize: 16,
      });
  }
};

const getEmphasisVariantStyling = (
  variant: EmphasisTypographyVariantType,
): string => {
  switch (variant) {
    case 'xs':
      return getFontStyling({
        fontSize: 13,
        lineHeight: 1.35,
        weight: emphasisFontWeight,
        mobileFontSize: 12,
      });
    case 's':
      return getFontStyling({
        fontSize: 15,
        lineHeight: 1.35,
        weight: emphasisFontWeight,
        mobileFontSize: 14,
      });
    case 'm':
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.35,
        weight: emphasisFontWeight,
        mobileFontSize: 16,
      });
    case 'l':
      return getFontStyling({
        fontSize: 20,
        lineHeight: 1.35,
        weight: emphasisFontWeight,
        mobileFontSize: 18,
      });
    default:
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.35,
        weight: emphasisFontWeight,
        mobileFontSize: 16,
      });
  }
};

const getButtonVariantStyling = (
  variant: ButtonTypographyVariantType,
): string => {
  switch (variant) {
    case 's':
      return getFontStyling({
        fontSize: 15,
        lineHeight: 1.25,
        weight: buttonFontWeight,
        mobileFontSize: 14,
      });
    case 'm':
      return getFontStyling({
        fontSize: 17,
        lineHeight: 1.25,
        weight: buttonFontWeight,
        mobileFontSize: 16,
      });
    case 'l':
      return getFontStyling({
        fontSize: 20,
        lineHeight: 1.25,
        weight: buttonFontWeight,
        mobileFontSize: 18,
      });
    default:
      return getFontStyling({
        fontSize: 15,
        lineHeight: 1.25,
        weight: buttonFontWeight,
        mobileFontSize: 14,
      });
  }
};

const getLabelVariantStyling = (
  variant: LabelTypographyVariantType,
): string => {
  switch (variant) {
    case 'xs':
      return getFontStyling({
        fontSize: 11,
        lineHeight: 1.25,
        weight: labelFontWeight,
        mobileFontSize: 10,
      });
    case 's':
      return getFontStyling({
        fontSize: 13,
        lineHeight: 1.25,
        weight: labelFontWeight,
        mobileFontSize: 12,
      });
    case 'm':
      return getFontStyling({
        fontSize: 15,
        lineHeight: 1.25,
        weight: labelFontWeight,
        mobileFontSize: 14,
      });
    default:
      return getFontStyling({
        fontSize: 13,
        lineHeight: 1.25,
        weight: labelFontWeight,
        mobileFontSize: 12,
      });
  }
};

const RootTypography = styled.div<RootTypographyProps>`
  margin: 0;
  padding: 0;
  color: ${({ color }) => color || theme.colors.white};
  text-align: ${({ align }) => align || 'left'};
  cursor: ${({ pointer }) => (pointer ? 'pointer' : 'auto')};
  white-space: ${({ noWrap }) => (noWrap ? 'nowrap' : 'normal')};
  overflow: ${({ overflowEllipsis }) => (overflowEllipsis ? 'hidden' : 'visible')};
  text-overflow: ${({ overflowEllipsis }) => (overflowEllipsis ? 'ellipsis' : 'clip')};
  transition: color 0.2s ease;
`;

export const HeadingsTypography = styled(
  RootTypography,
).attrs<HeadingsTypographyProps>(({ variant, as }) => ({
  as: as ?? variant,
}))<HeadingsTypographyProps>`
  ${({ variant }) => getHeadingVariantStyling(variant)}
`;

export const NormalTypography = styled(
  RootTypography,
).attrs<NormalTypographyProps>(({ as }) => ({
  as: as ?? 'span',
}))<NormalTypographyProps>`
  ${({ variant }) => getNormalVariantStyling(variant ?? 'm')}
`;

export const EmphasisTypography = styled(
  RootTypography,
).attrs<EmphasisTypographyProps>(({ as }) => ({
  as: as ?? 'span',
}))<EmphasisTypographyProps>`
  ${({ variant }) => getEmphasisVariantStyling(variant ?? 'm')}
`;

export const ButtonTypography = styled(
  RootTypography,
).attrs<ButtonTypographyProps>(({ as }) => ({
  as: as ?? 'span',
}))<ButtonTypographyProps>`
  ${({ variant }) => getButtonVariantStyling(variant)}
`;

export const LabelTypography = styled(
  RootTypography,
).attrs<LabelTypographyProps>(({ as }) => ({
  as: as ?? 'span',
}))<LabelTypographyProps>`
  ${({ variant }) => getLabelVariantStyling(variant)}
`;
