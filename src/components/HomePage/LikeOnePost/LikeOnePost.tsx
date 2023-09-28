import IconeHeartBlackSvg from '../../../Svg/IconeHeartBlackSvg/IconeHeartSvg';
import IconeHeartRedSvg from '../../../Svg/IconeHeartRedSvg/IconeHeartRedSvg';
import Url from '../../../Utils/Url';
import { DataPost } from '../PostComments/PostComments';
import { listLikePostProps } from '../TextareaComment/TextareaComment';
import * as Styled from './styled';

interface LikeOnePostProps {
  userId: number | null;
  dataPost: DataPost | null;
  listLikePost: listLikePostProps[] | null;
  setListLikePost: React.Dispatch<React.SetStateAction<listLikePostProps[] | null>>;
  setNumberOfLikes: React.Dispatch<React.SetStateAction<number>>;
}

const LikeOnePost = ({
  userId,
  dataPost,
  listLikePost,
  setListLikePost,
  setNumberOfLikes,
}: LikeOnePostProps) => {
  const handleLike = async () => {
    if (dataPost === null) return;
    const { id } = dataPost;
    const likePost = {
      PostId: id,
      AuthorId: userId,
    };

    var createLikePost = false;

    const res = await fetch(`${Url}/postLike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likePost),
    });
    if (res.status === 200) {
      createLikePost = true;
      const json = await res.json();
      const likes = json.data;
      setListLikePost((prev) => (prev !== null ? [...prev, likes] : prev));
      setNumberOfLikes((prev) => prev + 1);
    }
  };

  const handleDislike = async () => {
    if (dataPost === null) return;
    const { id } = dataPost;

    const res = await fetch(`${Url}/postLike/${userId}/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      setListLikePost((prev) =>
        prev !== null ? prev.filter((lk) => lk.authorId != userId) : prev
      );
      setNumberOfLikes((prev) => prev - 1);
    }
  };

  return (
    <Styled.ContainerMain>
      {listLikePost && listLikePost.some((lk) => lk.authorId == userId) ? (
        <Styled.ContainerRedBlack onClick={() => handleDislike()}>
          <IconeHeartRedSvg />
        </Styled.ContainerRedBlack>
      ) : (
        <Styled.ContainerHeartBlack onClick={handleLike}>
          <IconeHeartBlackSvg />
        </Styled.ContainerHeartBlack>
      )}
    </Styled.ContainerMain>
  );
};
export default LikeOnePost;
