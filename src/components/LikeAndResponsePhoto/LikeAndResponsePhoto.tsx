import { Comments } from '../PhotoUser/PhotoUser';
import * as Styled from './styled';

interface LikeAndResponsePhotoProps {
  comment: Comments;
  responseComment: (value: Comments) => void;
}

const LikeAndResponsePhoto = ({ comment, responseComment }: LikeAndResponsePhotoProps) => {
  const handleResponse = (comment: Comments) => {
    responseComment(comment);
  };

  return (
    <Styled.Container__Like__Response>
      <Styled.SpanLikeResponse>
        <Styled.Button>15 curtidas</Styled.Button>
        <Styled.Button onClick={() => handleResponse(comment)}>Response</Styled.Button>
      </Styled.SpanLikeResponse>
    </Styled.Container__Like__Response>
  );
};

export default LikeAndResponsePhoto;
