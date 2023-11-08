import axios from 'axios';
import { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';

export default function Home() {
  const { user } = useUser();
  const [isSigningIn, setIsSigningIn] = useState(true); // initial state set to true for sign in

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  async function handleSignUpSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post('api/register', credentials);
      console.log(response);
    } catch (error) {
      console.error(
        'An error occurred during registration:',
        error.response ? error.response.data : error.message
      );
    }
  }

  function handleSignInSubmit(e) {
    e.preventDefault();
    // Sign in logic will be implemented here
  }

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  if (user) {
    return <div>Welcome back, {user.username}</div>;
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
          name="username" // Changed from id to name for better form handling
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          name="password" // Changed from id to name
          type="password"
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password}
        />
        <input type="submit" value={isSigningIn ? 'Sign In' : 'Sign Up'} />
      </form>
    </div>
  );
}
