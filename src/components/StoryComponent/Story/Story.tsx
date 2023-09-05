import ModalSharePhoto from '../../ProfileComponents/ModalSharePhoto/ModalSharePhoto';
import * as Styled from './styled';
import { useState } from 'react';

import { StoryProps } from '../../ProfileComponents/InfoProfile/InfoProfile';
import { AllPost } from '../../HomePage/CardPost/CardPost';

interface StoryPropss {
  userId: number | null;
  choiceStory: boolean;
  createNewStory: boolean;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setStory: React.Dispatch<React.SetStateAction<StoryProps[]>>;
  setNewStory: React.Dispatch<React.SetStateAction<boolean>>;
  setShowStoryCircle: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

export interface StoryImgProps {
  id: number;
  url: string;
  usersSeenStoryList: number[];
}

const Story = ({
  userId,
  choiceStory,
  createNewStory,
  setStory,
  setNewStory,
  setCreateNewStory,
  setShowStoryCircle,
}: StoryPropss) => {
  const [createPost, setCreatePost] = useState(false); //Criei por obrigação
  const [createImgOrVideo, setCreateImgOrVideo] = useState<AllPost | null>(null);
  return (
    <Styled.ContainerMain>
      <ModalSharePhoto
        userId={userId}
        createPost={createPost}
        choiceStory={choiceStory}
        createNewStory={createNewStory}
        setStory={setStory}
        setNewStory={setNewStory}
        setCreateNewStory={setCreateNewStory}
        setShowStoryCircle={setShowStoryCircle}
        setCreateImgOrVideo={setCreateImgOrVideo}
        setCreatePost={setCreatePost}
      />
    </Styled.ContainerMain>
  );
};
export default Story;
