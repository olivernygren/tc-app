import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import theme from '@/utils/theme';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import styled from 'styled-components';
import Sidebar from '@/components/sidebar/Sidebar';
import StyleSheetProvider from '@/components/styled-components/StyleSheetProvider';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/utils/firebase/firebase';
import { NormalTypography } from '@/lib/Typography';
import Spinner from '@/lib/loading/Spinner';
import { UserProvider } from '@/context/UserProvider';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  weight: '100 900',
});

const App = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userObj) => {
      setUser(userObj);
      setLoading(false);
    });
  }, []);

  const getLoadingAnimation = () => (
    <LoadingContainer>
      <Spinner size="l" />
    </LoadingContainer>
  );

  const getLayout = () => (
    <Root className={geistSans.className}>
      <Sidebar />
      <Content>
        {loading && getLoadingAnimation()}
        {!loading && user && <Component {...pageProps} />}
        {!loading && !user && (
          <NormalTypography>
            Please sign in to access this page.
          </NormalTypography>
        )}
      </Content>
    </Root>
  );

  return (
    <UserProvider>
      <StyleSheetProvider>
        {getLayout()}
      </StyleSheetProvider>
    </UserProvider>
  );
};

const Root = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: ${theme.spacing.m};
  min-height: 100dvh;
  background-color: ${theme.colors.charcoal};
  padding: ${theme.spacing.m};
  overflow: hidden;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  width: 100%;
  overflow-y: auto;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default appWithTranslation(App);
