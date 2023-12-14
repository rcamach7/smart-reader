import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    background: {
      default: '#dce8f4',
    },
    primary: {
      main: '#6fa6b6',
    },
    secondary: {
      main: '#505050',
    },
  },
  typography: {
    fontFamily: [
      'Georgia',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#d4af37', // Matte gold for primary actions in dark mode
    },
    secondary: {
      main: '#b08d57', // A darker shade of gold for secondary actions in dark mode
    },
    background: {
      default: '#121212', // Modern dark background
      paper: '#1e1e1e', // Surface color
    },
    text: {
      primary: '#f4f6f8', // Light text color for contrast in dark mode
      secondary: '#b0b0b0', // Lighter secondary text color for readability
    },
  },
  typography: {
    fontFamily: [
      'Georgia',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
