import { HubConnection } from '@microsoft/signalr';
import { DataPost } from '../PostComments/PostComments';
import * as Styled from './styled';
import { ChangeEventHandler, useState, useRef, memo, useEffect, useLayoutEffect } from 'react';
import { Comments } from '../Comment/Comment';
import IconeCommentSvg from '../../../Svg/IconeCommentSvg/IconeCommentSvg';
import IconeSharePostSvg from '../../../Svg/IconeSharePostSvg/IconeSharePostSvg';
import LikeOnePost from '../LikeOnePost/LikeOnePost';
import Url from '../../../Utils/Url';

interface TextareaCommentProps {
  userId: number | null;
  dataPost: DataPost | null;
  connection: HubConnection | null;
  commentSubComment: Comments | null;
  ContainerCommentPostRef: React.MutableRefObject<null>;
}

export interface listLikePostProps {
  postId: number;
  authorId: number;
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
    if (textareaRef.current === null) return;
    if (event.target.value.length <= 0) {
      textareaRef.current.style.height = '19px';
    }
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

  const [erasingTextarea, setErasingTextare] = useState(false);
  const [heightText, setHeightText] = useState(19);

  useEffect(() => {
    if (textareaRef === null || textareaRef.current === null) return;

    textareaRef.current.addEventListener('keyup', (e) => {
      if (textareaRef === null || textareaRef.current === null) return;
      if (WrapperMainRef === null || WrapperMainRef.current === null) return;

      let scHeight = e.target.scrollHeight;
      if (scHeight <= 19) {
        textareaRef.current.style.height = '19px';
      }

      setHeightText(scHeight);
    });

    textareaRef.current.addEventListener('keydown', (e) => {
      if (textareaRef === null || textareaRef.current === null) return;
      if (WrapperMainRef === null || WrapperMainRef.current === null) return;

      let scHeight = e.target.scrollHeight;

      setHeightText(scHeight);
    });

    textareaRef.current.addEventListener('keydown', (e) => {
      if (textareaRef.current === null) return;

      if (e.key == 'Backspace') {
        if (textareaRef.current.value.length <= 30) {
          textareaRef.current.style.height = '19px';
        } else {
          textareaRef.current.style.height = 'auto';
        }
        setErasingTextare(true);
      } else {
        setErasingTextare(false);
      }

      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    });
  }, [textareaRef, hasValue, heightText, textareaValue]);

  const [listLikePost, setListLikePost] = useState<listLikePostProps[] | null>(null);
  const [numberOfLikes, setNumberOfLikes] = useState(0);

  const fetchLikesPost = async () => {
    if (dataPost === null) return;
    const { id } = dataPost;
    const res = await fetch(`${Url}/postLikes/${id}`);
    if (res.status === 200) {
      const json = await res.json();
      setListLikePost(json.data);
      setNumberOfLikes(json.data.length);
    }
  };

  useLayoutEffect(() => {
    fetchLikesPost();
  }, []);

  return (
    <Styled.ContainerMain>
      <Styled.ContainerInfoPost>
        <Styled.ContainerSvg>
          <LikeOnePost
            userId={userId}
            dataPost={dataPost}
            listLikePost={listLikePost}
            setListLikePost={setListLikePost}
            setNumberOfLikes={setNumberOfLikes}
          />
          <IconeCommentSvg />
          <IconeSharePostSvg />
        </Styled.ContainerSvg>
        <Styled.ContainerCountLikes>
          <Styled.PLikes>{numberOfLikes} curtidas</Styled.PLikes>
        </Styled.ContainerCountLikes>
      </Styled.ContainerInfoPost>
      <Styled.WrapperMain ref={WrapperMainRef}>
        <Styled.Form>
          <Styled.Form__Textarea
            ref={textareaRef}
            value={textareaValue}
            $heightText={heightText}
            $erasingtextarea={String(erasingTextarea)}
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
    </Styled.ContainerMain>
  );
};

export default memo(TextareaComment);
