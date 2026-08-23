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

  useEffect(() => {
    let translationRequest: CreateOrUpdateTranslationRequest = {
      text: 'Hola, cómo estás?'
    }

    TranslationRequestService.create(translationRequest)
      .then((result: any) => {
        if (result.success) {
          console.log(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
            Avatar
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
            onRepeat={() => { }}
            onSend={() => { }}
            onSub={() => { }}
          />
        </div>
      </div>
    </div>
  );
}

export default MainPage;