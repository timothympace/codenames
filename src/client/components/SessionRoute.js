import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import StartSession from './StartSession';

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2)
    return parts
      .pop()
      .split(';')
      .shift();
}

export default function SessionRoute({ children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) => (getCookie('session') ? children : <StartSession />)}
    />
  );
}
