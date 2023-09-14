import LikeAndResponse from '../LikeAndResponse/LikeAndResponse';
import * as Styled from './styled';
import SubComment from '../SubComment/SubComment';
import { Comments } from '../Comment/Comment';
import { SubsComments } from '../PostComments/PostComments';
import { AllPost } from '../CardPost/CardPost';
import Url from '../../../Utils/Url';
import { useState, useEffect, memo, useContext } from 'react';
import UserCommentAndCountLikes from '../UserCommentAndCountLikes/UserCommentAndCountLikes';

interface UserCommentProps {
  dataComments: Comments[];
  connection: signalR.HubConnection | null;
  userId: number | null;
  postId: number | null;
  expandedComments: number[];
  subComments: { [key: number]: SubsComments[] };
  ContainerCommentPostRef: React.MutableRefObject<null>;
  seeComments: boolean;
  setSeeComments: React.Dispatch<React.SetStateAction<boolean>>;
  responseComment: (value: Comments) => void;
  setSubComments: React.Dispatch<React.SetStateAction<{ [key: number]: SubsComments[] }>>;
  setExpandedComments: React.Dispatch<React.SetStateAction<number[]>>;
  setDataComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

const UserComment = ({
  dataComments,
  connection,
  userId,
  postId,
  expandedComments,
  subComments,
  setSeeComments,
  responseComment,
  setExpandedComments,
  setSubComments,
  setDataComments,
  ContainerCommentPostRef,
}: UserCommentProps) => {
  const [commentsNew, setCommentsNew] = useState<Comments[] | null>(null);

  useEffect(() => {
    setCommentsNew(dataComments);
    setSeeComments(true);
  }, [dataComments]);

  useEffect(() => {
    if (connection === null) return;

    connection.on('ReceiveComment', (comment) => {
      setCommentsNew((prev) => (prev !== null ? [comment, ...prev] : prev));
    });
  }, [connection]);

  return (
    <Styled.ContainerCommentPost ref={ContainerCommentPostRef}>
      {subComments &&
        commentsNew &&
        commentsNew.map((comment, index) => (
          <Styled.ContainerUserComment key={comment.id}>
            <UserCommentAndCountLikes
              comment={comment}
              userId={userId}
              postId={postId}
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
