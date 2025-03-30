import ExerciseManagementCard from '@/components/exercise/ExerciseManagementCard';
import TCHead from '@/components/head/TCHead';
import PageLayout from '@/components/layout/PageLayout';
import { getAllExercises } from '@/utils/resolvers/server-side/exercises';
import { getUserById } from '@/utils/resolvers/server-side/users';
import { Exercise } from '@/utils/types/exercise';
import { User } from '@/utils/types/user';
import UserUtils from '@/utils/user/userUtils';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useState } from 'react';
import {
  Container, Flex, Group, Heading, Stack,
  StackSeparator,
  Text
} from '@chakra-ui/react';
import { Funnel, Plus } from 'lucide-react';
import Button from '@/lib/buttons/Button';
import CreateExerciseModal from '@/components/exercise/CreateExerciseModal';

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

  const [exercisesList] = useState<Exercise[]>(exercises);
  const [showCreateExerciseModal, setShowCreateExerciseModal] = useState<boolean>(false);

  const isAdmin = UserUtils.isAdminUser(user);

  console.log(exercisesList);

  return (
    <>
      <TCHead title="TC | Exercises" />
      <PageLayout>
        <Container maxW="3xl">
          <Stack gap={6} separator={<StackSeparator />}>
            <Flex alignItems="center" justifyContent="space-between">
              <Heading textStyle="4xl">
                {t('exercises')}
              </Heading>
              <Group gap={3}>
                <Button variant="outline" gap={2}>
                  <Funnel strokeWidth={1.5} size={24} />
                  Filtrera
                </Button>
                <Button variant="solid" gap={2} onClick={() => setShowCreateExerciseModal(true)}>
                  <Plus strokeWidth={1.5} size={24} />
                  {t('create-exercise')}
                </Button>
              </Group>
            </Flex>
            {exercisesList.length > 0 ? (
              <Stack gap={3}>
                {exercisesList.map((exercise) => (
                  <ExerciseManagementCard key={exercise.documentId} exercise={exercise} />
                ))}
              </Stack>
            ) : (
              <Text>{t('no-exercises')}</Text>
            )}
          </Stack>
        </Container>
      </PageLayout>
      <CreateExerciseModal
        isOpen={showCreateExerciseModal}
        onClose={() => setShowCreateExerciseModal(false)}
        exercises={exercisesList}
      />
    </>
  );
};

export default ExercisesPage;
