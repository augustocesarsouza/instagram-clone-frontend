import LikeAndResponse from '../LikeAndResponse/LikeAndResponse';
import * as Styled from './styled';
import SubComment from '../SubComment/SubComment';
import { Comments, contextGlobalPost, contextGlobalPostProps } from '../Comment/Comment';
import { SubsComments } from '../PostComments/PostComments';
import { AllPost } from '../CardPost/CardPost';
import Url from '../../../Utils/Url';
import { useState, useEffect, memo, useContext } from 'react';
import UserCommentAndCountLikes from '../UserCommentAndCountLikes/UserCommentAndCountLikes';

interface UserCommentProps {
  dataComments: Comments[];
  responseComment: (value: Comments) => void;
  connection: signalR.HubConnection | null;
  userId: number | null;
  setExpandedComments: React.Dispatch<React.SetStateAction<number[]>>;
  expandedComments: number[];
  setSubComments: React.Dispatch<React.SetStateAction<{ [key: number]: SubsComments[] }>>;
  subComments: { [key: number]: SubsComments[] };
  setPostComments: React.Dispatch<React.SetStateAction<AllPost | null>>;
  setDataComments: React.Dispatch<React.SetStateAction<Comments[]>>;
  ContainerCommentPostRef: React.MutableRefObject<null>;
}

const UserComment = ({
  dataComments,
  connection,
  userId,
  expandedComments,
  subComments,
  responseComment,
  setExpandedComments,
  setSubComments,
  setPostComments,
  setDataComments,
  ContainerCommentPostRef,
}: UserCommentProps) => {
  const [commentsNew, setCommentsNew] = useState<Comments[] | null>(null);
  const [showModalComment, setShowModalComment] = useState(false);

  useEffect(() => {
    setCommentsNew(dataComments);
    setShowModalComment(true);
  }, [dataComments]);

  const contextComment = useContext<contextGlobalPostProps | null>(contextGlobalPost);

  useEffect(() => {
    if (contextComment !== null) {
      const { seeComments } = contextComment;
      setShowModalComment(seeComments);
    }
  }, [contextComment]);

  useEffect(() => {
    if (connection === null) return;

    connection.on('ReceiveComment', (comment) => {
      setCommentsNew((prev) => (prev !== null ? [comment, ...prev] : prev));
    });
  }, [connection]);

  return (
    <Styled.ContainerCommentPost ref={ContainerCommentPostRef}>
      {showModalComment &&
        commentsNew &&
        commentsNew.map((comment, index) => (
          <Styled.ContainerUserComment key={comment.id}>
            <UserCommentAndCountLikes
              comment={comment}
              userId={userId}
              index={index}
              responseComment={responseComment}
            />
            <SubComment
              comment={comment}
              connection={connection}
              setExpandedComments={setExpandedComments}
              expandedComments={expandedComments}
              setSubComments={setSubComments}
              subComments={subComments}
              setDataComments={setDataComments}
            />
          </Styled.ContainerUserComment>
        ))}
    </Styled.ContainerCommentPost>
  );
};
export default memo(UserComment);
