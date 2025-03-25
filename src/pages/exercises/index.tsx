import ExerciseManagementCard from '@/components/exercise/ExerciseManagementCard';
import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import { HeadingsTypography, NormalTypography } from '@/lib/typography/Typography';
import { getAllExercises } from '@/utils/resolvers/server-side/exercises';
import { getUserById } from '@/utils/resolvers/server-side/users';
import theme from '@/utils/theme';
import { Exercise } from '@/utils/types/exercise';
import { User } from '@/utils/types/user';
import UserUtils from '@/utils/user/userUtils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import styled from 'styled-components';

interface Props {
  user: User;
  exercises: Array<Exercise>;
}

export const getServerSideProps = async (context: any) => {
  const user = await getUserById(context.req.cookies.user);
  const exercises = await getAllExercises(context.req.cookies.user);

  return {
    props: {
      user,
      exercises,
      ...(await serverSideTranslations(context.locale, ['common', 'nav', 'exercises'])),
    },
  };
};

const ExercisesPage = ({ exercises, user }: Props) => {
  const { t } = useTranslation('exercises');

  const [exercisesList, setExercisesList] = useState(exercises);

  const isAdmin = UserUtils.isAdminUser(user);

  console.log(exercisesList);

  return (
    <>
      <TCHead title="TC | Exercises" />
      <PageLayout noPadding>
        <Content>
          <Toolbar>
            <HeadingsTypography variant="h2" as="h1">
              {t('exercises')}
            </HeadingsTypography>
          </Toolbar>
          {exercisesList.length > 0 ? (
            <ExerciseList>
              {exercisesList.map((exercise) => (
                <ExerciseManagementCard key={exercise.documentId} exercise={exercise} />
              ))}
            </ExerciseList>
          ) : (
            <NormalTypography>{t('no-exercises')}</NormalTypography>
          )}
        </Content>
      </PageLayout>
    </>
  );
};

const Content = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: ${theme.spacing.xs};
  width: 600px;
  margin: 0 auto;
  padding-top: ${theme.spacing.s};
`;

const Toolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing.s} 0;
  /* background-color: ${theme.colors.charcoalDark}; */
  border-bottom: 1px solid ${theme.colors.charcoalSofter};
  z-index: 1;
`;

const ExerciseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  overflow-y: auto;
  padding-top: ${theme.spacing.xs};
`;

export default ExercisesPage;
