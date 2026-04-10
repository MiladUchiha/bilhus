import * as React from 'react';

interface EmailTemplateProps {
  firstName: string;
  email: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ firstName, email, message }) => (
  <div style={{
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
    color: '#333',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '5px',
  }}>
    <header style={{
      padding: '10px 0',
      borderBottom: '1px solid #eee',
      textAlign: 'center',
    }}>
      <h1 style={{
        margin: '0',
        color: '#004a99',
      }}>Marsta Bilhus</h1>
    </header>
    <main style={{
      padding: '20px 0',
    }}>
      <h2 style={{
        color: '#004a99',
      }}>New Inquiry from {firstName}</h2>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Message:</strong></p>
      <p>{message}</p>
    </main>
    <footer style={{
      padding: '10px 0',
      borderTop: '1px solid #eee',
      textAlign: 'center',
      fontSize: '12px',
      color: '#aaa',
    }}>
      <p>&copy; {new Date().getFullYear()} Marsta Bilhus. All rights reserved.</p>
      <p>Marsta Bilhus, Example Street 1, 195 30 Märsta</p>
    </footer>
  </div>
);
