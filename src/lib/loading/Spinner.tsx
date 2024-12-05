import theme from '@/utils/theme';
import React from 'react';
import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  size?: 'xs' | 's' | 'm' | 'l' | 'xl';
  dark?: boolean;
}

const sizes = {
  xs: 10,
  s: 20,
  m: 30,
  l: 40,
  xl: 50,
};

const Spinner = ({ size = 'l', dark = false }: SpinnerProps) => (
  <SpinnerWrapper
    size={sizes[size]}
    dark={dark}
  />
);

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div<{ size: number, dark?: boolean }>`
  /* border: 4px solid rgba(255, 255, 255, 0.1); */
  border-width: ${({ size }) => `calc(${size}px / 16)`};
  border-style: solid;
  border-color: ${({ dark }) => (dark ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)')};
  /* border-top: 4px solid ${({ dark }) => (dark ? theme.colors.charcoal : theme.colors.white)}; */
  border-top-width: ${({ size }) => `calc(${size}px / 8)`};
  border-top-style: solid;
  border-top-color: ${({ dark }) => (dark ? theme.colors.charcoal : theme.colors.white)};
  border-radius: 50%;
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  animation: ${spin} 1s linear infinite;
`;

export default Spinner;
