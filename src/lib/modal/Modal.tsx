import React from 'react';
import {
  Dialog, CloseButton, Group, Stack, Box,
  DialogRootProps
} from '@chakra-ui/react';
import Button from '@/lib/buttons/Button';
import { useTranslation } from 'next-i18next';

// @ts-ignore
interface ModalProps extends DialogRootProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  body: React.ReactNode;
  children?: React.ReactNode;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  tertieryActionItem?: React.ReactNode;
  tertieryActionItemAlignment?: 'default' | 'with-content';
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  titleTextSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  primaryButtonIcon?: React.ReactNode;
  secondaryButtonIcon?: React.ReactNode;
  loading?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  body,
  primaryButtonText,
  secondaryButtonText,
  tertieryActionItem,
  tertieryActionItemAlignment,
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  titleTextSize = 'xl',
  primaryButtonIcon,
  secondaryButtonIcon,
  loading = false,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation('common');
  return (
    <Dialog.Root
      lazyMount
      scrollBehavior="inside"
      open={isOpen}
      onOpenChange={(e) => !e.open && onClose()}
      motionPreset="scale"
      {...rest}
    >
      <Dialog.Backdrop style={{
        backdropFilter: 'blur(2px)',
      }}
      />
      <Dialog.Positioner>
        <Dialog.Content rounded="xl">
          <Dialog.Header borderBottomWidth={1} borderColor="bg.muted">
            <Dialog.Title textStyle={titleTextSize}>
              {title}
            </Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Stack gap={3} pt={2}>
              {body}
            </Stack>
          </Dialog.Body>
          <Dialog.Footer justifyContent="space-between" borderTopWidth={1} borderColor="bg.muted">
            {tertieryActionItem && (
              <Box
                {
                  ...(tertieryActionItemAlignment === 'with-content' && {
                    ml: '-16px'
                  })
                }
              >
                {tertieryActionItem}
              </Box>
            )}
            <Group gap={3} flex={1} justifyContent="flex-end">
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" onClick={onSecondaryButtonClick || onClose}>
                  {secondaryButtonIcon}
                  {secondaryButtonText ?? t('cancel')}
                </Button>
              </Dialog.ActionTrigger>
              <Button
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
