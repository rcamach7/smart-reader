import { useState } from 'react';
import axios from 'axios';

import { Box, Modal, InputBase, Typography, IconButton } from '@mui/material';
import StartingMessagePrompt from './StartingMessagePrompt';
import { FabButton } from '@/components/atoms';
import SendIcon from '@mui/icons-material/Send';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';

import Book from '@/types/book';

interface Props {
  book: Book;
}

export default function Chat({ book }: Props) {
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();

  const [input, setInput] = useState('');
  const [chat, setChat] = useState({
    open: false,
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      {
        role: 'user',
        content: `You will assist me in answering questions about the book ${
          book.title
        } by ${book.authors.join(', ')}. The ISBN is ${book.isbn}.`,
      },
      {
        role: 'system',
        content:
          "Excited about your next book adventure? I'm here to make it even better. Just ask me about the book's vibe, its story sneak-peek, how easy it is to read, or get tips on similar reads. ",
      },
    ],
    showStartingMessagePrompt: true,
  });
  const messages = chat.messages.slice(2);

  const handleSelectStartingMessage = (startingMessage: string) => {
    if (startingMessage) {
      setChat((C) => {
        return {
          ...C,
          messages: [...C.messages, { role: 'user', content: startingMessage }],
          showStartingMessagePrompt: false,
        };
      });
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

  const handleSendMessage = async () => {
    if (input.length < 5) {
      addAlertMessage({
        text: 'Message must be 5 or more characters',
        severity: 'warning',
      });
      return;
    }
    if (chat.showStartingMessagePrompt) {
      setChat((C) => {
        return {
          ...C,
          showStartingMessagePrompt: false,
        };
      });
    }

    const messages = [...chat.messages, { role: 'user', content: input }];
    setChat((C) => {
      return {
        ...C,
        messages: messages,
      };
    });
    setInput('');

    // Once Backend Is Implemented
    // try {
    //   const res = await axios.post('api/', messages);
    //   const updatedMessages = res.data.messages;
    //   setChat((C) => {
    //     return {
    //       ...C,
    //       messages: updatedMessages,
    //     };
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
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
                backgroundColor: '#1e1e1e',
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
                <Box sx={{ color: 'white', textAlign: 'center', pb: 1 }}>
                  Conversation With Smart Helper
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flex: 1,
                    gap: 0.5,
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
                              message.role === 'user' ? '#0e85ff' : '#3b3b3d'
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
                <Box sx={{ display: 'flex' }}>
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
                      color: 'white',
                      flex: 1,
                    }}
                  />
                  <IconButton
                    size="small"
                    aria-label="send"
                    sx={{ px: 0.5, color: 'white' }}
                    onClick={handleSendMessage}
                  >
                    <SendIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
