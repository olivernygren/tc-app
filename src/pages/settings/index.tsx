import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import Spinner from '@/lib/loading/Spinner';
import Select from '@/lib/select/Select';
import { LocaleEnum } from '@/utils/enums/enums';
import { getUserById } from '@/utils/resolvers/server-side/users';
import { updateUserPreferences } from '@/utils/resolvers/users';
import { ExerciseLoadUnitEnum } from '@/utils/types/exercise';
import { User } from '@/utils/types/user';
import {
  createListCollection, Heading, HStack, RadioGroup, Stack, Tabs, Text
} from '@chakra-ui/react';
import Cookies from 'js-cookie';
import { I18n, TFunction, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextRouter, useRouter } from 'next/router';
import React, { useState } from 'react';

export const getServerSideProps = async (context: any) => {
  const userCookie = context.req.cookies.user;
  const user = await getUserById(userCookie);
  return {
    props: {
      user,
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'settings'])),
    },
  };
};

interface SettingsPageProps {
  user: User | null;
}

enum SettingsPageTabsEnum {
  PREFERENCES = 'Preferences',
  MEMBERSHIP = 'Membership',
}

const SettingsPage = ({ user }: SettingsPageProps) => {
  const { t, i18n } = useTranslation('settings');
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SettingsPageTabsEnum>(SettingsPageTabsEnum.PREFERENCES);

  return (
    <>
      <TCHead title={t('meta-title')} />
      <PageLayout>
        <Heading textStyle="4xl">
          {t('settings')}
        </Heading>
        <Tabs.Root
          value={activeTab}
          onValueChange={(e) => setActiveTab(e.value as SettingsPageTabsEnum)}
          lazyMount
        >
          <Tabs.List>
            <Tabs.Trigger value={SettingsPageTabsEnum.PREFERENCES}>{t('preferences')}</Tabs.Trigger>
            <Tabs.Trigger value={SettingsPageTabsEnum.MEMBERSHIP}>{t('membership')}</Tabs.Trigger>
          </Tabs.List>
          <PreferencesContent
            t={t}
            i18n={i18n}
            router={router}
            user={user}
            value={SettingsPageTabsEnum.PREFERENCES}
          />
        </Tabs.Root>
      </PageLayout>
    </>
  );
};

interface PreferenceContentProps {
  value: SettingsPageTabsEnum;
  t: TFunction;
  i18n: I18n;
  router: NextRouter;
  user: User | null;
}

const PreferencesContent = ({
  value, t, i18n, router, user
}: PreferenceContentProps) => {
  const [selectedUnit, setSelectedUnit] = useState<ExerciseLoadUnitEnum | undefined>(user?.preferences?.weightUnit ?? ExerciseLoadUnitEnum.KG);
  const [updateWeightUnitLoading, setUpdateWeightUnitLoading] = useState<boolean>(false);

  const languageOptions = [
    { value: LocaleEnum.SV, label: t('swedish') },
    { value: LocaleEnum.EN, label: t('english') },
  ];

  const handleChangeLanguage = async (locale: LocaleEnum) => {
    if (user) {
      await updateUserPreferences(user.id, { language: locale });
    }
    Cookies.set('NEXT_LOCALE', locale);
    i18n.changeLanguage(locale);
    router.replace(router.pathname, router.asPath, { locale });
  };

  const handleUpdateWeightUnit = async (unit: ExerciseLoadUnitEnum) => {
    setUpdateWeightUnitLoading(true);
    if (user) {
      await updateUserPreferences(user.id, { weightUnit: unit });
    }

    setUpdateWeightUnitLoading(false);
    setSelectedUnit(unit);
    router.replace(router.asPath);
  };

  return (
    <Tabs.Content value={value}>
      <Stack gap={3}>
        <Stack gap={1}>
          <Text fontWeight={500}>
            {t('language')}
          </Text>
          <Text textStyle="sm" color="fg.muted">
            {t('preferred-language-on-platform')}
          </Text>
        </Stack>
        <Select
          collection={createListCollection({ items: languageOptions })}
          value={[i18n.language]}
          onChange={(langValue) => handleChangeLanguage(langValue as unknown as LocaleEnum)}
          placeholder={t('select-language')}
          label={t('language')}
        />
      </Stack>
      <Stack gap={3}>
        <Stack gap={1}>
          <Text fontWeight={500} textStyle="md">
            {t('weight-unit')}
          </Text>
          <Text textStyle="sm" color="fg.muted">
            {t('preferred-weight-unit')}
          </Text>
        </Stack>
        <RadioGroup.Root value={selectedUnit} onValueChange={(e) => handleUpdateWeightUnit(e.value as ExerciseLoadUnitEnum)}>
          <HStack gap="6">
            <RadioGroup.Item value={ExerciseLoadUnitEnum.KG}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{t('kg')}</RadioGroup.ItemText>
            </RadioGroup.Item>
            <RadioGroup.Item value={ExerciseLoadUnitEnum.LBS}>
              <RadioGroup.ItemHiddenInput />
              <RadioGroup.ItemIndicator />
              <RadioGroup.ItemText>{t('lbs')}</RadioGroup.ItemText>
            </RadioGroup.Item>
          </HStack>
        </RadioGroup.Root>
        {updateWeightUnitLoading && (
        <Spinner size="s" />
        )}
      </Stack>
    </Tabs.Content>
  );
};

export default SettingsPage;
