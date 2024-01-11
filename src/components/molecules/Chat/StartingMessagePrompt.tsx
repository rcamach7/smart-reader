import { Box, Typography, Button } from '@mui/material';

interface Props {
  handleSelectStartingMessage: (string) => void;
}

export default function StartingMessagePrompt({
  handleSelectStartingMessage,
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
        backgroundColor: 'rgba(0, 0, 0, 0.89);',
        top: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1,
        color: 'white',
      }}
    >
      <Typography
        textAlign="center"
        variant="h2"
        sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}
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
                handleSelectStartingMessage(option);
              }}
            >
              {option}
            </Button>
          );
        })}
        <Button
          variant="text"
          onClick={() => {
            handleSelectStartingMessage('');
          }}
        >
          Ask Your Own Question Instead
        </Button>
      </Box>
    </Box>
  );
}
