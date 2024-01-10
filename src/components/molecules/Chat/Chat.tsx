import { useState } from 'react';

import { Box, Modal, InputBase, Typography } from '@mui/material';
import { FabButton } from '@/components/atoms';

interface Props {}

export default function Chat({}: Props) {
  const [chat, setChat] = useState({
    open: false,
    messages: [
      { role: 'system', content: 'First Message(AI)' },
      { role: 'system', content: 'First Message(AI)' },
      { role: 'user', content: 'I am a person.(ME)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'user', content: 'I am a person.(ME)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'user', content: 'I am a person.(ME)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'user', content: 'I am a person.(ME)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'user', content: 'I am a person.(ME)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'system', content: 'You are a helpful assistant.(AI)' },
      { role: 'user', content: 'Newest Message (ME)' },
    ],
  });
  const messages = chat.messages.slice(1);

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
          {/* Modal Index Container */}
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(300px, 90vw, 600px)',
              height: 'clamp(300px, 90vh, 700px)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2,
            }}
          >
            {/* Contains The Message, and Input  */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              {/* Message Container */}
              <Box
                sx={{
                  display: 'flex',
                  flex: 1,
                  gap: 1,
                  overflow: 'scroll',
                  '::-webkit-scrollbar': {
                    display: 'none',
                  },
                  backgroundColor: 'red',
                  flexDirection: 'column-reverse',
                }}
              >
                {messages.reverse().map((message, i) => {
                  return (
                    // Message Component
                    <Box
                      sx={{
                        textAlign: `${
                          message.role === 'user' ? 'right' : 'left'
                        }`,
                        p: 0.5,
                      }}
                      key={i}
                    >
                      <Box
                        sx={{
                          display: 'inline-block',
                          backgroundColor: `${
                            message.role === 'user' ? 'blue' : 'grey'
                          }`,
                          color: 'white',
                          borderRadius: 2,
                          p: 0.5,
                        }}
                      >
                        <Typography>{message.content}</Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              <InputBase sx={{ backgroundColor: 'yellow' }} />
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
