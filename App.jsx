import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onmessage = (e) => {
      setMessages(prev => [...prev, e.data]);
    };

    return () => {
      ws.current.close();
    };
  }, []);

  function sendMessage() {
    if (!input) return;
    ws.current.send(input);
    setInput('');
  }

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'sans-serif' }}>
      <h2>简单聊天室</h2>
      <div style={{ border: '1px solid #ccc', height: 300, overflowY: 'auto', padding: 10 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ marginBottom: 5 }}>{msg}</div>
        ))}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        style={{ width: '80%', padding: 8, marginTop: 10 }}
        placeholder="输入消息按回车发送"
      />
      <button onClick={sendMessage} style={{ padding: '8px 12px', marginLeft: 8 }}>
        发送
      </button>
    </div>
  );
}