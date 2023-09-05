import Url from '../../../Utils/Url';
import { ListReels } from '../../../templates/Reels/Reels';
import * as Styled from './styled';
import * as StyledLikeAndComment from '../styled-like-comment/styledLikeAndComment';
import { useState, useEffect, useLayoutEffect } from 'react';

interface LikesReelsProps {
  reels: ListReels;
  userId: number | null;
}

interface PostLikesProps {
  postId: number;
  authorId: number;
  counterOfLikesPost: number;
}

const LikesReels = ({ reels, userId }: LikesReelsProps) => {
  const [postLikes, setPostLikes] = useState<PostLikesProps[] | null>(null);
  const [counterOfLikesReels, setCounterOfLikesReels] = useState<number>(0);

  const fetchLikesReels = async () => {
    const res = await fetch(`${Url}/postLikes/${reels.id}`);
    if (res.status === 200) {
      const json = await res.json();
      setPostLikes(json.data);
    }
  };

  useLayoutEffect(() => {
    fetchLikesReels();
  }, []);

  useEffect(() => {
    if (postLikes === null) return;
    setCounterOfLikesReels(postLikes.length);
  }, [postLikes]);

  const handleLike = async () => {
    const likePost = {
      PostId: reels.id,
      AuthorId: userId,
    };

    var createLikePost = false;

    const res = await fetch(`${Url}/postLike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likePost),
    });
    if (res.status === 200) {
      createLikePost = true;
      const json = await res.json();
      const likes = json.data;

      setPostLikes((prev) => (prev !== null ? [...prev, likes] : prev));

      setCounterOfLikesReels((prev) => prev + 1);
    }
  };

  const handleDislike = async (postId: number) => {
    const res = await fetch(`${Url}/postLike/${userId}/${postId}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      setPostLikes((prev) => (prev !== null ? prev.filter((lk) => lk.authorId !== userId) : prev));

      setCounterOfLikesReels((prev) => prev - 1);
    }
  };

  return (
    <Styled.ContainerMain>
      {postLikes && postLikes && postLikes.some((lk) => lk.authorId == userId) ? (
        <Styled.ButtonSvg onClick={() => handleDislike(reels.id)} data-testid="button-dislike">
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
        <Styled.ButtonSvg onClick={() => handleDislike(reels.id)} data-testid="button-like">
          <Styled.SvgHeartBorderBlack
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
            onClick={handleLike}
          >
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
          </Styled.SvgHeartBorderBlack>
        </Styled.ButtonSvg>
      )}
      <StyledLikeAndComment.ContainerLikesAndComment>
        <StyledLikeAndComment.ParagraphLike>
          {counterOfLikesReels}
        </StyledLikeAndComment.ParagraphLike>
      </StyledLikeAndComment.ContainerLikesAndComment>
    </Styled.ContainerMain>
  );
};

export default LikesReels;
