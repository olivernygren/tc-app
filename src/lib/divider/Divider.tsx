import styled, { css } from 'styled-components';
import theme from '@/utils/theme';

interface DividerProps {
  color?: string;
  vertical?: boolean;
  customHeight?: string;
}

// eslint-disable-next-line import/prefer-default-export
export const Divider = styled.div<DividerProps>`
  ${({ vertical, customHeight }) => (vertical ? css`
    width: 1px;
    height: ${customHeight || '100%'};
    min-height: 28px;
  ` : css`
    width: 100%;
    height: 1px;
  `)}
  background-color: ${({ color }) => color || theme.colors.charcoalSoft};
`;
