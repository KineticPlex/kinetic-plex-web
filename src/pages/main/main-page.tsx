import { useEffect, useState } from 'react';
import './main-page.css';

interface IMainPageProps {
  setIsVisible: (value: boolean) => void
}

const MainPage = (props: IMainPageProps) => {
  return (
    <div className={'slex-main-page-container'}>
      <div className="slex-main-page-header">
        <h3>Kinetic Plex</h3>
        
        <button
          className="slex-close-btn"
          onClick={() => props.setIsVisible(false)}
          title="Cerrar"
        >
          ✕
        </button>
      </div>

      <div className="slex-main-page-body">

      </div>

      <div className="slex-main-page-footer">

      </div>
    </div>
  );
}

export default MainPage;