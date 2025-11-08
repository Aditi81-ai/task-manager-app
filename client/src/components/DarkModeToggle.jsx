import React, { useEffect, useState } from 'react';

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <button
      onClick={toggleDarkMode}
      style={{
        background: darkMode ? '#2d3748' : '#f7fafc',
        border: '2px solid',
        borderColor: darkMode ? '#4a5568' : '#e2e8f0',
        borderRadius: '20px',
        padding: '8px 16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.3s ease',
      }}
    >
      {darkMode ? '🌙' : '☀️'}
      <span style={{ fontSize: '14px', fontWeight: '500', color: darkMode ? '#fff' : '#2d3748' }}>
        {darkMode ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default DarkModeToggle;
