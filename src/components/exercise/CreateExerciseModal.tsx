import Modal from '@/lib/modal/Modal';
import {
  MuscleGroupsEnum, ExerciseEquipmentEnum, Exercise, ExerciseFatigueEnum, RangeOfMotionBiasEnum,
  SubMuscleGroupsEnum
} from '@/utils/types/exercise';
import {
  createListCollection, Field, Fieldset, Flex, Icon, IconButton, Input, InputGroup, Popover, SegmentGroup, Select, Stack, Tabs, Text,
  Textarea
} from '@chakra-ui/react';
import {
  ChartSpline, CircleHelp, Flame
} from 'lucide-react';
import { TFunction, useTranslation } from 'next-i18next';
import React, { useState } from 'react';

interface CreateExerciseRequiredFormValues {
  exerciseName: string;
  primaryMuscleGroup: MuscleGroupsEnum;
  equipment: ExerciseEquipmentEnum;
}

interface CreateExerciseAdvancedFormValues {
  description?: string;
  secondaryMuscleGroups?: Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
  youtubeVideoId?: string;
  fatigue: ExerciseFatigueEnum;
  rangeOfMotionBias?: RangeOfMotionBiasEnum;
}

interface CreateExerciseFormErrors {
  exerciseName?: CreateExerciseFormFieldError;
  primaryMuscleGroup?: CreateExerciseFormFieldError;
  equipment?: CreateExerciseFormFieldError;
  description?: CreateExerciseFormFieldError;
  secondaryMuscleGroups?: CreateExerciseFormFieldError;
  youtubeVideoId?: CreateExerciseFormFieldError;
  fatigue?: CreateExerciseFormFieldError;
  rangeOfMotionBias?: CreateExerciseFormFieldError;
}

type CreateExerciseFormFieldError = 'required' | 'unique' | 'pattern' | 'min-length' | 'max-length';
type TabValues = 'required' | 'advanced';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  exercises: Array<Exercise>;
}

const CreateExerciseModal = ({ isOpen, onClose, exercises }: Props) => {
  const { t } = useTranslation(['exercises', 'common']);

  const [tab, setTab] = useState<TabValues>('required');

  const requiredFields = ['exerciseName', 'primaryMuscleGroup', 'equipment'];
  const advancedInfoFields = ['description', 'secondaryMuscleGroups', 'youtubeVideoId'];

  const takenExerciseNames = exercises.map((exercise) => exercise.name);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('create-exercise')}
      onPrimaryButtonClick={() => {}}
      size="lg"
      body={(
        <Stack gap={6}>
          <Text textStyle="sm" color="fg.muted">
            {t('create-exercise-description')}
          </Text>
          <Tabs.Root value={tab} onValueChange={(e) => setTab(e.value as TabValues)}>
            <Tabs.List>
              <Tabs.Trigger value="required">Basic Information</Tabs.Trigger>
              <Tabs.Trigger value="advanced">Advanced info</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="required">
              <RequiredInfoForm t={t} />
            </Tabs.Content>
            <Tabs.Content value="advanced">
              <AdvancedInfoForm t={t} />
            </Tabs.Content>
          </Tabs.Root>
        </Stack>
      )}
    />
  );
};

interface FormProps {
  t: TFunction;
}

const RequiredInfoForm = ({ t }: FormProps) => {
  const [formValues, setFormValues] = useState<CreateExerciseRequiredFormValues>({
    exerciseName: '',
    primaryMuscleGroup: MuscleGroupsEnum.CHEST,
    equipment: ExerciseEquipmentEnum.BARBELL,
  });
  const [formErrors, setFormErrors] = useState<CreateExerciseFormErrors>({
    exerciseName: undefined,
    primaryMuscleGroup: undefined,
    equipment: undefined,
  });

  const muscleGroups = createListCollection({
    items: Object.values(MuscleGroupsEnum).map((mg) => ({
      label: t(`common:MUSCLE_GROUPS.${mg}`),
      value: mg,
    }))
  });

  const equipment = createListCollection({
    items: Object.values(ExerciseEquipmentEnum).map((eq) => ({
      label: t(`common:EQUIPMENT.${eq}`),
      value: eq,
    }))
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
      <Fieldset.Content pt={2}>
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
            value={formValues.exerciseName}
            variant="subtle"
          />
          <Field.ErrorText>
            {formErrors.exerciseName && t(`CREATE_EXERCISE_FORM.exerciseName.errors.${formErrors.exerciseName}`)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formErrors.equipment}>
          <Select.Root
            variant="subtle"
            collection={createListCollection({ items: equipment.items })}
            name="equipment"
          >
            <Select.HiddenSelect />
            <Select.Label>
              {t('CREATE_EXERCISE_FORM.equipment.label')}
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText
                  placeholder={t('CREATE_EXERCISE_FORM.equipment.placeholder')}
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content maxH={240}>
                {equipment.items.map((eq) => (
                  <Select.Item item={eq} key={eq.value}>
                    {eq.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          <Field.ErrorText>
            {formErrors.equipment && t(`CREATE_EXERCISE_FORM.equipment.errors.${formErrors.equipment}`)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formErrors.primaryMuscleGroup}>
          <Select.Root
            variant="subtle"
            collection={createListCollection({ items: muscleGroups.items })}
            name="primaryMuscleGroup"
          >
            <Select.HiddenSelect />
            <Select.Label>
              {t('CREATE_EXERCISE_FORM.primaryMuscleGroup.label')}
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText
                  placeholder={t('CREATE_EXERCISE_FORM.primaryMuscleGroup.placeholder')}
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content maxH={320}>
                {muscleGroups.items.map((mg) => (
                  <Select.Item item={mg} key={mg.value}>
                    {mg.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          <Field.ErrorText>
            {formErrors.primaryMuscleGroup && t(`CREATE_EXERCISE_FORM.primaryMuscleGroup.errors.${formErrors.primaryMuscleGroup}`)}
          </Field.ErrorText>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

const AdvancedInfoForm = ({ t }: FormProps) => {
  const [formValues, setFormValues] = useState<CreateExerciseAdvancedFormValues>({
    secondaryMuscleGroups: [],
    description: '',
    youtubeVideoId: '',
    fatigue: ExerciseFatigueEnum.MEDIUM,
    rangeOfMotionBias: RangeOfMotionBiasEnum.FULL,
  });
  const [formErrors, setFormErrors] = useState<CreateExerciseFormErrors>({
    description: undefined,
    secondaryMuscleGroups: undefined,
    youtubeVideoId: undefined,
    fatigue: undefined,
    rangeOfMotionBias: undefined,
  });

  const chestSecondaryMuscleGroups = [SubMuscleGroupsEnum.UPPER_CHEST, SubMuscleGroupsEnum.LOWER_CHEST];
  const backSecondaryMuscleGroups = [SubMuscleGroupsEnum.UPPER_BACK, SubMuscleGroupsEnum.LOWER_BACK, SubMuscleGroupsEnum.LATS, SubMuscleGroupsEnum.SPINAL_ERECTORS];
  const shouldersSecondaryMuscleGroups = [SubMuscleGroupsEnum.FRONT_DELTS, SubMuscleGroupsEnum.SIDE_DELTS, SubMuscleGroupsEnum.REAR_DELTS, SubMuscleGroupsEnum.ROTATOR_CUFF];
  const bicepsSecondaryMuscleGroups = [SubMuscleGroupsEnum.BRACHIALIS];
  const tricepsSecondaryMuscleGroups = [SubMuscleGroupsEnum.TRICEP_LONG_HEAD];
  const forearmSecondaryMuscleGroups = [SubMuscleGroupsEnum.FOREARM_EXTENSORS, SubMuscleGroupsEnum.FOREARM_FLEXORS, SubMuscleGroupsEnum.BRACHIORADIALIS];
  const calvesSecondaryMuscleGroups = [SubMuscleGroupsEnum.GASTROCNEMIUS, SubMuscleGroupsEnum.SOLEUS];

  // const groupedMuscleGroups = [
  //   {
  //     category: t('common:MUSCLE_GROUPS.chest'), // Primary muscle group
  //     options: chestSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.back'),
  //     options: backSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.shoulders'),
  //     options: shouldersSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.biceps'),
  //     options: bicepsSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.triceps'),
  //     options: tricepsSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.quads'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.hamstrings'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.adductors'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.glutes'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.traps'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.forearms'),
  //     options: forearmSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.calves'),
  //     options: calvesSecondaryMuscleGroups.map((option) => ({
  //       label: t(`common:MUSCLE_GROUPS.${option}`),
  //       value: option,
  //     })),
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.abs'),
  //     options: [],
  //   },
  //   {
  //     category: t('common:MUSCLE_GROUPS.neck'),
  //     options: [],
  //   },
  // ];

  const allPrimary = Object.values(MuscleGroupsEnum).map((mg) => ({
    label: t(`common:MUSCLE_GROUPS.${mg}`),
    value: mg,
    category: mg,
  }));

  const getPrimaryMuscleGroup = (secondaryMuscleGroup: SubMuscleGroupsEnum) => {
    switch (true) {
      case chestSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.CHEST;
      case backSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.BACK;
      case shouldersSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.SHOULDERS;
      case bicepsSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.BICEPS;
      case tricepsSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.TRICEPS;
      case forearmSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.FOREARMS;
      case calvesSecondaryMuscleGroups.includes(secondaryMuscleGroup):
        return MuscleGroupsEnum.CALVES;
      default:
        return secondaryMuscleGroup;
    }
  };

  const allSecondary = Object.values(SubMuscleGroupsEnum).map((mg) => ({
    label: t(`common:MUSCLE_GROUPS.${mg}`),
    value: mg,
    category: getPrimaryMuscleGroup(mg),
  }));

  const mergedMuscleGroups = [...allPrimary, ...allSecondary];
  const groupedMGs = Object.groupBy(mergedMuscleGroups, (item) => item.category);

  const secondaryMuscleGroups = createListCollection({
    items: mergedMuscleGroups.map((mg) => ({
      label: t(`common:MUSCLE_GROUPS.${mg.value}`),
      value: mg.value,
      category: mg.category,
    })),
  });

  const getFatigueLevelOptions = () => Object.keys(ExerciseFatigueEnum).map((fatigueLevel) => ({
    label: t(`common:FATIGUE_RATINGS.${fatigueLevel}`),
    value: fatigueLevel,
  }));

  const getRangeOfMotionBiasOptions = () => Object.keys(RangeOfMotionBiasEnum).map((romBias) => ({
    label: t(`common:RANGE_OF_MOTION_BIAS.${romBias}`),
    value: romBias,
  }));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecondaryMuscleGroupChange = (selectedItems: Array<string>) => {
    // Get the current state for comparison
    const currentSelectedItems = formValues.secondaryMuscleGroups || [];
    const itemJustClicked = selectedItems.find((item) => !currentSelectedItems.includes(item as MuscleGroupsEnum | SubMuscleGroupsEnum))
                           || currentSelectedItems.find((item) => !selectedItems.includes(item)) || '';

    // Initialize new selection with the current selected items
    let newSelectedItems: Array<MuscleGroupsEnum | SubMuscleGroupsEnum> = [...currentSelectedItems];

    const isPrimary = (item: string) => Object.values(MuscleGroupsEnum).includes(item as MuscleGroupsEnum);
    const isSecondary = (item: string) => Object.values(SubMuscleGroupsEnum).includes(item as SubMuscleGroupsEnum);

    const getAllSubMuscleGroups = (primaryMuscleGroup: MuscleGroupsEnum): Array<SubMuscleGroupsEnum> => {
      switch (primaryMuscleGroup) {
        case MuscleGroupsEnum.CHEST: return chestSecondaryMuscleGroups;
        case MuscleGroupsEnum.BACK: return backSecondaryMuscleGroups;
        case MuscleGroupsEnum.SHOULDERS: return shouldersSecondaryMuscleGroups;
        case MuscleGroupsEnum.BICEPS: return bicepsSecondaryMuscleGroups;
        case MuscleGroupsEnum.TRICEPS: return tricepsSecondaryMuscleGroups;
        case MuscleGroupsEnum.FOREARMS: return forearmSecondaryMuscleGroups;
        case MuscleGroupsEnum.CALVES: return calvesSecondaryMuscleGroups;
        default: return [];
      }
    };

    const getPrimaryForSub = (sub: SubMuscleGroupsEnum): MuscleGroupsEnum | null => {
      if (chestSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.CHEST;
      if (backSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.BACK;
      if (shouldersSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.SHOULDERS;
      if (bicepsSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.BICEPS;
      if (tricepsSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.TRICEPS;
      if (forearmSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.FOREARMS;
      if (calvesSecondaryMuscleGroups.includes(sub)) return MuscleGroupsEnum.CALVES;
      return null;
    };

    // Handle the clicked item specifically
    if (itemJustClicked) {
      if (isPrimary(itemJustClicked)) {
        const primaryMuscleGroup = itemJustClicked as MuscleGroupsEnum;
        const subGroups = getAllSubMuscleGroups(primaryMuscleGroup);

        if (selectedItems.includes(primaryMuscleGroup)) {
          // If primary group is being selected, add all its sub groups
          newSelectedItems.push(primaryMuscleGroup);
          subGroups.forEach((sub) => {
            if (!newSelectedItems.includes(sub)) {
              newSelectedItems.push(sub);
            }
          });
        } else {
          // If primary group is being deselected, remove it and all its sub groups
          newSelectedItems = newSelectedItems.filter((item) => item !== primaryMuscleGroup && !subGroups.includes(item as SubMuscleGroupsEnum));
        }
      } else if (isSecondary(itemJustClicked)) {
        const secondaryMuscleGroup = itemJustClicked as SubMuscleGroupsEnum;
        const primaryMuscleGroup = getPrimaryForSub(secondaryMuscleGroup);

        if (selectedItems.includes(secondaryMuscleGroup)) {
          // If secondary group is being selected, add it
          if (!newSelectedItems.includes(secondaryMuscleGroup)) {
            newSelectedItems.push(secondaryMuscleGroup);
          }

          // Check if all subgroups are now selected
          if (primaryMuscleGroup) {
            const subGroups = getAllSubMuscleGroups(primaryMuscleGroup);
            const allSubsSelected = subGroups.every((sub) => newSelectedItems.includes(sub));

            if (allSubsSelected && !newSelectedItems.includes(primaryMuscleGroup)) {
              newSelectedItems.push(primaryMuscleGroup);
            }
          }
        } else {
          // If secondary group is being deselected, remove it
          newSelectedItems = newSelectedItems.filter((item) => item !== secondaryMuscleGroup);

          // If primary was selected, it should be deselected as not all subs are selected anymore
          if (primaryMuscleGroup && newSelectedItems.includes(primaryMuscleGroup)) {
            newSelectedItems = newSelectedItems.filter((item) => item !== primaryMuscleGroup);
          }
        }
      }
    } else {
      // If the selection is being cleared or completely changed, use the selectedItems directly
      newSelectedItems = [...selectedItems] as Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
    }

    // Update the form values
    setFormValues({
      ...formValues,
      secondaryMuscleGroups: newSelectedItems,
    });
  };

  return (
    <Fieldset.Root>
      <Fieldset.Content pt={2}>
        <Field.Root invalid={!!formErrors.description}>
          <Field.Label>
            {t('CREATE_EXERCISE_FORM.description.label')}
          </Field.Label>
          <Textarea
            placeholder={t('CREATE_EXERCISE_FORM.description.placeholder')}
            name="description"
            onChange={handleInputChange}
            value={formValues.description}
            variant="subtle"
            maxLength={200}
          />
          <Field.ErrorText>
            {formErrors.description && t(`CREATE_EXERCISE_FORM.description.errors.${formErrors.description}`)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formErrors.youtubeVideoId}>
          <Field.Label>
            {t('CREATE_EXERCISE_FORM.youtubeVideoId.label')}
          </Field.Label>
          <InputGroup
            startElement="https://youtube.com/watch?v="
            startElementProps={{ color: 'fg.muted' }}
          >
            <Input
              ps="26ch"
              name="youtubeVideoId"
              type="text"
              onChange={handleInputChange}
              value={formValues.youtubeVideoId}
              variant="subtle"
            />
          </InputGroup>
          <Field.ErrorText>
            {formErrors.youtubeVideoId && t(`CREATE_EXERCISE_FORM.youtubeVideoId.errors.${formErrors.youtubeVideoId}`)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formErrors.secondaryMuscleGroups}>
          <Select.Root
            variant="subtle"
            collection={createListCollection({ items: secondaryMuscleGroups.items })}
            name="secondaryMuscleGroups"
            multiple
            value={formValues.secondaryMuscleGroups}
            onValueChange={(e) => handleSecondaryMuscleGroupChange(e.value as Array<MuscleGroupsEnum | SubMuscleGroupsEnum>)}
          >
            <Select.HiddenSelect />
            <Select.Label>
              {t('CREATE_EXERCISE_FORM.secondaryMuscleGroups.label')}
            </Select.Label>
            <Select.Control>
              <Select.Trigger>
                <Select.ValueText
                  placeholder={t('CREATE_EXERCISE_FORM.secondaryMuscleGroups.placeholder')}
                />
              </Select.Trigger>
              <Select.IndicatorGroup>
                <Select.ClearTrigger
                  cursor="pointer"
                  onClick={() => setFormValues((prev) => ({ ...prev, secondaryMuscleGroups: [] }))}
                />
                <Select.Indicator />
              </Select.IndicatorGroup>
            </Select.Control>
            <Select.Positioner>
              <Select.Content maxH={330}>
                {Object.entries(groupedMGs).map(([category, items]) => (
                  <Select.ItemGroup key={category}>
                    <Select.ItemGroupLabel>{t(`common:MUSCLE_GROUPS.${category}`)}</Select.ItemGroupLabel>
                    {items.map((item, index, array) => (
                      <Select.Item item={item} key={item.value} pl={index === 0 ? 4 : 8} color="fg.muted">
                        {`${t(`common:MUSCLE_GROUPS.${item.value}`)} ${index === 0 && array.length > 1 ? '(all)' : ''}`}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.ItemGroup>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          <Field.ErrorText>
            {formErrors.secondaryMuscleGroups && t(`CREATE_EXERCISE_FORM.secondaryMuscleGroups.errors.${formErrors.secondaryMuscleGroups}`)}
          </Field.ErrorText>
        </Field.Root>
        <Field.Root invalid={!!formErrors.fatigue}>
          <Field.Label>
            {t('CREATE_EXERCISE_FORM.fatigue.label')}
            <Popover.Root>
              <Popover.Trigger>
                <IconButton
                  aria-label="Learn more"
                  variant="ghost"
                  rounded="full"
                  color="fg.muted"
                >
                  <CircleHelp strokeWidth={1.5} />
                </IconButton>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Flex gap={2} alignItems="center">
                      <Popover.Title fontWeight="medium">
                        Exercise fatigue
                      </Popover.Title>
                      <Icon h={5} w={5}>
                        <Flame strokeWidth={1.5} />
                      </Icon>
                    </Flex>
                    <Text mt="3" fontWeight={400} color="fg.muted">
                      Rate the percieved systemtic exertion of the exercise after completing a few sets. Take into account both axial (spinal) loading and how tired it makes your overall system rather than just how fatigued it makes the target muscle group.
                    </Text>
                    <Text mt="2" fontWeight={400} color="fg.muted">
                      e.g. a Squat would generally be considered as High or Very high fatigue, while a Lateral Raise would generally be considered as Low fatigue.
                    </Text>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Field.Label>
          <SegmentGroup.Root
            value={formValues.fatigue}
            onValueChange={(e) => setFormValues((prev) => ({
              ...prev,
              fatigue: e.value as ExerciseFatigueEnum,
            }))}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items cursor="pointer" items={getFatigueLevelOptions()} />
          </SegmentGroup.Root>
        </Field.Root>
        <Field.Root invalid={!!formErrors.rangeOfMotionBias}>
          <Field.Label>
            {t('CREATE_EXERCISE_FORM.rangeOfMotionBias.label')}
            <Popover.Root>
              <Popover.Trigger>
                <IconButton
                  aria-label="Learn more"
                  variant="ghost"
                  rounded="full"
                  color="fg.muted"
                >
                  <CircleHelp strokeWidth={1.5} />
                </IconButton>
              </Popover.Trigger>
              <Popover.Positioner>
                <Popover.Content>
                  <Popover.Arrow />
                  <Popover.Body>
                    <Flex gap={2} alignItems="center">
                      <Popover.Title fontWeight="medium">
                        Range of Motion Bias
                      </Popover.Title>
                      <Icon h={5} w={5}>
                        <ChartSpline strokeWidth={1.5} />
                      </Icon>
                    </Flex>
                    <Text mt="3" fontWeight={400} color="fg.muted">
                      Which part of the exercise is the most difficult? Is it the shortened, middle or lengthened of the range of motion? Or is it equally difficult throughout the entire range?
                    </Text>
                    <Text mt="2" fontWeight={400} color="fg.muted">
                      e.g. a Squat would generally be considered as Lengthened bias, it is most difficult at the point where the quads are maximally lengthened. On the other hand, a Lateral Raise would be considered as a Shortened biased R.O.M, is it most difficult at the top, when the muscle is maximally shortened.
                    </Text>
                  </Popover.Body>
                </Popover.Content>
              </Popover.Positioner>
            </Popover.Root>
          </Field.Label>
          <SegmentGroup.Root
            value={formValues.rangeOfMotionBias}
            onValueChange={(e) => setFormValues((prev) => ({
              ...prev,
              rangeOfMotionBias: e.value as RangeOfMotionBiasEnum,
            }))}
          >
            <SegmentGroup.Indicator />
            <SegmentGroup.Items cursor="pointer" items={getRangeOfMotionBiasOptions()} />
          </SegmentGroup.Root>
        </Field.Root>
      </Fieldset.Content>
    </Fieldset.Root>
  );
};

export default CreateExerciseModal;
