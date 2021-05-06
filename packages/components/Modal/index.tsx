import {
  Button,
  Modal as ModalWrapper,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps as ModalWrapperProps,
} from '@chakra-ui/react';
import { NominationService } from '@shopify/core';
import React from 'react';

interface ModalProps extends ModalWrapperProps {
  title?: string;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent background='white'>
        {title && <ModalHeader color='gray.800'>{title}</ModalHeader>}

        <ModalCloseButton color='gray.800' />

        <ModalBody color='gray.800'>{children}</ModalBody>

        <ModalFooter>
          <Button
            background='gray.800'
            mr={3}
            onClick={onClose}
            _hover={{
              background: 'gray.500',
            }}
          >
            Close
          </Button>
          <Button
            background='red.500'
            variant='solid'
            onClick={() => {
              onClose();
              NominationService.clearNominations();
            }}
            _hover={{
              background: 'red.600',
            }}
          >
            Remove All Nominations
          </Button>
        </ModalFooter>
      </ModalContent>
    </ModalWrapper>
  );
};
