import theme, { devices } from '@/utils/theme';
import React from 'react';
import styled, { createGlobalStyle, css } from 'styled-components';
import { getModalBorderRadius, getModalContentPadding, getModalWidth } from '@/utils/styles/styleHelpers';
import { ModalSizeType } from '@/utils/types/elements';
import { XMarkIcon } from '@heroicons/react/24/outline';
import IconButton from '../buttons/IconButton';
import { HeadingsTypography } from '../Typography';

export interface ModalProps {
  title?: string;
  children?: React.ReactNode;
  onClose: () => void;
  size?: ModalSizeType;
  headerDivider?: boolean;
  mobileBottomSheet?: boolean;
  mobileFullScreen?: boolean;
  noPadding?: boolean;
  isCloseable?: boolean;
}

const Modal = ({
  title, children, onClose, size, headerDivider, mobileBottomSheet, mobileFullScreen, noPadding, isCloseable = true,
}: ModalProps) => (
  <>
    <Backdrop
      className={`modal-backdrop${mobileBottomSheet ? ' mobile-bottom-sheet' : ''}`}
      mobileBottomSheet={mobileBottomSheet}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <ModalContainer
        size={size}
        mobileBottomSheet={mobileBottomSheet}
        mobileFullScreen={mobileFullScreen}
      >
        <Header headerDivider={headerDivider}>
          {title && <HeadingsTypography variant="h4">{title}</HeadingsTypography>}
          {isCloseable && (
            <IconButton
              onClick={onClose}
              backgroundColors={{ hover: theme.colors.charcoalSoft, active: theme.colors.charcoalSofter }}
            >
              <XMarkIcon width={24} height={24} color={theme.colors.silver} />
            </IconButton>
          )}
        </Header>
        <ModalContent
          headerDivider={headerDivider}
          noPadding={noPadding}
        >
          {children}
        </ModalContent>
      </ModalContainer>
    </Backdrop>
    <GlobalStyle />
  </>
);

const Backdrop = styled.div<{ mobileBottomSheet?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
  will-change: transform;
  animation: fadeInBackdrop 0.15s ease;
  
  @media ${devices.tablet} {
    align-items: ${({ mobileBottomSheet }) => (mobileBottomSheet ? 'flex-end' : 'center')};
  }

  @keyframes fadeInBackdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ModalContainer = styled.div<{ size: ModalSizeType | undefined, mobileBottomSheet?: boolean, mobileFullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.charcoal};
  max-height: 85vh;
  width: ${({ size, mobileBottomSheet }) => getModalWidth(size, false, mobileBottomSheet)};
  border-radius: ${theme.borderRadius.l};
  height: auto;
  animation: slideInModal 0.3s ease;
  
  @media ${devices.tablet} {
    max-height: ${({ mobileFullScreen }) => (mobileFullScreen ? '100dvh' : '90vh')};
    border-radius: ${({ mobileBottomSheet, mobileFullScreen }) => getModalBorderRadius(mobileBottomSheet, mobileFullScreen)};
    height: fit-content;
    width: ${({ size, mobileBottomSheet }) => getModalWidth(size, true, mobileBottomSheet)};
    ${({ mobileFullScreen }) => mobileFullScreen && 'height: 100dvh;'}
  }

  @keyframes slideInModal {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ModalContent = styled.div<{ headerDivider?: boolean, noPadding?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ noPadding }) => (noPadding ? 0 : theme.spacing.m)};
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: ${({ headerDivider, noPadding }) => getModalContentPadding(noPadding, headerDivider, false)};
  position: relative;
  overflow-y: auto;
  
  @media ${devices.tablet} {
    padding: ${({ headerDivider, noPadding }) => getModalContentPadding(noPadding, headerDivider, true)};
  }
`;

const Header = styled.div<{ headerDivider?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.spacing.l} ${theme.spacing.l} ${theme.spacing.m} ${theme.spacing.l};
  
  ${({ headerDivider }) => headerDivider && css`
    border-bottom: 1px solid ${theme.colors.silverSofter};
    padding-bottom: ${theme.spacing.m};
  `}
  
  @media ${devices.tablet} {
    padding: ${theme.spacing.l} ${theme.spacing.s} ${theme.spacing.m} ${theme.spacing.s};
  }
`;

const GlobalStyle = createGlobalStyle`
  body, html {
    overflow: hidden;
  }
`;

export default Modal;
