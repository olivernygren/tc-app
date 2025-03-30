import { Stack } from '@chakra-ui/react';
import React from 'react';

interface PageLayoutProps {
  children: React.ReactNode;
  noPadding?: boolean;
}

const PageLayout = ({ children, noPadding = false }: PageLayoutProps) => (
  <Stack
    gap={2}
    w="100%"
    position="relative"
    animation="fadeIn 0.5s ease"
    p={noPadding ? 0 : 6}
    overscroll="none"
  >
    {children}
  </Stack>
);

export default PageLayout;
