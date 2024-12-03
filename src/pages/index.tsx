import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TCHead from '@/components/head/TCHead';
import theme from '@/utils/theme';
import { EmphasisTypography, HeadingsTypography, NormalTypography } from '@/lib/Typography';
import styled from 'styled-components';
import { useState } from 'react';
import {
  ExerciseEquipmentEnum, ExerciseFatigueEnum, MuscleGroupsEnum, RangeOfMotionBiasEnum, SubMuscleGroupsEnum
} from '@/utils/types/exercise';
import { createExercise } from '@/utils/resolvers/exercises';
import Button from '@/lib/buttons/Button';

export async function getStaticProps(context: any) {
  return {
    props: {
      users: [],
      ...(await serverSideTranslations(context.locale, ['common'])),
    },
  };
}

interface HomePageProps {
  users: any;
}

export const HomePage = ({ users }: HomePageProps) => {
  const { t } = useTranslation('common');

  const [exerciseName, setExerciseName] = useState('');
  const [exerciseEquipment, setExerciseEquipment] = useState<ExerciseEquipmentEnum>(ExerciseEquipmentEnum.MACHINE);
  const [exercisePrimaryMuscle, setExercisePrimaryMuscle] = useState<MuscleGroupsEnum>(MuscleGroupsEnum.CHEST);
  const [exerciseSecondaryMuscles, setExerciseSecondaryMuscles] = useState<Array<MuscleGroupsEnum | SubMuscleGroupsEnum>>([]);
  const [exerciseFatigue, setExerciseFatigue] = useState<ExerciseFatigueEnum>(ExerciseFatigueEnum.LOW);
  const [rangeOfMotionBias, setRangeOfMotionBias] = useState<RangeOfMotionBiasEnum>(RangeOfMotionBiasEnum.SHORTENED);

  const handleSecondaryMusclesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(e.currentTarget.selectedOptions, (option) => option.value as MuscleGroupsEnum | SubMuscleGroupsEnum);
    setExerciseSecondaryMuscles(selectedOptions);
  };

  const handleReset = () => {
    setExerciseName('');
    setExerciseEquipment(ExerciseEquipmentEnum.MACHINE);
    setExercisePrimaryMuscle(MuscleGroupsEnum.CHEST);
    setExerciseSecondaryMuscles([]);
    setExerciseFatigue(ExerciseFatigueEnum.LOW);
    setRangeOfMotionBias(RangeOfMotionBiasEnum.SHORTENED);
  };

  const capitalizeFirstLetterOfEachWord = (str: string) => str.replace(/\b\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1));

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const capitalizedValue = capitalizeFirstLetterOfEachWord(e.currentTarget.value);
    setExerciseName(capitalizedValue);
  };

  const handleSubmit = async () => {
    const input = {
      name: exerciseName,
      equipment: exerciseEquipment,
      primaryMuscleGroup: exercisePrimaryMuscle,
      secondaryMuscleGroups: exerciseSecondaryMuscles,
      fatigue: exerciseFatigue,
      rangeOfMotionBias,
    };

    try {
      await createExercise(input, () => {
        console.log('Exercise created!');
        handleReset();
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TCHead title="TC | Home" />
      <div>
        <HeadingsTypography variant="h1">Hello, world!</HeadingsTypography>
        <EmphasisTypography>{t('test')}</EmphasisTypography>
        {users?.map((user: any) => (
          <div key={user.documentId}>
            <p style={{ color: theme.colors.white }}>{user.email}</p>
          </div>
        ))}
      </div>
      <Form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      >
        <HeadingsTypography variant="h4">Skapa övning</HeadingsTypography>
        <LabeledInput>
          <EmphasisTypography variant="s">Exercise name</EmphasisTypography>
          <StyledInput
            type="text"
            placeholder="Övningens namn"
            value={exerciseName}
            onChange={(e) => handleNameChange(e)}
          />
        </LabeledInput>
        <LabeledInput>
          <EmphasisTypography variant="s">Equipment</EmphasisTypography>
          <StyledSelect
            value={exerciseEquipment}
            onChange={(e) => setExerciseEquipment(e.currentTarget.value as ExerciseEquipmentEnum)}
          >
            {Object.values(ExerciseEquipmentEnum).map((equipment) => (
              <option key={equipment} value={equipment}>{equipment}</option>
            ))}
          </StyledSelect>
        </LabeledInput>
        <LabeledInput>
          <EmphasisTypography variant="s">Primary muscle group</EmphasisTypography>
          <StyledSelect
            value={exercisePrimaryMuscle}
            onChange={(e) => setExercisePrimaryMuscle(e.currentTarget.value as MuscleGroupsEnum)}
          >
            {Object.values(MuscleGroupsEnum).map((muscle) => (
              <option key={muscle} value={muscle}>{muscle}</option>
            ))}
          </StyledSelect>
        </LabeledInput>
        <LabeledInput>
          <EmphasisTypography variant="s">Secondary muscle groups</EmphasisTypography>
          <StyledSelect
            multiple
            value={exerciseSecondaryMuscles}
            onChange={(e) => handleSecondaryMusclesChange(e)}
          >
            {Object.values(MuscleGroupsEnum).map((muscle) => (
              <option key={muscle} value={muscle}>{muscle}</option>
            ))}
            {Object.values(SubMuscleGroupsEnum).map((muscle) => (
              <option key={muscle} value={muscle}>{muscle}</option>
            ))}
          </StyledSelect>
          {exerciseSecondaryMuscles.map((muscle) => (
            <NormalTypography variant="s" key={muscle}>{muscle}</NormalTypography>
          ))}
        </LabeledInput>
        <LabeledInput>
          <EmphasisTypography variant="s">Fatigue level</EmphasisTypography>
          <StyledSelect
            value={exerciseFatigue}
            onChange={(e) => setExerciseFatigue(e.currentTarget.value as ExerciseFatigueEnum)}
          >
            {Object.values(ExerciseFatigueEnum).map((fatigue) => (
              <option key={fatigue} value={fatigue}>{fatigue}</option>
            ))}
          </StyledSelect>
        </LabeledInput>
        <LabeledInput>
          <EmphasisTypography variant="s">Range of motion bias</EmphasisTypography>
          <StyledSelect
            value={rangeOfMotionBias}
            onChange={(e) => setRangeOfMotionBias(e.currentTarget.value as RangeOfMotionBiasEnum)}
          >
            {Object.values(RangeOfMotionBiasEnum).map((bias) => (
              <option key={bias} value={bias}>{bias}</option>
            ))}
          </StyledSelect>
        </LabeledInput>
        <Button
          variant="primary"
          type="submit"
          disabled={!exerciseName}
        >
          Create exercise
        </Button>
      </Form>
    </>
  );
};

const StyledInput = styled.input`
  background-color: ${theme.colors.charcoalSoft};
  border: none;
  border-radius: ${theme.borderRadius.m};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs};
  width: 100%;
  outline: none;
  max-width: 400px;
`;

const StyledSelect = styled.select`
  background-color: ${theme.colors.charcoalSoft};
  border: none;
  border-radius: ${theme.borderRadius.m};
  color: ${theme.colors.white};
  padding: ${theme.spacing.xs};
  width: 100%;
  outline: none;
  max-width: 400px;
  overflow: auto;
`;

const LabeledInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
`;

export default HomePage;
