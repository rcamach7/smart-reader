import { Box, Typography, Button } from '@mui/material';

interface Props {
  handleSendMessage: (string?: string) => void;
  noDefaultStartingMessages: () => void;
}

export default function StartingMessagePrompt({
  handleSendMessage,
  noDefaultStartingMessages,
}: Props) {
  const options = [
    "Can you provide a summary of the book's plot without giving away major spoilers?",
    'What are the key themes and messages in this book?',
    'Who would you recommend this book to, and why?',
    'What similar books or authors might I like if I enjoy this book?',
  ];

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#dce8f4',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
      }}
    >
      <Typography
        textAlign="center"
        variant="h2"
        sx={{
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        Begin Your Conversation With Our AI Helper
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          p: 2,
        }}
      >
        {options.map((option) => {
          return (
            <Button
              key={option}
              variant="contained"
              onClick={() => {
                handleSendMessage(option);
              }}
            >
              {option}
            </Button>
          );
        })}
        <Button
          variant="text"
          onClick={() => {
            noDefaultStartingMessages();
          }}
        >
          Ask Your Own Question Instead
        </Button>
      </Box>
    </Box>
  );
}
