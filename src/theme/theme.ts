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
      main: '#6EA6B6',
    },
    secondary: {
      main: '#6EA6B6',
    },
    background: {
      default: '#212121',
      paper: '#282828',
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#a5a5a5',
    },
  },
  typography: {
    fontFamily: [
      'Georgia',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});
