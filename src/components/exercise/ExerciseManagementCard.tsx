import IconButton from '@/lib/buttons/IconButton';
import { EmphasisTypography, NormalTypography } from '@/lib/typography/Typography';
import theme from '@/utils/theme';
import { Exercise } from '@/utils/types/exercise';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import React from 'react';
import styled from 'styled-components';

interface Props {
  exercise: Exercise;
}

const ExerciseManagementCard = ({ exercise }: Props) => (
  <Card>
    <Content>
      <NormalTypography variant="s" color={theme.colors.silver}>
        {exercise.primaryMuscleGroup}
      </NormalTypography>
      <EmphasisTypography variant="m">
        {exercise.name}
      </EmphasisTypography>
    </Content>
    <IconButton
      onClick={() => {}}
      shape="round"
      backgroundColors={{
        hover: theme.colors.charcoalSofter,
        active: theme.colors.charcoalBleach,
      }}
    >
      <EllipsisVerticalIcon width={24} height={24} />
    </IconButton>
  </Card>
);

const Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.m};
  padding: ${theme.spacing.s} ${theme.spacing.s} ${theme.spacing.s} ${theme.spacing.s};
  border-radius: ${theme.borderRadius.l};
  background-color: ${theme.colors.charcoalSoft};
  border: 1px solid ${theme.colors.charcoalSofter};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xxs};
`;

export default ExerciseManagementCard;
