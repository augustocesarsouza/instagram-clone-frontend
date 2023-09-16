import Url from '../../Utils/Url';
import { AllPost } from '../../components/HomePage/CardPost/CardPost';
import ModalSharePhoto from '../../components/ProfileComponents/ModalSharePhoto/ModalSharePhoto';
import * as Styled from './styled';
import { useEffect, useState } from 'react';

interface CreateProps {
  userId: number | null;
  createPost: boolean;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideo: React.Dispatch<React.SetStateAction<AllPost | null>>;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const Create = ({ userId, createPost, setCreatePost, setCreateImgOrVideo }: CreateProps) => {
  const [createNewStory, setCreateNewStory] = useState(true);

  return (
    <>
      <ModalSharePhoto
        userId={userId}
        createPost={createPost}
        createNewStory={createNewStory}
        setCreatePost={setCreatePost}
        setCreateImgOrVideo={setCreateImgOrVideo}
        setCreateNewStory={setCreateNewStory}
      />
    </>
  );
};
export default Create;
