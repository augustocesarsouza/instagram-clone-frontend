import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import UserComment from '../UserComment/UserComment';
import * as Styled from './styled';
import Url from '../../../Utils/Url';
import CardPublicationOwner from '../CardPublicationOwner/CardPublicationOwner';
import { AllPost } from '../CardPost/CardPost';
import { Comments } from '../Comment/Comment';
import TextareaComment from '../TextareaComment/TextareaComment';

interface PostCommentsProps {
  dataPost: DataPost | null;
  userId: number | null;
  connection: signalR.HubConnection | null;
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

const PostComments = ({
  dataPost,
  userId,
  connection,
  setAllPost,
  setPostComments,
}: PostCommentsProps) => {
  const [commentSubComment, setCommentSubComment] = useState<Comments | null>(null);

  const [dataComments, setDataComments] = useState<Comments[]>([]);

  useEffect(() => {
    if (dataPost !== null) {
      const fetchComments = async (postId: number) => {
        if (postId > 0) {
          const res = await fetch(`${Url}/comments/${dataPost.id}`);
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

  return (
    <Styled.ContainerInfoComment>
      <Styled.ContainerGeneral>
        <CardPublicationOwner dataPost={dataPost} />
        <UserComment
          dataComments={dataComments}
          responseComment={responseComment}
          connection={connection}
          userId={userId}
          setExpandedComments={setExpandedComments}
          expandedComments={expandedComments}
          setSubComments={setSubComments}
          subComments={subComments}
          setPostComments={setPostComments}
          setDataComments={setDataComments}
          ContainerCommentPostRef={ContainerCommentPostRef}
        />
      </Styled.ContainerGeneral>
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
