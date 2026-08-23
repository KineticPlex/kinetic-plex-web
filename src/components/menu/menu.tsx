import Button from '../button/button';
import './menu.css';
import Repeat from '../../assets/icons/refresh.svg';
import Plane from '../../assets/icons/papel-plane.svg';
import Sub from '../../assets/icons/close-caption.svg';

interface IProps {
  isLoading?: boolean;
  isActiveSub?: boolean;
  onRepeat?: () => void;
  onSend?: () => void;
  onSub?: () => void
}

const Menu = (props: IProps) => {
  return (
    <div className={'slex-menu-container'}>
      <div className={'slex-menu-repeat-button-container'}>
        <Button
          icon={Repeat}
          onClick={() => props.onRepeat?.()}
        />
      </div>

      <div className={'slex-menu-send-button-container'}>
        <Button
          backgroundColorStyle={'slex-button-success'}
          sizeStyle={'slex-button-md'}
          icon={Plane}
          isLoading={props.isLoading}
          onClick={() => props.onSend?.()}
        />
      </div>

      <div className={'slex-menu-close-caption-button-container'}>
        <Button
          icon={Sub}
          isActive={props.isActiveSub}
          onClick={() => props.onSub?.()}
        />
      </div>
    </div>
  )
}

export default Menu;