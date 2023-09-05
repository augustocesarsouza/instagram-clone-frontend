import ButtonHideSee from '../ButtonHideSee/ButtonHideSee';
import { Comments } from '../Comment/Comment';
import { SubsComments } from '../PostComments/PostComments';
import SubCommentsData from '../SubCommentsData/SubCommentsData';
import * as Styled from './styled';

interface SubCommentProps {
  comment: Comments;
  connection: signalR.HubConnection | null;
  setExpandedComments: React.Dispatch<React.SetStateAction<number[]>>;
  expandedComments: number[];
  setSubComments: React.Dispatch<React.SetStateAction<{ [key: number]: SubsComments[] }>>;
  subComments: { [key: number]: SubsComments[] };
  setDataComments: React.Dispatch<React.SetStateAction<Comments[]>>;
}

const SubComment = ({
  comment,
  connection,
  setExpandedComments,
  expandedComments,
  setSubComments,
  subComments,
  setDataComments,
}: SubCommentProps) => {
  return (
    <Styled.ContainerMain>
      <ButtonHideSee
        comment={comment}
        setSubComments={setSubComments}
        subComments={subComments}
        expandedComments={expandedComments}
        setExpandedComments={setExpandedComments}
        connection={connection}
        setDataComments={setDataComments}
      />

      <SubCommentsData
        expandedComments={expandedComments}
        comment={comment}
        subComments={subComments}
      />
    </Styled.ContainerMain>
  );
};

export default SubComment;
