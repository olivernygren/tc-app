import theme from '@/utils/theme';
import React from 'react';
import { styled } from 'styled-components';
import { HeadingsTypography } from '@/lib/Typography';
import AuthComponent from '../auth/AuthComponent';

const Sidebar = () => (
  <Container>
    <HeadingsTypography variant="h1">TC</HeadingsTypography>
    <AuthComponent />
  </Container>
);

const Container = styled.div`
  background-color: ${theme.colors.charcoalSoft};
  border-radius: ${theme.borderRadius.xl};
  height: 100%;
  max-height: calc(100dvh - 48px);
  padding: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  width: 320px;
  position: sticky;
`;

export default Sidebar;
