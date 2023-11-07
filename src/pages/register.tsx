import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  async function handleSubmit(e) {
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

  function handleChange(e) {
    setCredentials({
      ...credentials,
      [e.target.id]: e.target.value,
    });
  }

  useEffect(() => {
    console.log(credentials);
  }, [credentials]);

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          onChange={handleChange}
          value={credentials.password}
        />
        <input type="submit" />
      </form>
    </div>
  );
}
