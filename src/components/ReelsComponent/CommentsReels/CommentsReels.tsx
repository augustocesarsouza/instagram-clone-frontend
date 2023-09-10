import { faComment, faFaceSmile, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import * as StyledLikeAndComment from '../styled-like-comment/styledLikeAndComment';
import { ListReels } from '../../../templates/Reels/Reels';
import Url from '../../../Utils/Url';
import { ChangeEvent, useEffect, useLayoutEffect, useRef, useState } from 'react';
import PartTopComment from '../PartTopComment/PartTopComment';
import CardComments from '../CardComments/CardComments';
import TextareaAndEmojiImgUser from '../TextareaAndEmojiImgUser/TexareaAndEmojeImgUser';

interface CommentsReelsCompoProps {
  reels: ListReels;
  imgUserLogged: string;
  userId: number | null;
  mouseOn: React.RefObject<boolean>;
}

export interface CommentsReelsProps {
  id: number;
  text: string;
  createdAt: string;
  likeComments: LikeComments[];
  likeCommentsCounts: number;
  subCommentsCounts: number;
  subCommentsCountsMock: number;
  user: User;
}

interface LikeComments {
  authorId: number;
  commentId: number;
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

export interface SubsComments {
  id: number;
  text: string;
  commentId: number;
  user: UserSub;
}

interface UserSub {
  id: number;
  name: string;
  imagePerfil: string;
}

const CommentsReels = ({ reels, imgUserLogged, userId, mouseOn }: CommentsReelsCompoProps) => {
  const [commentsReels, setCommentsReels] = useState<CommentsReelsProps[] | null>(null);
  const [countingComments, setCountingComments] = useState<number>(0);
  const [openComment, setOpenComment] = useState(false);

  const ContainerMessageScrollRef = useRef<HTMLDivElement | null>(null);
  const [commentRespond, setCommentRespond] = useState<CommentsReelsProps | null>(null);

  const [subComments, setSubComments] = useState<{ [key: number]: SubsComments[] }>({});

  useEffect(() => {
    const fetchCommentsReels = async () => {
      const res = await fetch(`${Url}/comment/reels/${reels.id}`);
      if (res.status === 200) {
        const json = await res.json();
        setCommentsReels(json.data);

        setCommentsReels((prev) =>
          prev !== null
            ? prev.map((cmd) => ({
                ...cmd,
                subCommentsCountsMock: cmd.subCommentsCounts,
              }))
            : prev
        );
      }
    };
    fetchCommentsReels();
  }, []);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (commentsReels === null) return;
    setCountingComments(commentsReels.length);
  }, [commentsReels]);

  const handleOpenComment = () => {
    setOpenComment(true);
  };

  const handleSendComment = async () => {
    if (textareaRef === null || textareaRef.current === null) return;

    if (textareaRef.current.value.includes('@')) {
      if (commentRespond === null) return;
      const textValue = textareaRef.current.value;

      var objCreateSubComment = {
        Text: textValue,
        UserId: userId,
        CommentId: commentRespond.id,
      };

      const res = await fetch(`${Url}/subcomment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objCreateSubComment),
      });

      if (res.status === 200) {
        const json = await res.json();

        const commentId = json.data.commentId;

        setCommentsReels((prev) =>
          prev !== null
            ? prev.map((cmd) =>
                cmd.id == commentId
                  ? { ...cmd, subCommentsCountsMock: cmd.subCommentsCountsMock + 1 }
                  : cmd
              )
            : prev
        );

        setSubComments((prev) => {
          const updatedSubComments = {
            ...prev,
            [commentId]: [...(prev[commentId] || []), json.data],
          };
          return updatedSubComments;
        });
      }
    } else {
      const textValue = textareaRef.current.value;
      var objCreateComment = {
        Text: textValue,
        UserId: userId,
        PostId: reels.id,
      };

      try {
        const res = await fetch(`${Url}/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objCreateComment),
        });

        if (res.status === 200) {
          const json = await res.json();

          setCommentsReels((prev) => (prev !== null ? [json.data, ...prev] : prev));
        }
      } catch (error) {
        console.error('Erro: ' + error);
        throw error;
      }
    }
  };

  const handleMouseEnter = () => {
    mouseOn.current = true;
  };

  const handleMouseLeave = () => {
    mouseOn.current = false;
  };

  const handleGetCommentRespond = (comment: CommentsReelsProps) => {
    setCommentRespond(comment);
  };

  return (
    <Styled.ContainerMessage
      id="container-message"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <FontAwesomeIcon icon={faComment} flip="horizontal" onClick={handleOpenComment} />
      <StyledLikeAndComment.ContainerLikesAndComment>
        <StyledLikeAndComment.ParagraphLike>{countingComments}</StyledLikeAndComment.ParagraphLike>
      </StyledLikeAndComment.ContainerLikesAndComment>
      {openComment && (
        <Styled.ContainerCommentReels>
          <PartTopComment setOpenComment={setOpenComment} />

          <CardComments
            commentsReels={commentsReels}
            ContainerMessageScrollRef={ContainerMessageScrollRef}
            userId={userId}
            setCommentsReels={setCommentsReels}
            handleGetCommentRespond={handleGetCommentRespond}
            setSubComments={setSubComments}
            subComments={subComments}
            reelsId={reels.id}
          />

          <TextareaAndEmojiImgUser
            textareaRef={textareaRef}
            ContainerMessageScrollRef={ContainerMessageScrollRef}
            imgUserLogged={imgUserLogged}
            handleSendComment={handleSendComment}
            commentRespond={commentRespond}
          />
        </Styled.ContainerCommentReels>
      )}
    </Styled.ContainerMessage>
  );
};

export default CommentsReels;
