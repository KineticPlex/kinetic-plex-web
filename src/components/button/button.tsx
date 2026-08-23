import { useEffect, useState } from 'react';
import './button.css';

interface IProps {
  backgroundColorStyle?: string | null;
  sizeStyle?: string | null;
  icon?: string | undefined;
  isLoading?: boolean;
  isActive?: boolean;
  onClick?: () => void
}

const Button = (props: IProps) => {
  const [classNames, setClassNames] = useState('');

  useEffect(() => {
    setClassNames([
      'slex-button',
      props.isLoading ? 'slex-button-is-loading slex-button-disabled' : '',
      props.isActive ? 'slex-buttonn-active' : '',
      props.backgroundColorStyle,
      props.sizeStyle
    ].filter(Boolean).join(' '));
  }, [props.isLoading, props.isActive]);

  return (
    <button className={classNames} onClick={props.onClick}>
      <img className="slex-button-icon" src={props.icon} alt="Icon" />
    </button>
  )
}

export default Button;