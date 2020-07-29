import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function StartSession() {
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState('');

  const handleSubmit = async () => {
    await fetch('/api/session', {
      method: 'post',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    history.replace(location.pathname);
  };

  return (
    <>
      <label htmlFor="name">
        Enter a name:
        <input id="name" type="text" onChange={event => setName(event.target.value)} value={name} />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
