import * as Styled from './styled';

import { Comments } from '../Comment/Comment';

interface SubCommentsDataProps {
  expandedComments: number[];
  comment: Comments;
  subComments: { [key: number]: SubsComments[] };
}

// interface Comments {
//   id: number;
//   text: string;
//   createdAt: string;
//   user: User;
// }

interface SubsComments {
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

const SubCommentsData = ({ expandedComments, comment, subComments }: SubCommentsDataProps) => {
  return (
    <>
      {expandedComments.includes(comment.id) && (
        <>
          {subComments[comment.id].map((sub) => (
            <Styled.WrapperSubComment key={sub.id}>
              <Styled.ContainerImgUserComment>
                <Styled.ImgUserComment src={sub.user.imagePerfil} />
              </Styled.ContainerImgUserComment>
              <Styled.WrapperUserInfoSubComment>
                <Styled.P>
                  {sub.user.name}
                  <Styled.Span>{sub.text}</Styled.Span>
                </Styled.P>
              </Styled.WrapperUserInfoSubComment>
            </Styled.WrapperSubComment>
          ))}
        </>
      )}
    </>
  );
};

export default SubCommentsData;
