import React, { useState, useEffect, useRef } from 'react';
import MainPage from './pages/main/main-page';

const injectFonts = () => {
  const fontStyles = `
    @font-face {
      font-family: 'Roboto-Black';
      src: url('${chrome.runtime.getURL('fonts/roboto/Roboto-Black.ttf')}') format('truetype');
    }
    @font-face {
      font-family: 'Roboto-Bold';
      src: url('${chrome.runtime.getURL('fonts/roboto/Roboto-Bold.ttf')}') format('truetype');
    }
    @font-face {
      font-family: 'Roboto-Medium';
      src: url('${chrome.runtime.getURL('fonts/roboto/Roboto-Medium.ttf')}') format('truetype');
    }
    @font-face {
      font-family: 'Roboto-Regular';
      src: url('${chrome.runtime.getURL('fonts/roboto/Roboto-Regular.ttf')}') format('truetype');
    }
    @font-face {
      font-family: 'Roboto-Light';
      src: url('${chrome.runtime.getURL('fonts/roboto/Roboto-Light.ttf')}') format('truetype');
    }
  `;

  const styleElement = document.createElement('style');
  styleElement.textContent = fontStyles;
  document.head.appendChild(styleElement);
};

injectFonts();

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