import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import * as Styled from './styled';
import { useState, useEffect } from 'react';
import Url from '../../../Utils/Url';
import { AllPost, LikesPostProps } from '../CardPost/CardPost';

interface LikeProps {
  post: AllPost;
  userId: number | null;
  setAllPost: React.Dispatch<React.SetStateAction<AllPost[] | null>>;
}

const Like = ({ post, userId, setAllPost }: LikeProps) => {
  // const fetchLikePostById = async (id: number) => {
  //   const res = await fetch(`${Url}/postLikes/${id}`);
  //   if (res.status === 200) {
  //     const json = await res.json();
  //     setAllLikesAllPost(json.data);
  //   }
  // };

  // useEffect(() => {
  //   fetchLikePostById(post.id);
  // }, [post]);

  const handleLike = async () => {
    const likePost = {
      PostId: post.id,
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
      setAllPost((prev) =>
        prev !== null
          ? prev.map((pt) =>
              pt.id == post.id ? { ...pt, postLikes: [...(pt.postLikes || []), likes] } : pt
            )
          : prev
      );

      setAllPost((prev) =>
        prev !== null
          ? prev.map((pt) =>
              pt.id == post.id ? { ...pt, postLikesCounts: pt.postLikesCounts + 1 } : pt
            )
          : prev
      );
    }
  };

  const handleDislike = async (postId: number) => {
    var createLikePost = false;

    const res = await fetch(`${Url}/postLike/${userId}/${postId}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      var createLikePost = true;
      setAllPost((prev) =>
        prev !== null
          ? prev.map((pt) =>
              pt.id == post.id
                ? { ...pt, postLikes: pt.postLikes.filter((lk) => lk.authorId !== userId) }
                : pt
            )
          : prev
      );

      setAllPost((prev) =>
        prev !== null
          ? prev.map((pt) =>
              pt.id == post.id ? { ...pt, postLikesCounts: pt.postLikesCounts - 1 } : pt
            )
          : prev
      );
    }
  };

  return (
    <Styled.ContainerMain>
      {post && post.postLikes && post.postLikes.some((lk) => lk.authorId == userId) ? (
        <Styled.ButtonSvg onClick={() => handleDislike(post.id)} data-testid="button-dislike">
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
        <Styled.ButtonSvg onClick={() => handleDislike(post.id)} data-testid="button-like">
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
    </Styled.ContainerMain>
  );
};

export default Like;
