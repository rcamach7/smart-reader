import { createTheme } from '@mui/material/styles';

const baseFontSize = 16; // Base font size in pixels

export const lightTheme = createTheme({
  palette: {
    background: {
      default: '#0B0D10',
    },
    primary: {
      main: '#46A29F',
    },
    text: {
      primary: '#C5C6C8',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#202833',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#202833',
        },
      },
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
