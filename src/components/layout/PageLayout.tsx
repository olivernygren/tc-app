import theme from '@/utils/theme';
import React from 'react';
import styled from 'styled-components';

interface PageLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const PageLayout = ({ children, noPadding }: PageLayoutProps) => (
  <Layout noPadding={noPadding}>{children}</Layout>
);

const Layout = styled.div<{ noPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
  animation: fadeIn 0.5s ease;
  padding: ${(props) => (props.noPadding ? '0' : theme.spacing.m)};
  position: relative;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default PageLayout;
