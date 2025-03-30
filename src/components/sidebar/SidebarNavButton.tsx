// import { EmphasisTypography } from '@/lib/typography/Typography';
// import theme from '@/utils/theme';
// import Link from 'next/link';
// import React from 'react';
// import styled from 'styled-components';

// interface SidebarNavButtonProps {
//   text: string;
//   icon: React.ReactNode;
//   href: string;
//   isActive: boolean;
//   endItem?: React.ReactNode;
// }

// const SidebarNavButton = ({
//   text, icon, href, isActive, endItem,
// }: SidebarNavButtonProps) => (
//   <Link href={href}>
//     <StyledNavButton isActive={isActive}>
//       {icon}
//       <EmphasisTypography
//         className="button-text"
//         color={isActive ? theme.colors.gold : theme.colors.white}
//       >
//         {text}
//       </EmphasisTypography>
//       {endItem && endItem}
//     </StyledNavButton>
//   </Link>
// );

// const StyledNavButton = styled.div<{ isActive: boolean }>`
//   display: flex;
//   align-items: center;
//   gap: ${theme.spacing.xs};
//   padding: 0 ${theme.spacing.xs};
//   height: 52px;
//   border-radius: 10px;
//   cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
//   transition: all 0.12s ease-in-out;
//   background-color: ${({ isActive }) => (isActive ? theme.colors.charcoalSofter : 'transparent')};

//   .button-text {
//     flex: 1;
//   }

//   &:hover {
//     background-color: ${theme.colors.charcoalSofter};
//     transform: scale(${({ isActive }) => (isActive ? 1 : 1.02)});
//   }

//   &:active {
//     background-color: ${theme.colors.charcoalSofter};
//     transform: scale(${({ isActive }) => (isActive ? 1 : 0.98)});
//   }
// `;

// export default SidebarNavButton;

import Link from 'next/link';
import React from 'react';
import { Box, Text } from '@chakra-ui/react';

interface SidebarNavButtonProps {
  text: string;
  icon: React.ReactNode;
  href: string;
  isActive: boolean;
  endItem?: React.ReactNode;
}

const SidebarNavButton = ({
  text,
  icon,
  href,
  isActive,
  endItem,
}: SidebarNavButtonProps) => (
  <Link href={href}>
    <Box
      _hover={{
        bg: isActive ? 'teal.900' : 'bg.muted',
      }}
      bg={isActive ? 'teal.900' : 'bg.subtle'}
      rounded="lg"
      display="flex"
      alignItems="center"
      gap={3}
      px={3}
      py={3}
    >
      {icon}
      <Text
        textStyle="md"
        color={isActive ? 'teal.300' : 'white'}
        fontWeight={isActive ? 500 : 400}
        flex={1}
      >
        {text}
      </Text>
      {endItem && endItem}
    </Box>
  </Link>
);

export default SidebarNavButton;
