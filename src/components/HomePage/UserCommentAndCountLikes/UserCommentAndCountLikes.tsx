import Url from '../../../Utils/Url';
import { Comments, contextGlobalPost, contextGlobalPostProps } from '../Comment/Comment';
import LikeAndResponse from '../LikeAndResponse/LikeAndResponse';
import * as Styled from './styled';
import { useEffect, useState, useContext } from 'react';

interface UserCommentAndCountLikesProps {
  comment: Comments;
  userId: number | null;
  index: number;
  responseComment: (value: Comments) => void;
}

export interface LikesCommentsInfoProps {
  id: number;
  likeCommentsCounts: number;
  likeComments: LikeCommentsProps[];
}

interface LikeCommentsProps {
  authorId: number;
  commentId: number;
}

const UserCommentAndCountLikes = ({
  comment,
  index,
  userId,
  responseComment,
}: UserCommentAndCountLikesProps) => {
  const [likesCommentsInfo, setLikesCommentsInfo] = useState<LikesCommentsInfoProps[] | []>([]);
  const [postId, setPostId] = useState<number | null>(null);

  const contextComment = useContext<contextGlobalPostProps | null>(contextGlobalPost);

  useEffect(() => {
    if (contextComment !== null) {
      const { postId } = contextComment;
      setPostId(postId);
    }
  }, [contextComment]);

  useEffect(() => {
    const fetchLikesComments = async () => {
      if (postId === null) return;
      const res = await fetch(`${Url}/comment/info/${postId}`);
      if (res.status === 200) {
        const json = await res.json();
        setLikesCommentsInfo(json.data);
      }
    };
    fetchLikesComments();
  }, [postId]);

  const handleLikeComment = async (commentId: number) => {
    const jsonLike = {
      commentId: commentId,
      authorId: userId,
    };
    const res = await fetch(`${Url}/likeCommentCreate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify(jsonLike),
    });

    if (res.status === 200) {
      const json = await res.json();
      const likes = json.data;

      if (json.isSucess == true) {
        setLikesCommentsInfo((prev) =>
          prev.map((lk) => ({ ...lk, likeCommentsCounts: lk.likeCommentsCounts + 1 }))
        );
      }
      setLikesCommentsInfo((prev) =>
        prev.map((lk) =>
          lk.id == commentId ? { ...lk, likeComments: [...lk.likeComments, likes] } : lk
        )
      );
    }
  };

  const handleDislike = async (commentId: number) => {
    const res = await fetch(`${Url}/likeCommentDelete/${userId}/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
      },
    });

    if (res.status === 200) {
      const json = await res.json();

      setLikesCommentsInfo((prev) =>
        prev.map((lk) => ({ ...lk, likeCommentsCounts: lk.likeCommentsCounts - 1 }))
      );
      setLikesCommentsInfo((prev) =>
        prev.map((lk) =>
          lk.id == commentId
            ? { ...lk, likeComments: lk.likeComments.filter((like) => like.authorId !== userId) }
            : lk
        )
      );
    }
  };

  const [changePositionSpan, setChangePositionSpan] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const handleResizeWindow = () => {
    if (window.innerWidth <= 750) {
      document.body.style.overflow = 'hidden';
      setChangePositionSpan(true);
    } else {
      setChangePositionSpan(false);
    }
  };

  return (
    <>
      <Styled.WrapperMain>
        <Styled.ContainerUserInfo>
          <Styled.ContainerImgUserComment>
            <Styled.ImgUserComment src={comment.user.imagePerfil} />
          </Styled.ContainerImgUserComment>
          <Styled.ContainerUserInfoComment>
            <Styled.P>
              {comment.user.name}
              {!changePositionSpan && <Styled.Span>{comment.text}</Styled.Span>}
            </Styled.P>
            {changePositionSpan && <Styled.Span>{comment.text}</Styled.Span>}
          </Styled.ContainerUserInfoComment>
        </Styled.ContainerUserInfo>
        {comment && (
          <Styled.WrapperKeyButton key={comment.id}>
            {likesCommentsInfo[index] &&
              likesCommentsInfo[index].id == comment.id &&
              (likesCommentsInfo[index].likeComments.some((lk) => lk.authorId == userId) ? (
                <Styled.ButtonSvg
                  onClick={() => handleDislike(comment.id)}
                  data-testid="button-dislike"
                >
                  <Styled.SvgHeartRed
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </Styled.SvgHeartRed>
                </Styled.ButtonSvg>
              ) : (
                <Styled.ButtonSvg data-testid="button-like">
                  <Styled.SvgHeartBorderBlack
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                  </Styled.SvgHeartBorderBlack>
                </Styled.ButtonSvg>
              ))}
          </Styled.WrapperKeyButton>
        )}
      </Styled.WrapperMain>
      <LikeAndResponse
        comment={comment}
        responseComment={responseComment}
        likesCommentsInfo={likesCommentsInfo}
      />
    </>
  );
};

export default UserCommentAndCountLikes;
