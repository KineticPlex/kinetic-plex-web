import { useEffect, useState } from 'react';
import './main-page.css';
import TranslationRequestService from '../../services/translation-request-service';
import type { CreateOrUpdateTranslationRequest } from '../../dtos/translation-requests/create-or-update-translation-request';
import CloseIcon from '/icons/close.svg';
import Textarea from '../../components/textarea/textarea';
import Menu from '../../components/menu/menu';

interface IMainPageProps {
  setIsVisible: (value: boolean) => void
}

const MainPage = (props: IMainPageProps) => {
  const [text, setText] = useState<string | null>('');
  const [animations, setAnimations] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentPlayingText, setCurrentPlayingText] = useState<string>('Esperando texto...');

  const sendText = () => {
    let translationRequest: CreateOrUpdateTranslationRequest = {
      text: text
    }

    TranslationRequestService.create(translationRequest)
      .then((result: any) => {
        if (result.success && result.data.length > 0) {
          setAnimations(result.data);
          setCurrentIndex(0);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentIndex < 0 || currentIndex >= animations.length) {
      if (currentIndex >= animations.length && animations.length > 0) {
        setCurrentPlayingText('¡Secuencia terminada!');
      }

      return;
    }

    const currentAnimation = animations[currentIndex];

    setCurrentPlayingText(`Reproduciendo: ${currentAnimation.text} (${currentAnimation.duration}ms)`);

    const timerId = setTimeout(() => {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }, currentAnimation.duration);

    return () => clearTimeout(timerId);

  }, [currentIndex, animations]);

  return (
    <div className={'slex-main-page-container'}>
      <div className="slex-main-page-header">
        <div className={'slex-main-page-header-title'}>Kinetic Plex</div>

        <button
          className="slex-main-page-header-close-button"
          onClick={() => props.setIsVisible(false)}
          title="Cerrar"
        >
          <img className={'slex-main-page-header-close-button-icon'} src={CloseIcon} alt="Close icon" />
        </button>
      </div>

      <div className="slex-main-page-body">
        <div className="slex-main-page-avatar-container">
          <div className="slex-main-page-text">
            {currentPlayingText}
          </div>
        </div>

        <div className={'slex-main-page-input-container'}>
          <Textarea
            title={'Text'}
            onChange={(value: string | null) => setText(value)}
          />
        </div>
      </div>

      <div className="slex-main-page-footer">
        <div className={'slex-main-page-menu-container'}>
          <Menu
            onRepeat={() => {
              if (animations.length > 0) setCurrentIndex(0);
            }}
            onSend={sendText}
            onSub={() => { }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;