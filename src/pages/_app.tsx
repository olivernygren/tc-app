import { useEffect, useState } from 'react';
import localFont from 'next/font/local';
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/utils/firebase/firebaseClient';
import Spinner from '@/lib/loading/Spinner';
import { UserProvider } from '@/context/UserProvider';
import { useRouter } from 'next/router';
import { RoutesEnum } from '@/utils/enums/enums';
import Sidebar from '@/components/sidebar/Sidebar';
import {
  ChakraProvider, defaultSystem, Flex, Grid, Stack, Theme
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
// import { Geist } from 'next/font/google';
import system from '../../theme';

// Load custom font
const kumbhSans = localFont({
  src: './fonts/KumbhSans-VariableFont_YOPQ,wght.ttf',
  weight: '100 900',
});

// const geist = Geist({
//   subsets: ['latin'],
//   display: 'swap',
// });

const font = kumbhSans;

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
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="100%"
    >
      <Spinner size="l" />
    </Flex>
  );

  const getLayout = () => {
    if (router.pathname === RoutesEnum.LOGIN) {
      return (
        <Stack gap={4} minH="100dvh" bg="bg" overflow="hidden" overscrollBehavior="none" className={font.className}>
          <Component {...pageProps} />
        </Stack>
      );
    }

    return (
      <Grid templateColumns="300px 1fr" h="100dvh" overflow="hidden" className={font.className} bg="bg">
        <Stack overflow="hidden">
          <Sidebar />
        </Stack>
        <motion.div
          className="flex flex-col gap-4 w-full overflow-y-auto h-screen overscroll-y-none"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
        >
          {loading && getLoadingAnimation()}
          {!loading && user && <Component {...pageProps} />}
        </motion.div>
      </Grid>
    );
  };

  return (
    <ChakraProvider value={{ ...system, ...defaultSystem }}>
      <Theme appearance="dark">
        <UserProvider>
          {getLayout()}
        </UserProvider>
      </Theme>
    </ChakraProvider>
  );
};

export default appWithTranslation(App);
