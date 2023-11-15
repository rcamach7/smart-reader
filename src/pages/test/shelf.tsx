import React, { useState } from 'react';
import axios from 'axios';

function ShelfForm() {
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
      console.log(response.data);
    } catch (error) {
      console.error('Error creating shelf:', error);
      console.log(error.response);
    }
  };

  return (
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
  );
}

export default ShelfForm;
