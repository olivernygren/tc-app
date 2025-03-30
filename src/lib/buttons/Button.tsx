import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';
import React from 'react';

interface ChakraButtonProps extends ButtonProps {
  overwriteColorPalette?: 'gray' | 'red' | 'green' | 'blue' | 'teal' | 'pink' | 'purple' | 'cyan' | 'orange' | 'yellow';
}

const Button = ({ children, overwriteColorPalette, ...props }: ChakraButtonProps) => (
  <ChakraButton
    rounded="lg"
    fontWeight={500}
    colorPalette={overwriteColorPalette || (props.variant === 'solid' || props.variant === undefined ? 'teal' : 'gray')}
    // {...(props.variant === 'solid' && {
    //   bg: 'teal.500',
    //   _hover: { bg: 'teal.600' },
    // })}
    {...props}
  >
    {children}
  </ChakraButton>
);

export default Button;
