import { ExerciseInstanceType, MuscleGroupsEnum } from './exercise';

export interface Workout {
  id: string;
  name: string;
  description?: string;
  notes?: Array<string>;
  weekdayLabel?: string;
  microcycle: number;
  exercises: Array<ExerciseInstanceType>;
  isCompleted: boolean;
  wasSkipped: boolean;
  isInProgress: boolean;
  isFullyPlanned?: boolean;
  previousSorenessRatings?: Array<number>;
}

export interface WorkoutInput {
  id: string;
  name: string;
  description?: string;
  notes?: Array<string>;
  weekdayLabel?: string;
  microcycle: number;
  exercises: Array<ExerciseInstanceType>;
  isCompleted: boolean;
  wasSkipped: boolean;
  isInProgress: boolean;
  isFullyPlanned?: boolean;
}

export interface PreviousSorenessRating {
  sorenessRating: number;
  muscleGroup: MuscleGroupsEnum;
}
