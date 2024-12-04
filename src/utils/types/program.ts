import { MuscleGroupsEnum } from './exercise';
import { Workout } from './workout';

export interface Program {
  documentId: string;
  name: string;
  description?: string;
  workouts: Array<Workout>;
  structure: ProgramStructureEnum;
  type: ProgramTypeEnum;
  summary: ProgramSummary;
  isActive: boolean;
  creatorId: string;
  createdAt: Date;
  endedAt?: Date;
  presetId?: string;
  isCompleted: boolean;
  numberOfMicrocycles: number;
  schedule: MicrocycleSchedule;
  trainingDaysPerMicrocycle: number;
  priorityMuscleGroups: Array<MuscleGroupsEnum>;
}

export interface MicrocycleSchedule {
  day: number;
  isRestDay: boolean;
}

export interface ProgramStats {
  volumeProgressions: Array<VolumeProgression>;
}

export interface ProgramSummary {
  stats: ProgramStats;
}

export interface VolumeProgression {
  microcycle: number;
  muscleGroup: MuscleGroupsEnum;
  sets: number;
}

export enum ProgramStructureEnum {
  CUSTOM = 'Custom',
  PRESET = 'Preset',
  WEEKLY = 'Weekly',
}

export enum ProgramTypeEnum {
  PROGRESSIVE = 'Progressive',
  SIMPLE = 'Simple',
}
