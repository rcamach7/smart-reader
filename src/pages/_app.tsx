import { UserProvider } from '@/context/UserContext';
import { LoadingProvider } from '@/context/LoadingContext';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@/components/organisms';
import theme from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <LoadingProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </LoadingProvider>
    </UserProvider>
  );
}

export default MyApp;
