import theme from '@/utils/theme';
import React from 'react';
import styled from 'styled-components';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <Layout>{children}</Layout>
);

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
`;

export default PageLayout;
