// Verification.jsx
import React, { useEffect, useState } from 'react';

function Verification() {
  const [message, setMessage] = useState('Verifying your email...');
  const query = new URLSearchParams(window.location.search);
  const token = query.get('token');

  useEffect(() => {
    if (token) {
      // Replace with your API endpoint for verification
      fetch(`https://r5zonv4ja9.execute-api.us-west-2.amazonaws.com/dev/verify?token=${token}`)
        .then(response => response.json())
        .then(data => {
          if (data.message === 'Email verified successfully') {
            setMessage('Your email has been successfully verified! Thank you for subscribing.');
          } else {
            setMessage('Verification failed. Please try again or contact support.');
          }
        })
        .catch(error => {
          console.error('Error verifying email:', error);
          setMessage('An error occurred. Please try again later.');
        });
    } else {
      setMessage('Invalid verification link.');
    }
  }, [token]);

  return (
    <div>
      <h1>Email Verification</h1>
      <p>{message}</p>
    </div>
  );
}

export default Verification;
