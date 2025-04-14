 "use client";

import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // User signed in successfully
      console.log('User signed in!');

      if (userCredential.user) {
        // Get the ID token with custom claims
        const idToken = await userCredential.user.getIdToken(true);

        // Decode the ID token to get the custom claims
        const decodedToken = JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
        console.log(decodedToken.role)
        const role = decodedToken.role || 'user';

        // Store the role in local storage
        localStorage.setItem('userRole', role);
        setIsAdmin(role === 'admin');

        // Optionally, redirect the user to the main page
        // window.location.href = '/';
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '20px auto', padding: '20px', border: '1px solid #ccc' }}>
        <h2>Log In</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', border: '1px solid #ddd' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Log In</button>
      </form>
      {isAdmin && <p>Hello Admin</p>}
    </>
  );
};

export default LoginForm;
