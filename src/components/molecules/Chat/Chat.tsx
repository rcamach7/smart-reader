import { useState } from 'react';

import { Box, Modal, Typography } from '@mui/material';
import { FabButton } from '@/components/atoms';

interface Props {}

export default function Chat({}: Props) {
  const [chat, setChat] = useState({ open: false, messages: [] });

  const toggleChat = () => {
    setChat((C) => {
      return { ...C, open: !C.open };
    });
  };

  return (
    <>
      <FabButton onClick={() => toggleChat()} />
      <div>
        <Modal
          open={chat.open}
          onClose={toggleChat}
          aria-labelledby="modal-modal-confirm"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-confirm" variant="h6" component="h2">
              Hello World
            </Typography>
          </Box>
        </Modal>
      </div>
    </>
  );
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'clamp(300px, 90vw, 900px)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};
