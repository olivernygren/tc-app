export interface Exercise {
  documentId: string;
  name: string;
  description?: string;
  equipment: ExerciseEquipmentEnum;
  primaryMuscleGroup: MuscleGroupsEnum;
  secondaryMuscleGroups?: Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
  fatigue?: ExerciseFatigueEnum;
  rangeOfMotionBias?: RangeOfMotionBiasEnum;
}

export interface ExerciseInput {
  name: string;
  description?: string;
  equipment: ExerciseEquipmentEnum;
  primaryMuscleGroup: MuscleGroupsEnum;
  secondaryMuscleGroups?: Array<MuscleGroupsEnum | SubMuscleGroupsEnum>;
  fatigue?: ExerciseFatigueEnum;
  rangeOfMotionBias?: RangeOfMotionBiasEnum;
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
