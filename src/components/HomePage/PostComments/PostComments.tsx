import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
import UserComment from '../UserComment/UserComment';
import * as Styled from './styled';
import Url from '../../../Utils/Url';
import CardPublicationOwner from '../CardPublicationOwner/CardPublicationOwner';
import { AllPost } from '../CardPost/CardPost';
import { Comments } from '../Comment/Comment';
import TextareaComment from '../TextareaComment/TextareaComment';
import IconeCommentSvg from '../../../Svg/IconeCommentSvg/IconeCommentSvg';
import IconeSharePostSvg from '../../../Svg/IconeSharePostSvg/IconeSharePostSvg';
import LikeOnePost from '../LikeOnePost/LikeOnePost';

interface PostCommentsProps {
  dataPost: DataPost | null;
  userId: number | null;
  connection: signalR.HubConnection | null;
  seeComments: boolean;
  setSeeComments: React.Dispatch<React.SetStateAction<boolean>>;
  setAllPost: React.Dispatch<React.SetStateAction<AllPost[] | null>>;
  setPostComments: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

export interface DataPost {
  id: number;
  title: string;
  user: User;
}

export interface SubsComments {
  id: number;
  text: string;
  commentId: number;
  user: User;
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

// export interface listLikePostProps {
//   postId: number;
//   authorId: number;
// }

const PostComments = ({
  dataPost,
  userId,
  connection,
  seeComments,
  setSeeComments,
  setAllPost,
  setPostComments,
}: PostCommentsProps) => {
  const [commentSubComment, setCommentSubComment] = useState<Comments | null>(null);

  const [dataComments, setDataComments] = useState<Comments[]>([]);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    if (dataPost !== null) {
      const fetchComments = async (postId: number) => {
        setPostId(postId);
        if (postId > 0) {
          const res = await fetch(`${Url}/comment/user/${dataPost.id}`);
          if (res.status === 200) {
            const json = await res.json();

            setDataComments(json.data);
            setDataComments((prev) =>
              prev !== null
                ? prev.map((cmd) => ({
                    ...cmd,
                    subCommentsCountsMock: cmd.subCommentsCounts,
                  }))
                : prev
            );
          }
        }
      };

      if (dataPost.id !== null) {
        fetchComments(dataPost.id);
      }
    }
  }, [dataPost]);

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveComment', (message) => {
        setAllPost((prev) =>
          prev !== null
            ? prev.map((post) =>
                post.id == message.postId
                  ? { ...post, commentsLikes: post.commentsLikes + 1 }
                  : post
              )
            : prev
        );

        setDataComments((prev) => {
          if (!prev.includes(message.id)) {
            return [message, ...prev];
          }

          return prev;
        });
      });
    }

    return () => {
      connection?.off('ReceiveComment');
    };
  }, [connection]);

  const responseComment = (comment: Comments) => {
    if (comment) {
      setCommentSubComment(comment);
    }
  };

  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [subComments, setSubComments] = useState<{ [key: number]: SubsComments[] }>({});

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveSubComments', (subComment) => {
        setDataComments((prev) =>
          prev !== null
            ? prev.map((cmt) =>
                cmt.id == subComment.commentId
                  ? { ...cmt, subCommentsCounts: cmt.subCommentsCounts + 1 }
                  : cmt
              )
            : prev
        );

        setSubComments((prevSubComments) => {
          const commentId = subComment.commentId;
          const updatedSubComments = {
            ...prevSubComments,
            [commentId]: [...(prevSubComments[commentId] || []), subComment],
          };

          return updatedSubComments;
        });
      });
    }

    return () => {
      connection?.off('ReceiveSubComments');
    };
  }, [connection]);

  const ContainerCommentPostRef = useRef(null);
  // const [listLikePost, setListLikePost] = useState<listLikePostProps[] | null>(null);
  // const [numberOfLikes, setNumberOfLikes] = useState(0);

  // const fetchLikesPost = async () => {
  //   if (dataPost === null) return;
  //   const { id } = dataPost;
  //   const res = await fetch(`${Url}/postLikes/${id}`);
  //   if (res.status === 200) {
  //     const json = await res.json();
  //     setListLikePost(json.data);
  //     setNumberOfLikes(json.data.length);
  //   }
  // };

  // useLayoutEffect(() => {
  //   fetchLikesPost();
  // }, []);

  return (
    <Styled.ContainerInfoComment>
      <Styled.ContainerGeneral>
        <CardPublicationOwner dataPost={dataPost} />
        <UserComment
          dataComments={dataComments}
          connection={connection}
          userId={userId}
          postId={postId}
          expandedComments={expandedComments}
          subComments={subComments}
          ContainerCommentPostRef={ContainerCommentPostRef}
          seeComments={seeComments}
          setSeeComments={setSeeComments}
          setExpandedComments={setExpandedComments}
          setSubComments={setSubComments}
          responseComment={responseComment}
          setDataComments={setDataComments}
        />
      </Styled.ContainerGeneral>
      {/* <Styled.ContainerInfoPost>
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
      </Styled.ContainerInfoPost> */}
      <TextareaComment
        userId={userId}
        dataPost={dataPost}
        connection={connection}
        commentSubComment={commentSubComment}
        ContainerCommentPostRef={ContainerCommentPostRef}
      />
    </Styled.ContainerInfoComment>
  );
};

export default PostComments;
