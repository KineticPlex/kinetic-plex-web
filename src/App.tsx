import React, { useState, useEffect, useRef } from 'react';
import MainPage from './pages/main/main-page';

const App: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const isVisibleRef = useRef(isVisible);

  useEffect(() => {
    isVisibleRef.current = isVisible;
  }, [isVisible]);

  const handleClose = () => {
    setIsClosing(true);

    setTimeout(() => {
      setIsVisible(false); 
      setIsClosing(false);
    }, 400);
  };

  useEffect(() => {
    const messageListener = (request: any) => {
      if (request.action === "toggle_sign-language-ext") {
        if (isVisibleRef.current) {
          handleClose();
        } else {
          setIsVisible(true);
        }
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);

  if (!isVisible && !isClosing) return null;

  return (
    <div className={`sign-language-ext-panel ${isClosing ? 'closing' : ''}`}>
      <MainPage
        setIsVisible={(value: boolean) => {
          if (!value) handleClose();
          else setIsVisible(true);
        }}
      />
    </div>
  );
};

export default App;