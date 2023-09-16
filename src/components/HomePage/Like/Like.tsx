import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import * as Styled from './styled';
import { useState, useEffect } from 'react';
import Url from '../../../Utils/Url';
import { AllPost, LikesPostProps } from '../CardPost/CardPost';
import IconeHeartBlackSvg from './IconeHeartBlackSvg/IconeHeartSvg';
import IconeHeartRedSvg from './IconeHeartRedSvg/IconeHeartRedSvg';

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
        <Styled.ContainerRedBlack onClick={() => handleDislike(post.id)}>
          <IconeHeartRedSvg />
        </Styled.ContainerRedBlack>
      ) : (
        <Styled.ContainerHeartBlack onClick={handleLike}>
          <IconeHeartBlackSvg />
        </Styled.ContainerHeartBlack>
      )}
    </Styled.ContainerMain>
  );
};

export default Like;
