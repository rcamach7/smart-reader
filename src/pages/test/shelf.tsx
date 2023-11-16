import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '@/context/UserContext';

function ShelfForm() {
  const { user, setUser } = useUser();

  const [shelfData, setShelfData] = useState({
    name: '',
    description: '',
    isPublic: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setShelfData({
      ...shelfData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/shelf', shelfData, {
        withCredentials: true,
      });

      setUser({
        ...user,
        shelves: response.data.shelves,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error creating shelf:', error);
      console.log(error.response);
    }
  };

  return (
    <>
      {user ? (
        <>
          <p>Create New Shelf Below</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={shelfData.name}
              onChange={handleChange}
              placeholder="Shelf Name"
            />
            <textarea
              name="description"
              value={shelfData.description}
              onChange={handleChange}
              placeholder="Description"
            />
            <label>
              Public
              <input
                type="checkbox"
                name="isPublic"
                checked={shelfData.isPublic}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Create Shelf</button>
          </form>
        </>
      ) : (
        <h1>Please sign in to create a shelf</h1>
      )}
    </>
  );
}

export default ShelfForm;
