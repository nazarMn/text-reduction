import React, { useState } from 'react';
import './InputText.css';

export default function InputText() {
  const [text, setText] = useState('');
  const [shortenedText, setShortenedText] = useState('');

  const Submit = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

    
        setShortenedText(data.shortenedText);
    
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="inputText">
      <div className="inputBox">
        <textarea
          type="text"
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={Submit}>Send</button>
      </div>
      {shortenedText && (
        <div className="output">
          <p>{shortenedText}</p>
        </div>
      )}
    </div>
  );
}
