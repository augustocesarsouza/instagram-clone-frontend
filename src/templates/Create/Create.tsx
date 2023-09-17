import Url from '../../Utils/Url';
import { AllPost } from '../../components/HomePage/CardPost/CardPost';
import ModalSharePhoto from '../../components/ProfileComponents/ModalSharePhoto/ModalSharePhoto';
import { DataPost } from '../../components/ProfileComponents/Publications/Publications';
import * as Styled from './styled';
import { useEffect, useState } from 'react';

interface CreateProps {
  userId: number | null;
  createPost: boolean;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateImgOrVideoForAllPost: React.Dispatch<React.SetStateAction<AllPost | null>>;
  setCreateImgOrVideoForProfile: React.Dispatch<React.SetStateAction<DataPost | null>>;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

const Create = ({
  userId,
  createPost,
  setCreatePost,
  setCreateImgOrVideoForAllPost,
  setCreateImgOrVideoForProfile,
}: CreateProps) => {
  const [createNewStory, setCreateNewStory] = useState(true);

  return (
    <>
      <ModalSharePhoto
        userId={userId}
        createPost={createPost}
        createNewStory={createNewStory}
        setCreatePost={setCreatePost}
        setCreateNewStory={setCreateNewStory}
        setCreateImgOrVideoForAllPost={setCreateImgOrVideoForAllPost}
        setCreateImgOrVideoForProfile={setCreateImgOrVideoForProfile}
      />
    </>
  );
};
export default Create;
