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
import { auth } from '@/utils/firebase/firebaseClient';
import Spinner from '@/lib/loading/Spinner';
import { UserProvider } from '@/context/UserProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { RoutesEnum } from '@/utils/enums/enums';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  weight: '100 900',
});

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    onAuthStateChanged(auth, (userObj) => {
      setUser(userObj);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!loading && !user && router.pathname !== RoutesEnum.LOGIN) {
      router.replace(RoutesEnum.LOGIN);
    }
  }, [loading, user, router]);

  const getLoadingAnimation = () => (
    <LoadingContainer>
      <Spinner size="l" />
    </LoadingContainer>
  );

  const getLayout = () => {
    if (router.pathname === RoutesEnum.LOGIN) {
      return (
        <FullPageRoot className={geistSans.className}>
          <Component {...pageProps} />
        </FullPageRoot>
      );
    }

    return (
      <Root className={geistSans.className}>
        <Sidebar />
        <Content
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
        >
          {loading && getLoadingAnimation()}
          {!loading && user && <Component {...pageProps} />}
          {/* {!loading && !user && (
            <NormalTypography>
              Please sign in to access this page.
            </NormalTypography>
          )} */}
        </Content>
      </Root>
    );
  };

  return (
    <UserProvider>
      <StyleSheetProvider>
        <AnimatePresence mode="wait">
          {getLayout()}
        </AnimatePresence>
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

const FullPageRoot = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  min-height: 100dvh;
  background-color: ${theme.colors.charcoal};
  padding: ${theme.spacing.m};
  overflow: hidden;
`;

const Content = styled(motion.div)`
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
