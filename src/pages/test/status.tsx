import axios from 'axios';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const { user, setUser } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(true);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  async function handleSignUpSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/register', credentials);
      setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.error(
        'An error occurred during registration:',
        error.response ? error.response.data : error.message
      );
    }
  }

  async function handleSignInSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', credentials);
      setUser(res.data.user);
    } catch (error) {
      console.error(
        'An error occurred during sign-in:',
        error.response ? error.response.data : error.message
      );
    }
  }

  async function handleSignOut() {
    try {
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (error) {
      console.error(
        'An error occurred during sign-out:',
        error.response ? error.response.data : error.message
      );
    }
  }

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  if (user) {
    return (
      <div>
        <div>Welcome back, {user.username}</div>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h1>{isSigningIn ? 'Sign In' : 'Register'}</h1>
      <button onClick={() => setIsSigningIn(!isSigningIn)}>
        {isSigningIn
          ? 'Need to create an account?'
          : 'Already have an account?'}
      </button>
      <form onSubmit={isSigningIn ? handleSignInSubmit : handleSignUpSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
        />
        <input type="submit" value={isSigningIn ? 'Sign In' : 'Sign Up'} />
      </form>
    </div>
  );
}
