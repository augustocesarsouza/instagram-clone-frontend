import { useEffect, useState } from 'react';
import * as Styled from './styled';
import Url from '../../../Utils/Url';
import { Comments } from '../Comment/Comment';
import { AllPost } from '../CardPost/CardPost';
import { LikesCommentsInfoProps } from '../UserCommentAndCountLikes/UserCommentAndCountLikes';

interface LikeAndResponseProps {
  comment: Comments;
  responseComment: (value: Comments) => void;
  likesCommentsInfo: LikesCommentsInfoProps[];
}

const LikeAndResponse = ({ comment, responseComment, likesCommentsInfo }: LikeAndResponseProps) => {
  const [likesComments, setLikesComments] = useState([]);
  const [callFetchLikes, setCallFetchLikes] = useState({});

  const handleResponse = (comment: Comments) => {
    responseComment(comment);
  };

  // useEffect(() => {
  //   const fetchLikesComments = async () => {
  //     const res = await fetch(`${Url}/likeCommentId/${comment.id}`);
  //     setLikesComments([]);
  //     if (res.status === 200) {
  //       const json = await res.json();

  //       setLikesComments(json.data);
  //     }
  //   };
  //   fetchLikesComments();
  // }, [comment, callFetchLikes]);

  // const handleLikeComment = async () => {
  //   const jsonLike = {
  //     commentId: comment.id,
  //     authorId: userId,
  //   };
  //   const res = await fetch(`${Url}/likeCommentCreate`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'Application/json',
  //     },
  //     body: JSON.stringify(jsonLike),
  //   });

  //   if (res.status === 200) {
  //     const json = await res.json();

  //     if (json.isSucess == true) {
  //       setDataComments((prev) =>
  //         prev !== null
  //           ? prev.map((cmt) =>
  //               cmt.id === comment.id
  //                 ? { ...cmt, likeCommentsCounts: cmt.likeCommentsCounts + 1 }
  //                 : cmt
  //             )
  //           : prev
  //       );
  //     } else if (json.isSucessDeleteLike == true) {
  //       setDataComments((prev) =>
  //         prev !== null
  //           ? prev.map((cmt) =>
  //               cmt.id === comment.id
  //                 ? { ...cmt, likeCommentsCounts: cmt.likeCommentsCounts - 1 }
  //                 : cmt
  //             )
  //           : prev
  //       );
  //     }
  //   }
  // };

  return (
    <Styled.Container__Like__Response>
      <Styled.SpanLikeResponse>
        <Styled.Button //onClick={handleLikeComment}
        >
          {likesCommentsInfo &&
            likesCommentsInfo.map((lk) => lk.id == comment.id && lk.likeCommentsCounts)}{' '}
          curtidas
        </Styled.Button>
        <Styled.Button onClick={() => handleResponse(comment)}>Response</Styled.Button>
      </Styled.SpanLikeResponse>
    </Styled.Container__Like__Response>
  );
};

export default LikeAndResponse;
