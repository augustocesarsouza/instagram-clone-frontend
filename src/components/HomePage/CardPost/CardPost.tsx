import * as Styled from './styled.ts';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Url from '../../../Utils/Url';
import PostCard from '../PostCard/PostCard';
import Like from '../Like/Like';
import Comment from '../Comment/Comment';
import IconeCommentSvg from '../../../Svg/IconeCommentSvg/IconeCommentSvg.tsx';

interface AllPostsProps {
  createImgOrVideo: AllPost | null;
  connection: signalR.HubConnection | null;
}

export interface AllPost {
  id: number;
  title: string;
  url: string;
  user: User;
  isImagem: number;
  postLikesCounts: number;
  commentsLikes: number;
  postLikes: PostLikes[];
}

interface PostLikes {
  id: number;
  postId: number;
  authorId: number;
}

export interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

export interface CommentsPost {
  id: number;
  createdAt: string;
  text: string;
  user: UserComments;
}

interface UserComments {
  id: number;
  name: string;
  imagePerfil: string;
}

export interface LikesPostProps {
  authorId: number;
  id: number;
  postId: number;
}

const CardPost = ({ createImgOrVideo, connection }: AllPostsProps) => {
  const location = useLocation();
  const { userId } = location.state ? location.state : '';
  const [allPost, setAllPost] = useState<AllPost[] | null>(null);

  useLayoutEffect(() => {
    const fetchAllPosts = async () => {
      const res = await fetch(`${Url}/post/all`); // A ideia aqui controlar quando Post vou pegar depois controla isso pega 10 depois se a pessoa carregar  mais você pega
      if (res.status === 200) {
        const json = await res.json();
        setAllPost(json.data as AllPost[]);
      }
    };
    fetchAllPosts();
  }, []);

  useEffect(() => {
    if (allPost !== null && createImgOrVideo !== null) {
      setAllPost((prev) => (prev !== null ? [createImgOrVideo, ...prev] : prev));
    }
  }, [createImgOrVideo]);

  const [postComments, setPostComments] = useState<AllPost | null>(null);
  const [seeComments, setSeeComments] = useState(false);

  const handleSeeAllComments = (post: AllPost) => {
    setPostComments(post);
  };

  const handleSeeComments = (post: AllPost) => {
    const scroll = document.getElementById('container-scroll');
    if (scroll) {
      scroll.style.overflowY = 'hidden';
    }
    setSeeComments(true);
    setPostComments(post);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const handleResizeWindow = () => {
    const scroll = document.getElementById('container-scroll');
    if (scroll === null) return;
    if (window.innerWidth > 750) {
      scroll.style.overflow = 'auto';
    }
    // else {
    //   document.body.style.overflow = 'auto';
    // }
  };

  return (
    <>
      {allPost &&
        allPost.map((post, index) => (
          <Styled.ContainerMain key={post.id} $index={index}>
            <PostCard post={post} userId={userId} seeComments={seeComments} />
            <Styled.ContainerInteraction>
              <Like post={post} userId={userId} setAllPost={setAllPost} />
              <Styled.ContainerMessage onClick={() => handleSeeComments(post)}>
                <IconeCommentSvg />
              </Styled.ContainerMessage>
              {postComments && postComments.id == post.id && (
                <Comment
                  postComments={postComments}
                  setPostComments={setPostComments}
                  userId={userId}
                  connection={connection}
                  setAllPost={setAllPost}
                  setSeeComments={setSeeComments}
                  seeComments={seeComments}
                />
              )}
            </Styled.ContainerInteraction>
            {post && (
              <Styled.LikeCountSection>
                <Styled.SpanLikes>{post.postLikesCounts} curtidas</Styled.SpanLikes>
              </Styled.LikeCountSection>
            )}
            <Styled.AllCommentsDiv>
              <Styled.AllCommentsP onClick={() => handleSeeAllComments(post)}>
                Ver todos os {post.commentsLikes} Comentários
              </Styled.AllCommentsP>
            </Styled.AllCommentsDiv>
          </Styled.ContainerMain>
        ))}
    </>
  );
};

export default CardPost;
