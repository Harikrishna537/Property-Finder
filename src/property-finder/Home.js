import React from 'react';
import '../css/Login.css'


export default function Home() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
            backgroundColor: '#f5f5f5'
    }}>
      <h1 style={{
        fontSize: '3rem',
        color: '#333',
        fontWeight: 'bold',
        fontFamily: 'Arial, sans-serif'
      }}>
        Property-Finder
      </h1>
    </div>
  );
}
