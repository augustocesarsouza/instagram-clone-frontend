import { HubConnection } from '@microsoft/signalr';
import Url from '../../../Utils/Url';
import * as Styled from './styled';
import React, { useEffect, useRef, useState } from 'react';
import { DataReelVideoProps } from '../ModalReelVideoInfo/ModalReelVideoInfo';
import CardPublicationOwner from '../../HomePage/CardPublicationOwner/CardPublicationOwner';
import UserComment from '../../HomePage/UserComment/UserComment';
import TextareaComment from '../../HomePage/TextareaComment/TextareaComment';

interface ReelCommentsProps {
  userId: number;
  dataReelVideo: DataReelVideoProps | null;
  connection: HubConnection | null;
  seeComments: boolean;
  setSeeComments: React.Dispatch<React.SetStateAction<boolean>>;
  setDataReelVideo: React.Dispatch<React.SetStateAction<DataReelVideoProps | null>>;
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

const ReelComments = ({
  userId,
  dataReelVideo,
  connection,
  seeComments,
  setSeeComments,
  setDataReelVideo,
}: ReelCommentsProps) => {
  const [commentSubComment, setCommentSubComment] = useState<Comments | null>(null);

  const [dataComments, setDataComments] = useState<Comments[]>([]);
  const [postId, setPostId] = useState<number | null>(null);

  useEffect(() => {
    if (dataReelVideo !== null) {
      const fetchComments = async (postId: number) => {
        setPostId(postId);
        if (postId > 0) {
          const res = await fetch(`${Url}/comment/user/${dataReelVideo.id}`);
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

      if (dataReelVideo.id !== undefined) {
        fetchComments(dataReelVideo.id);
      }
    }
  }, [dataReelVideo]);

  useEffect(() => {
    if (connection) {
      connection.on('ReceiveComment', (message) => {
        // setAllPost((prev) =>
        //   prev !== null
        //     ? prev.map((post) =>
        //         post.id == message.postId
        //           ? { ...post, commentsLikes: post.commentsLikes + 1 }
        //           : post
        //       )
        //     : prev
        // );

        setDataReelVideo((prev) =>
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
        <CardPublicationOwner dataPost={dataReelVideo} />
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
      <TextareaComment
        userId={userId}
        dataPost={dataReelVideo}
        connection={connection}
        commentSubComment={commentSubComment}
        ContainerCommentPostRef={ContainerCommentPostRef}
      />
    </Styled.ContainerInfoComment>
  );
};

export default ReelComments;
