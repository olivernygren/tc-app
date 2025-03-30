import TCHead from '@/components/head/TCHead';
import { PasswordInput } from '@/components/ui/password-input';
import Button from '@/lib/buttons/Button';
import { CookieKey, setCookie } from '@/utils/cookies';
import { FirestoreCollectionEnum } from '@/utils/enums/enums';
import { signInWithGoogle } from '@/utils/firebase/authHelpers';
import { auth, clientDb, provider } from '@/utils/firebase/firebaseClient';
import { getUserById } from '@/utils/resolvers/server-side/users';
import { ExerciseLoadUnitEnum } from '@/utils/types/exercise';
import {
  AuthProviderEnum, GenderEnum, UserRolesEnum
} from '@/utils/types/user';
import {
  Card, Center, Field, Fieldset, Flex, Group, Heading, HStack, Input, InputGroup, RadioGroup, Separator, Span, Stack, Text
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import Cookies from 'js-cookie';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const getServerSideProps = async (context: any) => {
  const userCookie = context.req.cookies.user;
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
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'login'])),
    }
  };
};

const LoginPage = () => {
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

  const genderOptions = [
    { value: GenderEnum.MALE, label: t(`genders.${GenderEnum.MALE}`) },
    { value: GenderEnum.FEMALE, label: t(`genders.${GenderEnum.FEMALE}`) },
  ];

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
            variant="solid"
            onClick={() => setAccountCreationStep(2)}
          >
            {t('next')}
            <ArrowRight size={20} strokeWidth={1.5} color="gray.300" />
          </Button>
        );
      }

      return (
        <Group gap={3}>
          <Button
            variant="outline"
            onClick={() => setAccountCreationStep(1)}
          >
            <ArrowLeft size={20} strokeWidth={1.5} color="gray.300" />
            {t('back')}
          </Button>
          <Button
            variant="solid"
            onClick={handleCreateAccountWithEmail}
            loading={createAccountLoading}
          >
            {t('create-account')}
          </Button>
        </Group>
      );
    }

    return (
      <Button
        variant="solid"
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
      <Stack bg="bg" h="100dvh" w="100%" justifyContent="center" alignItems="center" gap={6}>
        <Card.Root bg="bg.subtle" rounded="2xl" p={8} w={{ base: '90%', md: '500px' }}>
          <Stack gap={4}>
            <Heading textStyle="4xl">{showRegisterView ? t('create-account') : t('login')}</Heading>
            <Fieldset.Root>
              <Fieldset.Content>
                {(!showRegisterView || (showRegisterView && accountCreationStep === 1)) && (
                <>
                  <Field.Root>
                    <Field.Label>{t('email')}</Field.Label>
                    <Input
                      placeholder={t('email')}
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t('password')}</Field.Label>
                    <PasswordInput
                      placeholder={t('password')}
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                      minLength={6}
                    />
                  </Field.Root>
                </>
                )}
                {showRegisterView && accountCreationStep === 2 && (
                <>
                  <Field.Root>
                    <Field.Label>{t('name')}</Field.Label>
                    <Input
                      placeholder={t('name')}
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                      maxLength={50}
                    />
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t('username')}</Field.Label>
                    <Input
                      placeholder={t('username')}
                      value={username}
                      onChange={(e) => setUsername(e.currentTarget.value)}
                      maxLength={30}
                    />
                    <InputGroup
                      endElement={(
                        <Span color="fg.muted" textStyle="xs">
                          {username.length}
                          {' '}
                          / 30
                        </Span>
                    )}
                    >
                      <Input
                        placeholder={t('username')}
                        value={username}
                        onChange={(e) => setUsername(e.currentTarget.value)}
                        maxLength={30}
                      />
                    </InputGroup>
                  </Field.Root>
                  <Field.Root>
                    <Field.Label>{t('gender')}</Field.Label>
                    <RadioGroup.Root value={gender} onValueChange={(e) => setGender(e.value as GenderEnum)}>
                      <HStack gap="6">
                        {genderOptions.map((item) => (
                          <RadioGroup.Item key={item.value} value={item.value}>
                            <RadioGroup.ItemHiddenInput />
                            <RadioGroup.ItemIndicator />
                            <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                          </RadioGroup.Item>
                        ))}
                      </HStack>
                    </RadioGroup.Root>
                  </Field.Root>
                </>
                )}
              </Fieldset.Content>
            </Fieldset.Root>
            {authError && (
              <Text color="fg.error">
                {authError}
              </Text>
            )}
            {getButtons()}
            <Center display="flex" flexDir="column">
              <Text textStyle="sm">{t('no-account')}</Text>
              <ArrowRight size={20} strokeWidth={1.5} color="gray.300" />
              <Flex onClick={() => setShowRegisterView(!showRegisterView)}>
                <Text textStyle="sm" color="teal.500">{showRegisterView ? t('login-here') : t('register')}</Text>
              </Flex>
            </Center>
            <HStack>
              <Separator flex="1" color="fg.subtle" />
              <Text flexShrink="0" color="fg.muted">{t('or')}</Text>
              <Separator flex="1" color="fg.subtle" />
            </HStack>
            {showRegisterView ? (
              <Button
                variant="outline"
                onClick={handleCreateAccountWithGoogle}
              >
                {t('create-account-with-google')}
                {getGoogleIcon()}
              </Button>
            ) : (
              <Button
                onClick={handleGoogleSignIn}
                variant="outline"
              >
                {t('sign-in-with-google')}
                {getGoogleIcon()}
              </Button>
            )}
          </Stack>
        </Card.Root>
      </Stack>
    </>
  );
};

export default LoginPage;
