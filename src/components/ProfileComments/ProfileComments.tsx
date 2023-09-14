import { HubConnection } from '@microsoft/signalr';
import * as Styled from './styled';
import React, { useEffect, useRef, useState } from 'react';
import Url from '../../Utils/Url';
import CardPublicationOwner from '../HomePage/CardPublicationOwner/CardPublicationOwner';
import UserComment from '../HomePage/UserComment/UserComment';
import TextareaComment from '../HomePage/TextareaComment/TextareaComment';
import { DataPost } from '../ProfileComponents/Publications/Publications';
import { DataInfoPublicationsProps } from '../CommentPhotoUser/CommentPhotoUser';

interface ProfileCommentsProps {
  userId: number;
  dataInfoPublications: DataInfoPublicationsProps | null;
  connectionHub: signalR.HubConnection | null;
  showModalComment: boolean;
  setShowModalComment: React.Dispatch<React.SetStateAction<boolean>>;
  setDataInfoPublications: React.Dispatch<React.SetStateAction<DataInfoPublicationsProps | null>>;
}

export interface Comments {
  id: number;
  text: string;
  createdAt: string;
  user: User;
  subCommentsCounts: number;
  subCommentsCountsMock: number;
  likeCommentsCounts: number;
  likeComments: likeCommentsProps[];
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

interface likeCommentsProps {
  authorId: number;
  commentId: number;
}

export interface SubsComments {
  id: number;
  text: string;
  commentId: number;
  user: User;
}

const ProfileComments = ({
  userId,
  dataInfoPublications,
  connectionHub,
  showModalComment,
  setShowModalComment,
  setDataInfoPublications,
}: ProfileCommentsProps) => {
  const [commentSubComment, setCommentSubComment] = useState<Comments | null>(null);

  const [dataComments, setDataComments] = useState<Comments[]>([]);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    if (dataInfoPublications !== null) {
      const fetchComments = async (postId: number) => {
        setPostId(postId);
        if (postId > 0) {
          const res = await fetch(`${Url}/comment/user/${dataInfoPublications.id}`);
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

      if (dataInfoPublications.id !== undefined) {
        fetchComments(dataInfoPublications.id);
      }
    }
  }, [dataInfoPublications]);

  useEffect(() => {
    if (connectionHub) {
      connectionHub.on('ReceiveComment', (message) => {
        // setAllPost((prev) =>
        //   prev !== null
        //     ? prev.map((post) =>
        //         post.id == message.postId
        //           ? { ...post, commentsLikes: post.commentsLikes + 1 }
        //           : post
        //       )
        //     : prev
        // );

        setDataInfoPublications((prev) =>
          prev !== null ? { ...prev, commentsLikes: prev.commentsLikes + 1 } : prev
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
      connectionHub?.off('ReceiveComment');
    };
  }, [connectionHub]);

  const responseComment = (comment: Comments) => {
    if (comment) {
      setCommentSubComment(comment);
    }
  };

  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [subComments, setSubComments] = useState<{ [key: number]: SubsComments[] }>({});

  useEffect(() => {
    if (connectionHub) {
      connectionHub.on('ReceiveSubComments', (subComment) => {
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
      connectionHub?.off('ReceiveSubComments');
    };
  }, [connectionHub]);

  const ContainerCommentPostRef = useRef(null);

  return (
    <Styled.ContainerInfoComment>
      <Styled.ContainerGeneral>
        <CardPublicationOwner dataPost={dataInfoPublications} />
        <UserComment
          dataComments={dataComments}
          connection={connectionHub}
          userId={userId}
          postId={postId}
          expandedComments={expandedComments}
          subComments={subComments}
          ContainerCommentPostRef={ContainerCommentPostRef}
          seeComments={showModalComment}
          setSeeComments={setShowModalComment}
          setExpandedComments={setExpandedComments}
          setSubComments={setSubComments}
          responseComment={responseComment}
          setDataComments={setDataComments}
        />
      </Styled.ContainerGeneral>
      <TextareaComment
        userId={userId}
        dataPost={dataInfoPublications}
        connection={connectionHub}
        commentSubComment={commentSubComment}
        ContainerCommentPostRef={ContainerCommentPostRef}
      />
    </Styled.ContainerInfoComment>
  );
};

export default ProfileComments;
