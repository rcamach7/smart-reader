import { useState } from 'react';

import { Box, Modal, InputBase, Typography, Button } from '@mui/material';
import StartingMessagePrompt from './StartingMessagePrompt';
import { FabButton } from '@/components/atoms';

interface Props {}

export default function Chat({}: Props) {
  const [input, setInput] = useState('');
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
    showStartingMessagePrompt: true,
  });
  const messages = chat.messages.slice(1);

  const handleSelectStartingMessage = (startingMessage: string) => {
    if (startingMessage) {
    } else {
      setChat((C) => {
        return {
          ...C,
          showStartingMessagePrompt: false,
        };
      });
    }
  };

  const toggleChat = () => {
    setChat((C) => {
      return { ...C, open: !C.open };
    });
  };

  const addMessage = (message: string) => {
    setChat((C) => {
      return {
        ...C,
        messages: [...C.messages, { role: 'user', content: message }],
      };
    });
  };

  const handleSendMessage = () => {
    if (input.length) {
      addMessage(input);
      setInput('');
    } else {
      alert('No message entered');
    }
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
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'clamp(300px, 90vw, 500px)',
              height: 'clamp(300px, 80vh, 700px)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 1,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                p: 2,
              }}
            >
              {chat.showStartingMessagePrompt && (
                <StartingMessagePrompt
                  handleSelectStartingMessage={handleSelectStartingMessage}
                />
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    gap: 1,
                    overflow: 'scroll',
                    '::-webkit-scrollbar': {
                      display: 'none',
                    },
                    flexDirection: 'column-reverse',
                    pb: 1,
                  }}
                >
                  {messages.reverse().map((message, i) => {
                    return (
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
                <InputBase
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  value={input}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Enter Message"
                  inputProps={{ 'aria-label': 'send-message' }}
                  sx={{
                    border: 'solid #343541 2px',
                    p: 0.5,
                    borderRadius: '5px',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
