import React from 'react';
import {
  Dialog, CloseButton, Group, Stack, Box
} from '@chakra-ui/react';
import Button from '@/lib/buttons/Button';
import { useTranslation } from 'next-i18next';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  tertiaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onTertiaryButtonClick?: () => void;
  tertiaryButtonColor?: string;
  showButtons?: ('primary' | 'secondary' | 'tertiary')[];
  titleTextSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  primaryButtonIcon?: React.ReactNode;
  secondaryButtonIcon?: React.ReactNode;
  tertiaryButtonIcon?: React.ReactNode;
  loading?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  body,
  primaryButtonText,
  secondaryButtonText,
  tertiaryButtonText,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onTertiaryButtonClick,
  showButtons = ['primary', 'secondary'],
  tertiaryButtonColor = 'red.500',
  titleTextSize = 'xl',
  primaryButtonIcon,
  secondaryButtonIcon,
  tertiaryButtonIcon,
  loading = false,
}: ModalProps) => {
  const { t } = useTranslation('common');
  return (
    <Dialog.Root
      lazyMount
      scrollBehavior="inside"
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      size="md"
      motionPreset="scale"
      placement="center"
    >
      <Dialog.Backdrop style={{
        backdropFilter: 'blur(2px)',
      }}
      />
      <Dialog.Positioner>
        <Dialog.Content rounded="xl">
          <Dialog.Header>
            <Dialog.Title textStyle={titleTextSize}>
              {title}
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Stack gap={3}>
              {body}
            </Stack>
          </Dialog.Body>
          <Dialog.Footer justifyContent="space-between">
            <Box ml="-16px" hidden={!showButtons?.includes('tertiary')}>
              <Button
                variant="plain"
                onClick={onTertiaryButtonClick}
                color={tertiaryButtonColor}
              >
                {tertiaryButtonIcon}
                {tertiaryButtonText ?? t('delete')}
              </Button>
            </Box>
            <Group gap={3} flex={1} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild hidden={!showButtons?.includes('secondary')}>
                <Button variant="outline" onClick={onSecondaryButtonClick || onClose}>
                  {secondaryButtonIcon}
                  {secondaryButtonText ?? t('cancel')}
                </Button>
              </Dialog.ActionTrigger>
              <Button
                hidden={!showButtons?.includes('primary')}
                onClick={onPrimaryButtonClick}
                loading={loading}
              >
                {primaryButtonIcon}
                {primaryButtonText ?? t('save')}
              </Button>
            </Group>
          </Dialog.Footer>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" rounded="lg" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default Modal;
