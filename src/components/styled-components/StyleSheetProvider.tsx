import isPropValid from '@emotion/is-prop-valid';
import React from 'react';
import { StyleSheetManager } from 'styled-components';

interface AppRootProps {
  children: React.ReactNode;
}

const StyleSheetProvider = ({ children }: AppRootProps) => (
  <StyleSheetManager shouldForwardProp={(prop) => isPropValid(prop)}>
    {children}
  </StyleSheetManager>
);

export default StyleSheetProvider;
