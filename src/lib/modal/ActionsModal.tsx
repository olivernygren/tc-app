'use client';

import React from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from 'next-i18next';
import theme, { devices } from '@/utils/theme';
import { ButtonColorType } from '@/utils/types/elements';
import Modal, { ModalProps } from './Modal';
import { NormalTypography } from '../Typography';
import Button from '../buttons/Button';

interface ActionsModalProps extends ModalProps {
  onConfirm: () => void;
  confirmButtonText: string;
  customCancelButtonText?: string;
  customButtonsColor?: ButtonColorType;
  message?: string;
  loading?: boolean;
  fixedButtons?: boolean;
  hideCancelButton?: boolean;
  confirmButtonDisabled?: boolean;
}

const ActionsModal = ({
  onConfirm,
  confirmButtonText,
  customCancelButtonText,
  customButtonsColor,
  message,
  loading,
  fixedButtons,
  title,
  children,
  onClose,
  size,
  headerDivider,
  mobileBottomSheet,
  mobileFullScreen,
  hideCancelButton = false,
  confirmButtonDisabled,
}: ActionsModalProps) => {
  const { t } = useTranslation('common');

  return (
    <Modal
      title={title}
      onClose={onClose}
      size={size}
      headerDivider={headerDivider}
      mobileBottomSheet={mobileBottomSheet}
      mobileFullScreen={mobileFullScreen}
      noPadding
    >
      <ActionModalContent headerDivider={headerDivider}>
        {message && (
          <NormalTypography variant="m" color={theme.colors.silverDark}>
            {message}
          </NormalTypography>
        )}
        {children}
      </ActionModalContent>
      <ButtonsContainer fixedButtons={fixedButtons}>
        {!hideCancelButton && (
          <Button
            variant="secondary"
            color={customButtonsColor || 'charcoal'}
            onClick={onClose}
            fullWidth
          >
            {customCancelButtonText || t('cancel')}
          </Button>
        )}
        <Button
          onClick={onConfirm}
          color={customButtonsColor || 'gold'}
          fullWidth
          loading={loading}
          disabled={confirmButtonDisabled}
        >
          {confirmButtonText}
        </Button>
      </ButtonsContainer>
    </Modal>
  );
};

const ActionModalContent = styled.div<{ headerDivider?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.m};
  padding: ${({ headerDivider }) => (headerDivider ? theme.spacing.m : 0)} ${theme.spacing.l} ${theme.spacing.l} ${theme.spacing.l};
  flex-grow: 1;
  overflow-y: auto;
  
  @media ${devices.tablet} {
    padding: ${({ headerDivider }) => (headerDivider ? theme.spacing.m : 0)} ${theme.spacing.s} ${theme.spacing.m} ${theme.spacing.s};
  }
`;

const ButtonsContainer = styled.div<{ fixedButtons?: boolean }>`
  display: flex;
  gap: ${theme.spacing.s};
  width: 100%;
  box-sizing: border-box;
  
  ${({ fixedButtons }) => (fixedButtons ? css`
    border-top: 1px solid ${theme.colors.silverSofter};
    padding: ${theme.spacing.m} ${theme.spacing.l};
    
    @media ${devices.tablet} {
      padding: ${theme.spacing.s} ${theme.spacing.s} ${theme.spacing.m} ${theme.spacing.s};
    }
  ` : css`
    padding: 0 ${theme.spacing.l} ${theme.spacing.l} ${theme.spacing.l};

    @media ${devices.tablet} {
      padding: 0 ${theme.spacing.m} ${theme.spacing.l} ${theme.spacing.m};
    }
  `)}
`;

export default ActionsModal;
