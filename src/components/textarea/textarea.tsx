import { useEffect } from 'react';
import './textarea.css';

interface IProps {
  title?: string | null;
  value?: string | null;
  onChange?: (value: string | null) => void;
}

const Textarea = (props: IProps) => {
  useEffect(() => {
    props.onChange?.(props.value ?? '')
  }, [props.value]);

  return (
    <div className={'slex-input-container'}>
      <div className={'slex-input-title'}>
        {props.title}
      </div>

      <textarea
        className={'slex-input'}
        value={props.value ?? ''}
        onChange={(event) => props.onChange?.(event.target.value)}
      >
      </textarea>
    </div>
  )
}

export default Textarea;