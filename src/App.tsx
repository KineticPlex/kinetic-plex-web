import React, { useState, useEffect } from 'react';
import MainPage from './pages/main/main-page';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const messageListener = (request: any) => {
      if (request.action === "toggle_sign-language-ext") {
        setIsVisible((prev) => !prev); 
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sign-language-ext-panel">
      <MainPage
        setIsVisible={(value: boolean) => setIsVisible(value)}
      />
    </div>
  );
};

export default App;