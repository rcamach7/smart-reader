import { UserProvider } from '@/context/UserContext';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar } from '@/components/organisms';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <UserProvider>
      <CssBaseline />
      <AppBar />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
