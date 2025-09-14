// src/pages/ErrorPage.jsx
import React from 'react';
import { useRouteError } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Fooder';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <>
    <Navbar />
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Oops!</h1>
      <p>Something went wrong or the page does not exist.</p>
      <p><i>{error.statusText || error.message}</i></p>
    </div>
    <Footer />
    </>
  );
}
