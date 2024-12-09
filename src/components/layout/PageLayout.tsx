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
  animation: fadeIn 0.5s ease;
  
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
