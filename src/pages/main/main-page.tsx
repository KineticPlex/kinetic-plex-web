import { useEffect, useState } from 'react';
import './main-page.css';
import TranslationRequestService from '../../services/translation-request-service';
import type { CreateOrUpdateTranslationRequest } from '../../dtos/translation-requests/create-or-update-translation-request';
import CloseIcon from '../../assets/icons/close.svg';
import Textarea from '../../components/textarea/textarea';
import Menu from '../../components/menu/menu';

interface IMainPageProps {
  setIsVisible: (value: boolean) => void
}

const MainPage = (props: IMainPageProps) => {
  const [text, setText] = useState<string | null>('');
  const [animations, setAnimations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSub, setActiveSub] = useState(false);

  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [currentPlayingText, setCurrentPlayingText] = useState<string>('Esperando texto...');
  const [currentPlayingName, setCurrentPlayingName] = useState<string | null>(null);

  const sendText = () => {
    setIsLoading(true);

    let translationRequest: CreateOrUpdateTranslationRequest = {
      text: text
    }

    TranslationRequestService.create(translationRequest)
      .then((result: any) => {
        if (result.success && result.data.length > 0) {
          console.log(result);
          setAnimations(result.data);
          setCurrentIndex(0);
          setIsLoading(false);
        }
      })
      .catch(error => {
        console.log(error);

        setIsLoading(false);
      });
  };

  useEffect(() => {
    console.log('dfsdf', activeSub);

    if (currentIndex < 0 || currentIndex >= animations.length) {
      if (currentIndex >= animations.length && animations.length > 0) {
        setCurrentPlayingText('¡Secuencia terminada!');
        setCurrentPlayingName(null);
      }

      return;
    }

    const currentAnimation = animations[currentIndex];

    setCurrentPlayingText(`${currentAnimation.animationName} : (${currentAnimation.duration} ms)`);
    setCurrentPlayingName(currentAnimation.text);

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

          {
            (activeSub && currentPlayingName) && (
              <div className="slex-main-page-sub">
                {currentPlayingName}
              </div>
            )
          }
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
            isLoading={isLoading}
            isActiveSub={activeSub}
            onRepeat={() => {
              if (animations.length > 0) setCurrentIndex(0);
            }}
            onSend={sendText}
            onSub={() => setActiveSub(!activeSub)}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;