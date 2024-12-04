export interface Exercise {
  documentId: string;
  name: string;
  description?: string;
  equipment: ExerciseEquipmentEnum;
  primaryMuscleGroup: MuscleGroupsEnum;
  secondaryMuscleGroups?: Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
  fatigue?: ExerciseFatigueEnum;
  rangeOfMotionBias?: RangeOfMotionBiasEnum;
  creatorId: string;
  isCustomExercise?: boolean;
}

export interface ExerciseInstance {
  exercise: Exercise;
  sets: Array<ExerciseSet>;
  notes?: Array<string>;
}

export interface SupersetInstance {
  firstExercise: ExerciseInstance;
  secondExercise: ExerciseInstance;
}

export type ExerciseInstanceType = ExerciseInstance | SupersetInstance;

export interface ExerciseSet {
  load?: ExerciseLoad;
  completedReps?: number;
  type: ExerciseSetTypeEnum;
  wasSkipped?: boolean;
  targetRIR?: number;
  actualRIR?: number;
  isCompleted: boolean;
}

export interface ExerciseLoad {
  weight: number;
  unit: ExerciseLoadUnitEnum;
}

export interface ExerciseInput {
  name: string;
  description?: string;
  equipment: ExerciseEquipmentEnum;
  primaryMuscleGroup: MuscleGroupsEnum;
  secondaryMuscleGroups?: Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
  fatigue?: ExerciseFatigueEnum;
  rangeOfMotionBias?: RangeOfMotionBiasEnum;
  creatorId?: string;
  isCustomExercise?: boolean;
}

export interface ExerciseProgressHistory {
  exercise: Exercise;
  sets: Array<ExerciseSet>;
}

export enum ExerciseEquipmentEnum {
  BODYWEIGHT = 'Bodyweight',
  DUMBBELL = 'Dumbbell',
  BARBELL = 'Barbell',
  EZ_BAR = 'EZ Bar',
  BODYWEIGHT_LOADABLE = 'Bodyweight Loadable',
  CABLE = 'Cable',
  MACHINE = 'Machine',
  ASSISTED_MACHINE = 'Assisted Machine',
  SMITH_MACHINE = 'Smith Machine',
}

export enum MuscleGroupsEnum {
  CHEST = 'Chest',
  BACK = 'Back',
  SHOULDERS = 'Shoulders',
  BICEPS = 'Biceps',
  TRICEPS = 'Triceps',
  QUADS = 'Quads',
  HAMSTRINGS = 'Hamstrings',
  ADDUCTORS = 'Adductors',
  GLUTES = 'Glutes',
  CALVES = 'Calves',
  FOREARMS = 'Forearms',
  TRAPS = 'Traps',
  NECK = 'Neck',
  ABS = 'Abs',
}

export enum SubMuscleGroupsEnum {
  UPPER_CHEST = 'Upper Chest',
  LOWER_CHEST = 'Lower Chest',
  LATS = 'Lats',
  UPPER_BACK = 'Upper Back',
  LOWER_BACK = 'Lower Back',
  SPINAL_ERECTORS = 'Spinal Erectors',
  REAR_DELTS = 'Rear Delts',
  SIDE_DELTS = 'Side Delts',
  FRONT_DELTS = 'Front Delts',
  TRICEP_LONG_HEAD = 'Tricep Long Head',
  ROTATOR_CUFF = 'Rotator Cuff',
  BRACHIALIS = 'Brachialis',
  BRACHIORADIALIS = 'Brachioradialis',
  FOREARM_FLEXORS = 'Forearm Flexors',
  FOREARM_EXTENSORS = 'Forearm Extensors',
}

export enum ExerciseFatigueEnum {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  VERY_HIGH = 'Very High',
}

export enum RangeOfMotionBiasEnum {
  FULL = 'Full',
  SHORTENED = 'Shortened',
  LENGTHENED = 'Lengthened',
  MID = 'Mid',
}

export enum ExerciseLoadUnitEnum {
  KG = 'kg',
  LBS = 'lbs',
}

export enum ExerciseSetTypeEnum {
  STRAIGHT_SET = 'Straight set',
  MYOREPS = 'Myoreps',
  MYOREP_MATCH = 'Myorep match',
  DROP_SET = 'Drop set',
}
