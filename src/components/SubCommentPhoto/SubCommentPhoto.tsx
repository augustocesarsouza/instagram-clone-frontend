import ButtonHideSee from '../HomePage/ButtonHideSee/ButtonHideSee';
import SubCommentsData from '../HomePage/SubCommentsData/SubCommentsData';
import * as Styled from './styled';
import { useState } from 'react';

interface SubsComments {
  id: number;
  text: string;
  createdAt: string;
  updatedAt: string;
  commentId: number;
  user: User;
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

const SubCommentPhoto = ({ callFetchSubComment, comment }) => {
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [subComments, setSubComments] = useState<{ [key: number]: SubsComments[] }>({});

  return (
    <Styled.ContainerMain>
      <ButtonHideSee
        comment={comment}
        setSubComments={setSubComments}
        expandedComments={expandedComments}
        setExpandedComments={setExpandedComments}
        callFetchSubComment={callFetchSubComment}
      />

      <SubCommentsData
        expandedComments={expandedComments}
        comment={comment}
        subComments={subComments}
      />
    </Styled.ContainerMain>
  );
};
export default SubCommentPhoto;
