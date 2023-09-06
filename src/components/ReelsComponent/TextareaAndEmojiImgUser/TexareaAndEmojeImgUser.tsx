import { ChangeEvent, useEffect, useRef, useState } from 'react';
import * as Styled from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { CommentsReelsProps } from '../CommentsReels/CommentsReels';

interface TextareaAndEmojiImgUserProps {
  textareaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  ContainerMessageScrollRef: React.MutableRefObject<HTMLDivElement | null>;
  imgUserLogged: string;
  handleSendComment: () => void;
  commentRespond: CommentsReelsProps | null;
}

const TextareaAndEmojiImgUser = ({
  textareaRef,
  ContainerMessageScrollRef,
  imgUserLogged,
  handleSendComment,
  commentRespond,
}: TextareaAndEmojiImgUserProps) => {
  const [hasValue, setHasValue] = useState(false);

  const containerParagraphBorderRef = useRef<HTMLDivElement | null>(null);
  const [nameResponse, setNameResponse] = useState<string>('');

  const handleTextareaOnFocus = () => {
    if (hasValue) {
      setHasValue(true);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNameResponse(e.target.value);
    if (e.target.value.length > 0) {
      setHasValue(true);
    } else {
      setHasValue(false);
    }
  };

  useEffect(() => {
    if (commentRespond !== null) {
      setNameResponse(`@${commentRespond.user.name} `);
    }
  }, [commentRespond]);

  useEffect(() => {
    if (textareaRef === null || textareaRef.current === null) return;

    textareaRef.current.addEventListener('keyup', handleTextareaKeyUp);
    return () => {
      if (textareaRef === null || textareaRef.current === null) return;
      textareaRef.current.removeEventListener('keyup', handleTextareaKeyUp);
    };
  }, [textareaRef, hasValue]);

  const controleValidateRef = useRef<boolean>(true);
  const controleValidateRef68 = useRef<boolean>(true);
  const [valueForContainerTextAreaHeight, setValueForContainerTextAreaHeight] =
    useState<string>('34');

  const handleTextareaKeyUp = (e) => {
    if (textareaRef === null || textareaRef.current === null) return;
    if (containerParagraphBorderRef === null || containerParagraphBorderRef.current === null)
      return;
    textareaRef.current.style.height = '33px';
    let scHeight = e.target.scrollHeight;

    if (scHeight == 34) {
      setValueForContainerTextAreaHeight('40');
    }

    if (scHeight == 33) {
      setValueForContainerTextAreaHeight('40');
    }

    if (scHeight == 50) {
      setValueForContainerTextAreaHeight('40');
    }

    if (scHeight == 68) {
      setValueForContainerTextAreaHeight('65');
    }

    if (scHeight <= 68) {
      containerParagraphBorderRef.current.style.height = `${scHeight + 10}px`;
    }

    if (scHeight >= 86 && scHeight < 140) {
      const value = (scHeight + 25) * 1.3;

      textareaRef.current.style.height = `${value}px`;
    }

    if (scHeight >= 140) {
      const value = (scHeight + 16) * 1.4;

      textareaRef.current.style.height = `${value}px`;
    } else {
      textareaRef.current.style.height = `${scHeight}px`;
    }

    if (ContainerMessageScrollRef === null || ContainerMessageScrollRef.current === null) return;
    if (scHeight == 50 && controleValidateRef.current) {
      const height = ContainerMessageScrollRef.current.clientHeight;
      ContainerMessageScrollRef.current.style.height = `${height - 10}px`;
      controleValidateRef.current = false;
    } else if (scHeight == 68 && controleValidateRef68.current) {
      const height = ContainerMessageScrollRef.current.clientHeight;
      ContainerMessageScrollRef.current.style.height = `${height - 15}px`;
      controleValidateRef68.current = false;
    }
  };

  return (
    <Styled.ContainerParagraphAndSpanMain>
      <Styled.ContainerParagraphAndSpan ref={containerParagraphBorderRef}>
        <Styled.WrapperImgComment>
          <Styled.ImgUserComment src={imgUserLogged} />
        </Styled.WrapperImgComment>

        <Styled.ContainerTextarea
          $hasvalue={String(hasValue)}
          $valueheight={valueForContainerTextAreaHeight}
        >
          <Styled.Textarea
            ref={textareaRef}
            value={nameResponse}
            required
            onFocus={handleTextareaOnFocus}
            onChange={handleChange}
            placeholder="Adicione um comentário..."
          ></Styled.Textarea>
        </Styled.ContainerTextarea>

        <Styled.WrapperButtonAndIcon>
          {hasValue && (
            <Styled.WrapperButton>
              <Styled.Button onClick={handleSendComment}>Publicar</Styled.Button>
            </Styled.WrapperButton>
          )}

          <div>
            <FontAwesomeIcon icon={faFaceSmile} style={{ color: '#404245' }} />
          </div>
        </Styled.WrapperButtonAndIcon>
      </Styled.ContainerParagraphAndSpan>
    </Styled.ContainerParagraphAndSpanMain>
  );
};

export default TextareaAndEmojiImgUser;
