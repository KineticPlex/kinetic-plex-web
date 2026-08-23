import './button.css';

interface IProps {
  backgroundColorStyle?: string | null;
  sizeStyle?: string | null;
  icon?: string | undefined;
  onClick?: () => void
}

const Button = (props: IProps) => {
  const classNames = [
    'slex-button',
    props.backgroundColorStyle,
    props.sizeStyle
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} onClick={props.onClick}>
      <img className="slex-button-icon" src={props.icon} alt="Icon" />
    </button>
  )
}

export default Button;