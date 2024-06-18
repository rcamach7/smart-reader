import { useState } from 'react';
import axios from 'axios';

import { Box, Modal, InputBase, Typography, IconButton } from '@mui/material';
import StartingMessagePrompt from './StartingMessagePrompt';
import { FabButton } from '@/components/atoms';
import SendIcon from '@mui/icons-material/Send';

import { useLoadingContext } from '@/context/LoadingContext';
import { useFeedbackContext } from '@/context/FeedbackContext';
import { useUser } from '@/context/UserContext';

import Book from '@/types/book';

interface Props {
  book: Book;
}

export default function Chat({ book }: Props) {
  const { addAlertMessage } = useFeedbackContext();
  const { setIsPageLoading } = useLoadingContext();
  const { user } = useUser();

  const [input, setInput] = useState('');
  const [chat, setChat] = useState({
    open: false,
    messages: [
      { role: 'system', content: 'You are a helpful book assistant.' },
      {
        role: 'user',
        content: `You will assist me in answering questions about the book ${
          book.title
        } by ${book.authors.join(', ')}. The ISBN is ${book.isbn}.`,
      },
      {
        role: 'system',
        content:
          'Ask me for a quick story preview, reading ease, or similar book recommendations.',
      },
    ],
    showStartingMessagePrompt: true,
  });
  const messages = chat.messages.slice(2);

  const toggleChat = () => {
    if (user) {
      setChat((C) => {
        return { ...C, open: !C.open };
      });
    } else {
      addAlertMessage({
        severity: 'error',
        text: 'Please sign in to use this feature.',
      });
    }
  };

  const noDefaultStartingMessages = () => {
    setChat((C) => {
      return {
        ...C,
        showStartingMessagePrompt: false,
      };
    });
  };

  const handleSendMessage = async (message?: string) => {
    const messages = [...chat.messages];
    if (message) {
      messages.push({ role: 'user', content: message });
    } else {
      if (input.length < 5 && !message) {
        addAlertMessage({
          text: 'Message must be 5 or more characters.',
          severity: 'warning',
        });
        return;
      }
      messages.push({ role: 'user', content: input });
    }
    if (chat.showStartingMessagePrompt) {
      setChat((C) => {
        return {
          ...C,
          showStartingMessagePrompt: false,
        };
      });
    }

    try {
      setIsPageLoading(true);

      const res = await axios.post('/api/ai/conversation', { book, messages });
      const updatedMessages = res.data.messages;
      setChat((C) => {
        return {
          ...C,
          messages: updatedMessages,
        };
      });
      setInput('');
    } catch (error) {
      console.log(error);
      addAlertMessage({
        severity: 'error',
        text: 'Error sending message.',
      });
    }
    setIsPageLoading(false);
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
              height: 'clamp(300px, 80vh, 600px)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                height: '100%',
                p: 2,
                backgroundColor: '#202833',
                borderRadius: 4,
              }}
            >
              {chat.showStartingMessagePrompt && (
                <StartingMessagePrompt
                  handleSendMessage={handleSendMessage}
                  noDefaultStartingMessages={noDefaultStartingMessages}
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
                    textAlign: 'center',
                    pb: 1,
                  }}
                >
                  <Typography variant="h1">
                    Smart Helper Conversation...
                  </Typography>
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
                              message.role === 'user' ? '#0e85ff' : '#46A29F'
                            }`,
                            marginLeft: `${
                              message.role === 'user' ? '1rem' : '0px'
                            }`,
                            marginRight: `${
                              message.role === 'user' ? '0px' : '1rem'
                            }`,
                            color: 'white',
                            borderRadius: 2,
                            p: 0.5,
                          }}
                        >
                          <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                            {message.content}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
                {!chat.showStartingMessagePrompt && (
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
                      placeholder="Enter message..."
                      inputProps={{ 'aria-label': 'send-message' }}
                      sx={{
                        border: 'solid #46A29F 2px',
                        p: 0.5,
                        borderRadius: '5px',
                        flex: 1,
                      }}
                    />
                    <IconButton
                      size="small"
                      aria-label="send"
                      sx={{ px: 0.5 }}
                      onClick={() => {
                        handleSendMessage();
                      }}
                    >
                      <SendIcon sx={{ color: '#46A29F' }} />
                    </IconButton>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Modal>
      </div>
    </>
  );
}
