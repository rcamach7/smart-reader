import { createTheme } from '@mui/material/styles';

const baseFontSize = 16; // Base font size in pixels

export const lightTheme = createTheme({
  palette: {
    background: {
      default: '#0B0D10',
    },
    primary: {
      main: '#202833',
    },
    text: {
      primary: '#C5C6C8',
    },
  },
  typography: {
    fontSize: baseFontSize,
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
    h1: {
      fontSize: '1rem',
      color: '#66FCF2',
    },
    h2: {
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: `${baseFontSize}px`,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // color: '#000000',
        },
      },
    },
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
