import './textarea.css';

interface IProps {
  title?: string | null;
  onChange?: (value: string | null) => void;
}

const Textarea = (props: IProps) => {
  return (
    <div className={'slex-input-container'}>
      <div className={'slex-input-title'}>
        {props.title}
      </div>

      <textarea
        className={'slex-input'}
        onChange={(event) => props.onChange?.(event.target.value)}
      >
      </textarea>
    </div>
  )
}

export default Textarea;