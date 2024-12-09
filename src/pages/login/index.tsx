import TCHead from '@/components/head/TCHead';
import Button from '@/lib/buttons/Button';
import { Divider } from '@/lib/divider/Divider';
import Input from '@/lib/inputs/Input';
import Select from '@/lib/inputs/Select';
import { EmphasisTypography, HeadingsTypography, NormalTypography } from '@/lib/Typography';
import { CookieKey, setCookie } from '@/utils/cookies';
import { FirestoreCollectionEnum } from '@/utils/enums/enums';
import { signInWithGoogle } from '@/utils/firebase/authHelpers';
import { auth, clientDb, provider } from '@/utils/firebase/firebaseClient';
import { getUserById } from '@/utils/resolvers/server-side/users';
import theme from '@/utils/theme';
import { ExerciseLoadUnitEnum } from '@/utils/types/exercise';
import {
  AuthProviderEnum, GenderEnum, User, UserRolesEnum
} from '@/utils/types/user';
import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/16/solid';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

export const getServerSideProps = async (context: any) => {
  const userCookie = context.req.cookies.user;
  console.log('userCookie', userCookie);

  const user = await getUserById(userCookie);

  if (user !== null) {
    return {
      redirect: {
        destination: '/',
        permanent: true,
      }
    };
  }

  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'login'])),
    }
  };
};

interface LoginPageProps {
  user: User | null;
}

const LoginPage = ({ user }: LoginPageProps) => {
  const { t } = useTranslation('login');
  const router = useRouter();

  const [authError, setAuthError] = useState<string | undefined>(undefined);
  const [showRegisterView, setShowRegisterView] = useState<boolean>(false);
  const [accountCreationStep, setAccountCreationStep] = useState<number>(1);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [gender, setGender] = useState<GenderEnum>(GenderEnum.MALE);

  const [createAccountLoading, setCreateAccountLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  console.log('user', user);

  const getGoogleIcon = () => (
    <Image src="/images/Google.svg" height={24} width={24} alt="Google" />
  );

  const handleGoogleSignIn = async () => {
    const {
      existingUser, cookie, error, isNewUser, userCredential,
    } = await signInWithGoogle();

    if (error || !cookie) {
      setAuthError(t(`errors.${error}`));
      return;
    }

    if ((existingUser || userCredential) && cookie) {
      if (isNewUser && userCredential) {
        const input = {
          email: userCredential.user.email ?? '',
          name: userCredential.user.displayName ?? '',
          role: UserRolesEnum.USER,
          createdAt: new Date().toISOString(),
          gender,
          username,
          preferences: {
            weightUnit: ExerciseLoadUnitEnum.KG,
            language: router.locale
          },
          provider: AuthProviderEnum.GOOGLE,
        };

        await setDoc(doc(clientDb, FirestoreCollectionEnum.USERS, userCredential.user.uid), input);
      }

      setCookie(CookieKey.TOKEN, cookie, undefined);
      router.push('/');
    }
  };

  const handleCreateAccountWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const getRandomFourDigitNumber = () => Math.floor(1000 + Math.random() * 9000);

      const input = {
        email: result.user.email ?? '',
        name: result.user.displayName ?? '',
        username: `${result.user.displayName?.replaceAll(' ', '').toLowerCase()}${getRandomFourDigitNumber()}`,
        gender: GenderEnum.MALE,
        role: UserRolesEnum.USER,
        createdAt: new Date().toISOString(),
        preferences: {
          weightUnit: ExerciseLoadUnitEnum.KG,
          language: router.locale
        },
        provider: AuthProviderEnum.GOOGLE,
      };

      await setDoc(doc(clientDb, FirestoreCollectionEnum.USERS, result.user.uid), input);

      Cookies.set('user', result.user.uid);
      router.push('/');
    } catch (error: any) {
      setAuthError(t(`errors.${error.code}`));
      console.error('Error creating account:', error);
      Cookies.remove('user');
    }
  };

  const handleCreateAccountWithEmail = async () => {
    setCreateAccountLoading(true);

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const input = {
        email,
        name,
        username,
        role: UserRolesEnum.USER,
        createdAt: new Date().toISOString(),
        gender,
        preferences: {
          weightUnit: ExerciseLoadUnitEnum.KG,
          language: router.locale
        },
        provider: AuthProviderEnum.EMAIL,
      };

      await setDoc(doc(clientDb, FirestoreCollectionEnum.USERS, result.user.uid), input);

      Cookies.set('user', result.user.uid);
      router.push('/');
    } catch (error: any) {
      setAuthError(t(`errors.${error.code}`));
      Cookies.remove('user');
    } finally {
      setCreateAccountLoading(false);
    }
  };

  const handleLoginWithEmail = async () => {
    setLoginLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('result', result);

      Cookies.set('user', result.user.uid);
      router.push('/');
    } catch (error: any) {
      setAuthError(t(`errors.${error.code}`));
      console.error('Error signing in:', error);
      Cookies.remove('user');
    } finally {
      setLoginLoading(false);
    }
  };

  const getButtons = () => {
    if (showRegisterView) {
      if (accountCreationStep === 1) {
        return (
          <Button
            variant="primary"
            color="gold"
            fullWidth
            onClick={() => setAccountCreationStep(2)}
            endIcon={<ArrowLongRightIcon width={20} height={20} color={theme.colors.charcoal} />}
          >
            {t('next')}
          </Button>
        );
      }

      return (
        <ButtonsContainer>
          <Button
            variant="secondary"
            color="charcoal"
            onClick={() => setAccountCreationStep(1)}
            fullWidth
            startIcon={<ArrowLongLeftIcon width={20} height={20} color={theme.colors.white} />}
          >
            {t('back')}
          </Button>
          <Button
            variant="primary"
            color="gold"
            fullWidth
            onClick={handleCreateAccountWithEmail}
            loading={createAccountLoading}
          >
            {t('create-account')}
          </Button>
        </ButtonsContainer>
      );
    }

    return (
      <Button
        variant="primary"
        color="gold"
        fullWidth
        onClick={handleLoginWithEmail}
        loading={loginLoading}
      >
        {t('login')}
      </Button>
    );
  };

  return (
    <>
      <TCHead title={t('login')} />
      <Layout>
        <Card>
          <HeadingsTypography variant="h2">{showRegisterView ? t('create-account') : t('login')}</HeadingsTypography>
          <InputContainer>
            {(!showRegisterView || (showRegisterView && accountCreationStep === 1)) && (
              <>
                <Input
                  label={t('email')}
                  placeholder={t('email')}
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  fullWidth
                />
                <Input
                  label={t('password')}
                  placeholder={t('password')}
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  type="password"
                  fullWidth
                />
              </>
            )}
            {showRegisterView && accountCreationStep === 2 && (
              <>
                <Input
                  label={t('name')}
                  placeholder={t('name')}
                  value={name}
                  onChange={(e) => setName(e.currentTarget.value)}
                  maxLength={50}
                  fullWidth
                />
                <Input
                  label={t('username')}
                  placeholder={t('username')}
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  maxLength={30}
                  fullWidth
                />
                <Select
                  value={gender}
                  onChange={(value) => setGender(value as GenderEnum)}
                  options={[
                    { value: GenderEnum.MALE, label: t(`genders.${GenderEnum.MALE}`) },
                    { value: GenderEnum.FEMALE, label: t(`genders.${GenderEnum.FEMALE}`) },
                  ]}
                  fullWidth
                />
              </>
            )}
          </InputContainer>
          {authError && (
            <NormalTypography color={theme.colors.red}>
              {authError}
            </NormalTypography>
          )}
          {getButtons()}
          <NoAccountText>
            <NormalTypography variant="s">{t('no-account')}</NormalTypography>
            <ArrowLongRightIcon width={20} height={20} color={theme.colors.silverDark} />
            <NoAccountLink onClick={() => setShowRegisterView(!showRegisterView)}>
              <NormalTypography variant="s" color={theme.colors.gold}>{showRegisterView ? t('login-here') : t('register')}</NormalTypography>
            </NoAccountLink>
          </NoAccountText>
          <WordDivider>
            <Divider color={theme.colors.charcoalSofter} />
            <EmphasisTypography variant="s" color={theme.colors.silver}>{t('or')}</EmphasisTypography>
            <Divider color={theme.colors.charcoalSofter} />
          </WordDivider>
          {showRegisterView ? (
            <Button
              variant="secondary"
              color="charcoal"
              onClick={handleCreateAccountWithGoogle}
              fullWidth
              endIcon={getGoogleIcon()}
            >
              {t('create-account-with-google')}
            </Button>
          ) : (
            <Button
              onClick={handleGoogleSignIn}
              fullWidth
              endIcon={getGoogleIcon()}
              color="charcoal"
              variant="secondary"
            >
              {t('sign-in-with-google')}
            </Button>
          )}
        </Card>
      </Layout>
    </>
  );
};

const Layout = styled.div`
  height: 100dvh;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: ${theme.spacing.m}
`;

const Card = styled.div`
  background-color: ${theme.colors.charcoalSoft};
  border-radius: ${theme.borderRadius.xxl};
  padding: ${theme.spacing.l};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  /* align-items: center; */
  width: 500px;
`;

const NoAccountText = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xxs};
  justify-content: center;
`;

const NoAccountLink = styled.div`
  cursor: pointer;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  width: 100%;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.s};
  width: 100%;
`;

const WordDivider = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  width: 100%;
`;

export default LoginPage;
