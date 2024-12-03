import localFont from 'next/font/local';
import '@/styles/globals.css';
import theme from '@/utils/theme';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import styled from 'styled-components';
import Sidebar from '@/components/sidebar/Sidebar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  weight: '100 900',
});

const App = ({ Component, pageProps }: AppProps) => {
  const getLayout = () => {
    return (
      <Root className={geistSans.className}>
        <Sidebar />
        <Content>
          <Component {...pageProps} />
        </Content>
      </Root>
    );
  };

  return getLayout();
};

const Root = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.m};
  min-height: 100dvh;
  background-color: ${theme.colors.black};
  padding: ${theme.spacing.m};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  width: 100%;
  flex-grow: 1;
`;

export default appWithTranslation(App);
