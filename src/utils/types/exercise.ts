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
  dateISO: string;
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
  youtubeVideoId?: string;
}

export interface ExerciseProgressHistory {
  exercise: Exercise;
  sets: Array<ExerciseSet>;
}

export enum ExerciseEquipmentEnum {
  BODYWEIGHT = 'bodyweight',
  DUMBBELL = 'dumbbell',
  BARBELL = 'barbell',
  EZ_BAR = 'ez-bar',
  BODYWEIGHT_LOADABLE = 'bodyweight-loadable',
  CABLE = 'cable',
  MACHINE = 'machine',
  ASSISTED_MACHINE = 'assisted-machine',
  SMITH_MACHINE = 'smith-machine',
}

export enum MuscleGroupsEnum {
  CHEST = 'chest',
  BACK = 'back',
  SHOULDERS = 'shoulders',
  BICEPS = 'biceps',
  TRICEPS = 'triceps',
  QUADS = 'quads',
  HAMSTRINGS = 'hamstrings',
  ADDUCTORS = 'adductors',
  GLUTES = 'glutes',
  CALVES = 'calves',
  FOREARMS = 'forearms',
  TRAPS = 'traps',
  NECK = 'neck',
  ABS = 'abs',
}

export enum SubMuscleGroupsEnum {
  UPPER_CHEST = 'upper-chest',
  LOWER_CHEST = 'lower-chest',
  LATS = 'lats',
  UPPER_BACK = 'upper-back',
  LOWER_BACK = 'lower-back',
  SPINAL_ERECTORS = 'spinal-erectors',
  REAR_DELTS = 'rear-delts',
  SIDE_DELTS = 'side-delts',
  FRONT_DELTS = 'front-delts',
  TRICEP_LONG_HEAD = 'tricep-long-head',
  ROTATOR_CUFF = 'rotator-cuff',
  BRACHIALIS = 'brachialis',
  BRACHIORADIALIS = 'brachioradialis',
  FOREARM_FLEXORS = 'forearm-flexors',
  FOREARM_EXTENSORS = 'forearm-extensors',
  SOLEUS = 'soleus',
  GASTROCNEMIUS = 'gastroc',
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
