import { useState } from 'react';

function Contact() {
  const [message, setMessage] = useState('');

  return (
    <div>
      <h2>Contact Me</h2>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          style={{ width: '60%', maxWidth: '400px' }}
        />
      </div>
      <p style={{ color: '#61dafb' }}>
        Live Feedback: <em>{message || 'Waiting for input...'}</em>
      </p>
    </div>
  );
}

export default Contact;
