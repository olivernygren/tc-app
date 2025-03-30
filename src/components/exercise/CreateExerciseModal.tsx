import Modal from '@/lib/modal/Modal';
import { MuscleGroupsEnum, ExerciseEquipmentEnum, Exercise } from '@/utils/types/exercise';
import { Field, Fieldset, Input } from '@chakra-ui/react';
import { TFunction, useTranslation } from 'next-i18next';
import React, { useState } from 'react';

interface CreateExerciseFormValues {
  exerciseName: string;
  primaryMuscleGroup: MuscleGroupsEnum;
  equipment: ExerciseEquipmentEnum;
  description?: string;
  secondaryMuscleGroups?: MuscleGroupsEnum[];
  exerciseVideoUrl?: string;
}

interface CreateExerciseFormErrors {
  exerciseName?: CreateExerciseFormFieldError;
  primaryMuscleGroup?: CreateExerciseFormFieldError;
  equipment?: CreateExerciseFormFieldError;
  description?: CreateExerciseFormFieldError;
  secondaryMuscleGroups?: CreateExerciseFormFieldError;
  exerciseVideoUrl?: CreateExerciseFormFieldError;
}

type CreateExerciseFormFieldError = 'required' | 'unique' | 'pattern' | 'min-length' | 'max-length';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exercises: Array<Exercise>;
}

const CreateExerciseModal = ({ isOpen, onClose, exercises }: Props) => {
  const { t } = useTranslation('exercises');

  const requiredFields = ['exerciseName', 'primaryMuscleGroup', 'equipment'];
  const advancedInfoFields = ['description', 'secondaryMuscleGroups', 'exerciseVideoUrl'];

  const takenExerciseNames = exercises.map((exercise) => exercise.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('create-exercise')}
      onPrimaryButtonClick={() => {}}
      body={(
        <Form t={t} />
      )}
    />
  );
};

interface FormProps {
  t: TFunction;
}

const Form = ({ t }: FormProps) => {
  const [formValues, setFormValues] = useState<CreateExerciseFormValues>({
    exerciseName: '',
    primaryMuscleGroup: MuscleGroupsEnum.CHEST,
    equipment: ExerciseEquipmentEnum.BARBELL,
    description: '',
    secondaryMuscleGroups: [],
    exerciseVideoUrl: '',
  });
  const [formErrors, setFormErrors] = useState<CreateExerciseFormErrors>({
    exerciseName: undefined,
    primaryMuscleGroup: undefined,
    equipment: undefined,
    description: undefined,
    secondaryMuscleGroups: undefined,
    exerciseVideoUrl: undefined,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Fieldset.Root>
      <Fieldset.HelperText>
        {t('create-exercise-description')}
      </Fieldset.HelperText>
      <Fieldset.Content>
        <Field.Root invalid={!!formErrors.exerciseName}>
          <Field.Label>
            {t('CREATE_EXERCISE_FORM.exerciseName.label')}
          </Field.Label>
          <Input
            autoFocus
            placeholder={t('CREATE_EXERCISE_FORM.exerciseName.placeholder')}
            name="exerciseName"
            type="text"
            required
            onChange={handleInputChange}
          />
          <Field.ErrorText>
            {formErrors.exerciseName && t(`CREATE_EXERCISE_FORM.exerciseName.errors.${formErrors.exerciseName}`)}
          </Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default CreateExerciseModal;
