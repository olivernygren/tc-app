import theme from '@/utils/theme';
import React from 'react';
import { styled } from 'styled-components';
import AuthComponent from '../auth/AuthComponent';

const Sidebar = () => {
  return (
    <Container>
      <p>TC</p>
      <AuthComponent />
    </Container>
  );
};

const Container = styled.div`
  background-color: #323232;
  border-radius: ${theme.borderRadius.xl};
  height: 100%;
  padding: ${theme.spacing.m};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  width: 320px;
`;

export default Sidebar;
