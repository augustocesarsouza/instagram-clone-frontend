import { HubConnection } from '@microsoft/signalr';
import { DataPost } from '../PostComments/PostComments';
import * as Styled from './styled';
import { ChangeEventHandler, useState, useRef, memo, useEffect } from 'react';
import { Comments } from '../Comment/Comment';

interface TextareaCommentProps {
  userId: number | null;
  dataPost: DataPost | null;
  connection: HubConnection | null;
  commentSubComment: Comments | null;
  ContainerCommentPostRef: React.MutableRefObject<null>;
}

export const TextareaComment = ({
  userId,
  dataPost,
  connection,
  commentSubComment,
  ContainerCommentPostRef,
}: TextareaCommentProps) => {
  const [textareaValue, setTextareaValue] = useState('');
  const [hasValue, setHasValue] = useState(false);

  const WrapperMainRef = useRef<HTMLDivElement | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (commentSubComment === null) return;
    const nameUserRespond = commentSubComment.user.name;
    setTextareaValue(`@${nameUserRespond} `);
  }, [commentSubComment]);

  const handleTextareaOnFocus = () => {
    if (hasValue) {
      setHasValue(true);
    }
  };

  const handleTextareaChange: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setTextareaValue(event.target.value);
  };

  const handleSendCommentOrSubComment = async () => {
    if (textareaRef.current === null || dataPost == null) return;

    if (textareaRef.current.value[0] === '@') {
      if (commentSubComment && connection && textareaRef.current) {
        const JsonSubComment = {
          Text: textareaRef.current.value,
          UserId: userId,
          CommentId: commentSubComment.id,
        };
        connection.invoke('SendSubComment', JsonSubComment);
        setTextareaValue('');
        textareaRef.current.value = '';
      }
    } else {
      const JsonObjPost = {
        Text: textareaRef.current.value,
        UserId: userId,
        PostId: dataPost.id,
      };

      if (connection) {
        connection.invoke('SendComment', JsonObjPost);
      }

      setTextareaValue('');
      textareaRef.current.value = '';
    }
  };

  useEffect(() => {
    if (textareaRef === null || textareaRef.current === null) return;

    textareaRef.current.addEventListener('keyup', handleTextareaKeyUp);

    textareaRef.current.addEventListener('keydown', (e) => {
      //Essa parte aqui
      if (textareaRef.current === null) return;

      if (e.key == 'Backspace') {
        textareaRef.current.style.height = 'auto';
      }

      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    });

    return () => {
      if (textareaRef === null || textareaRef.current === null) return;
      textareaRef.current.removeEventListener('keyup', handleTextareaKeyUp);
    };
  }, [textareaRef, hasValue]);

  const handleTextareaKeyUp = (e) => {
    //junto com essa da para melhorar
    if (textareaRef === null || textareaRef.current === null) return;
    if (WrapperMainRef === null || WrapperMainRef.current === null) return;

    let scHeight = e.target.scrollHeight;
  };

  useEffect(() => {
    if (textareaRef.current === null) return;

    textareaRef.current.addEventListener('input', handleEventInput);

    return () => {
      if (textareaRef.current === null) return;
      textareaRef.current.removeEventListener('input', handleEventInput);
    };
  }, [textareaRef]);

  const handleEventInput = () => {
    if (textareaRef.current === null) return;

    const maxHeight = 120;
    const scrollHeight = textareaRef.current.scrollHeight;
    const newHeight = Math.min(maxHeight, scrollHeight);

    textareaRef.current.style.height = `${newHeight}px`;
  };

  return (
    <Styled.WrapperMain ref={WrapperMainRef}>
      <Styled.Form>
        <Styled.Form__Textarea
          ref={textareaRef}
          value={textareaValue}
          onFocus={handleTextareaOnFocus}
          onChange={handleTextareaChange}
          required
          placeholder="Adicione um comentário..."
        />
      </Styled.Form>
      <Styled.Wrapper>
        <Styled.Wrapper__Button onClick={handleSendCommentOrSubComment} type="submit">
          Publicar
        </Styled.Wrapper__Button>
      </Styled.Wrapper>
    </Styled.WrapperMain>
  );
};

export default memo(TextareaComment);
