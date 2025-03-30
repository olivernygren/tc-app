import { Exercise } from '@/utils/types/exercise';
import React from 'react';
import {
  Box, IconButton, Stack, Text
} from '@chakra-ui/react';
import { EllipsisVertical } from 'lucide-react';

interface Props {
  exercise: Exercise;
}

const ExerciseManagementCard = ({ exercise }: Props) => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    p={3}
    bg="bg.subtle"
    rounded="lg"
    borderWidth={1}
    borderColor="border.muted"
  >
    <Stack gap={1}>
      <Text color="fg.subtle" textStyle="sm">
        {exercise.primaryMuscleGroup}
      </Text>
      <Text textStyle="md" fontWeight={500} color="fg.default">
        {exercise.name}
      </Text>
    </Stack>
    <IconButton variant="ghost" rounded="full" size="md" aria-label="Options">
      <EllipsisVertical
        strokeWidth={1.5}
        size={24}
        color="white"
      />
    </IconButton>
  </Box>
);

export default ExerciseManagementCard;
