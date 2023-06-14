import React from "react";

import { Box, Button, Modal, Text } from "native-base";

const AchievementWonModal = ({ show, onModalClosed }) => {
  const handleModalClose = () => {
    if (onModalClosed) {
      onModalClosed();
    }
  };

  return (
    <Modal isOpen={show} onClose={handleModalClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Body>
          <Box alignItems={"center"} mt={5}>
            <Text>Achievement Won</Text>
          </Box>
        </Modal.Body>
      </Modal.Content>
    </Modal>
  );
};

export default AchievementWonModal;
