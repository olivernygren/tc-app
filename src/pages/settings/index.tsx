import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import Select from '@/lib/inputs/Select';
import TabBar from '@/lib/tabs/TabBar';
import TabBarButton from '@/lib/tabs/TabBarButton';
import { EmphasisTypography, HeadingsTypography, NormalTypography } from '@/lib/Typography';
import { LocaleEnum } from '@/utils/enums/enums';
import theme from '@/utils/theme';
import { ExerciseLoadUnitEnum } from '@/utils/types/exercise';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';

export const getServerSideProps = async (context: any) => ({
  props: {
    ...(await serverSideTranslations(context.locale, ['common', 'nav', 'settings'])),
  },
});

enum SettingsPageTabsEnum {
  PREFERENCES = 'Preferences',
  MEMBERSHIP = 'Membership',
}

const SettingsPage = () => {
  const { t, i18n } = useTranslation('settings');
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<SettingsPageTabsEnum>(SettingsPageTabsEnum.PREFERENCES);
  const [selectedUnit, setSelectedUnit] = useState(ExerciseLoadUnitEnum.KG);

  const handleChangeLanguage = (locale: LocaleEnum) => {
    i18n.changeLanguage(locale);
    router.replace(router.pathname, router.asPath, { locale });
  };

  return (
    <>
      <TCHead title={t('meta-title')} />
      <PageLayout>
        <HeadingsTypography variant="h1">
          {t('settings')}
        </HeadingsTypography>
        <TabBar>
          <TabBarButton
            isActive={activeTab === SettingsPageTabsEnum.PREFERENCES}
            text={t('preferences')}
            onClick={() => setActiveTab(SettingsPageTabsEnum.PREFERENCES)}
          />
          <TabBarButton
            isActive={activeTab === SettingsPageTabsEnum.MEMBERSHIP}
            text={t('membership')}
            onClick={() => setActiveTab(SettingsPageTabsEnum.MEMBERSHIP)}
          />
        </TabBar>
        <Content>
          <PreferenceWrapper>
            <PreferenceText>
              <EmphasisTypography variant="m">
                {t('language')}
              </EmphasisTypography>
              <NormalTypography variant="s" color={theme.colors.silverSoft}>
                {t('preferred-language-on-platform')}
              </NormalTypography>
            </PreferenceText>
            <Select
              options={[
                { value: LocaleEnum.SV, label: t('swedish') },
                { value: LocaleEnum.EN, label: t('english') },
              ]}
              onChange={(value) => handleChangeLanguage(value as LocaleEnum)}
              value={i18n.language}
            />
          </PreferenceWrapper>
          <PreferenceWrapper>
            <PreferenceText>
              <EmphasisTypography variant="m">
                {t('weight-unit')}
              </EmphasisTypography>
              <NormalTypography variant="s" color={theme.colors.silverSoft}>
                {t('preferred-weight-unit')}
              </NormalTypography>
            </PreferenceText>
            <WeightUnitButtonsWrapper>
              <WeightUnitButton
                isSelected={selectedUnit === ExerciseLoadUnitEnum.KG}
                onClick={() => setSelectedUnit(ExerciseLoadUnitEnum.KG)}
              >
                <EmphasisTypography
                  variant="s"
                  color={selectedUnit === ExerciseLoadUnitEnum.KG ? theme.colors.charcoal : theme.colors.white}
                >
                  {t('kg')}
                </EmphasisTypography>
              </WeightUnitButton>
              <WeightUnitButton
                isSelected={selectedUnit === ExerciseLoadUnitEnum.LBS}
                onClick={() => setSelectedUnit(ExerciseLoadUnitEnum.LBS)}
              >
                <EmphasisTypography
                  variant="s"
                  color={selectedUnit === ExerciseLoadUnitEnum.LBS ? theme.colors.charcoal : theme.colors.white}
                >
                  {t('lbs')}
                </EmphasisTypography>
              </WeightUnitButton>
            </WeightUnitButtonsWrapper>
          </PreferenceWrapper>
        </Content>
      </PageLayout>
    </>
  );
};

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  padding-top: ${theme.spacing.s};
`;

const PreferenceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`;

const PreferenceText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxxs};
`;

const WeightUnitButton = styled.div<{ isSelected: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${theme.spacing.xxs} ${theme.spacing.s};
  border-radius: ${theme.borderRadius.m};
  background-color: ${({ isSelected }) => (isSelected ? theme.colors.gold : theme.colors.charcoal)};
  border: 1px solid ${({ isSelected }) => (isSelected ? theme.colors.gold : theme.colors.charcoalSofter)};
  cursor: ${({ isSelected }) => (isSelected ? 'default' : 'pointer')};
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? theme.colors.gold : theme.colors.charcoalSofter)};
  }
`;

const WeightUnitButtonsWrapper = styled.div`
  display: flex;
  gap: ${theme.spacing.xs};
  align-items: center;
`;

export default SettingsPage;
