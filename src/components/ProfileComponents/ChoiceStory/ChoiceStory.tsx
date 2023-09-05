import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { StoryProps } from '../InfoProfile/InfoProfile';

interface ChoiceStoryProps {
  story: StoryProps[];
  choiceStory: boolean;
  setChoiceStory: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeStories: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChoiceStory = ({
  story,
  choiceStory,
  setChoiceStory,
  setCreatePost,
  setSeeStories,
  setCreateNewStory,
}: ChoiceStoryProps) => {
  const handleCreateNewStory = () => {
    setChoiceStory(false);
    document.body.style.overflow = 'hidden';
    setCreateNewStory(true);
  };

  const handleSeeStories = () => {
    setSeeStories(true);
    setChoiceStory(false);
    setCreatePost(false);
  };

  const handleCloseChoice = () => {
    setChoiceStory((prev) => !prev);
  };

  return (
    <>
      {choiceStory && (
        <Styled.ContainerBackground>
          <Styled.SvgIconExit onClick={handleCloseChoice}>
            <FontAwesomeIcon icon={faXmark} className="icon-exit" />
          </Styled.SvgIconExit>
          <Styled.ContainerChoice>
            <Styled.ButtonChoice onClick={handleCreateNewStory}>Criador Story</Styled.ButtonChoice>
            {story.length > 0 && (
              <Styled.ButtonChoice onClick={handleSeeStories}>Ver Story</Styled.ButtonChoice>
            )}
          </Styled.ContainerChoice>
        </Styled.ContainerBackground>
      )}
    </>
  );
};

export default ChoiceStory;
