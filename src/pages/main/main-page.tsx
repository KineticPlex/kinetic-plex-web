import { useEffect } from 'react';
import './main-page.css';
import TranslationRequestService from '../../services/translation-request-service';
import type { CreateOrUpdateTranslationRequest } from '../../dtos/translation-requests/create-or-update-translation-request';

interface IMainPageProps {
  setIsVisible: (value: boolean) => void
}

const MainPage = (props: IMainPageProps) => {
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