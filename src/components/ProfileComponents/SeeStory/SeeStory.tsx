import { LastStorySeenProps, StoryProps, jsonPropertyTextProps } from '../InfoProfile/InfoProfile';
import React, { useEffect, useRef, useState } from 'react';
import ChoiceStory from '../ChoiceStory/ChoiceStory';
import StoryActions from '../StoryActions/StoryActions';
import { DataUserOnlyProps } from '../../../templates/Profile/Profile';

interface SeeStoryProps {
  story: StoryProps[];
  userId: number;
  choiceStory: boolean;

  dataUserOnly: DataUserOnlyProps | null;
  lastStorySeen: LastStorySeenProps | undefined;
  setChoiceStory: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setLastStorySeen: React.Dispatch<React.SetStateAction<LastStorySeenProps | undefined>>;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const SeeStory = ({
  story,
  userId,
  choiceStory,

  dataUserOnly,
  lastStorySeen,
  setCreatePost,
  setChoiceStory,
  setLastStorySeen,
  setCreateNewStory,
}: SeeStoryProps) => {
  const [seeStories, setSeeStories] = useState(false);

  return (
    <>
      {choiceStory && (
        <ChoiceStory
          story={story}
          choiceStory={choiceStory}
          setChoiceStory={setChoiceStory}
          setCreatePost={setCreatePost}
          setSeeStories={setSeeStories}
          setCreateNewStory={setCreateNewStory}
        />
      )}
      {seeStories && (
        <StoryActions
          story={story}
          userId={userId}
          seeStories={seeStories}
          dataUserOnly={dataUserOnly}
          lastStorySeen={lastStorySeen}
          setSeeStories={setSeeStories}
          setChoiceStory={setChoiceStory}
          setLastStorySeen={setLastStorySeen}
        />
      )}
    </>
  );
};

export default SeeStory;
