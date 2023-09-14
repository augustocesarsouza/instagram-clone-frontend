import Url from '../../Utils/Url';
import { AllPost } from '../../components/HomePage/CardPost/CardPost';
import ModalSharePhoto from '../../components/ProfileComponents/ModalSharePhoto/ModalSharePhoto';
import * as Styled from './styled';
import { useEffect, useState } from 'react';

interface CreateProps {
  showModalShare: boolean;
  setShowModalShare: React.Dispatch<React.SetStateAction<boolean>>;
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

const Create = ({
  showModalShare,
  setShowModalShare,
  userId,
  createPost,
  setCreatePost,
  setCreateImgOrVideo,
}: CreateProps) => {
  const [createNewStory, setCreateNewStory] = useState(false);
  const [choiceStory] = useState(false);

  return (
    <>
      <ModalSharePhoto
        userId={userId}
        createPost={createPost}
        choiceStory={choiceStory}
        createNewStory={createNewStory}
        showModalShare={showModalShare}
        setShowModalShare={setShowModalShare}
        setCreatePost={setCreatePost}
        setCreateImgOrVideo={setCreateImgOrVideo}
        setCreateNewStory={setCreateNewStory}
      />
    </>
  );
};
export default Create;
