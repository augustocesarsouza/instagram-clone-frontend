import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as Styled from './styled';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { StoryProps } from '../InfoProfile/InfoProfile';
import { useRef, useContext } from 'react';
import {
  ContextProfile,
  ContextProfileProps,
  DataUserOnlyProps,
} from '../../../templates/Profile/Profile';
import Url from '../../../Utils/Url';

interface ChoiceStoryProps {
  story: StoryProps[];
  choiceStory: boolean;
  dataUserOnly: DataUserOnlyProps | null;
  setChoiceStory: React.Dispatch<React.SetStateAction<boolean>>;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setSeeStories: React.Dispatch<React.SetStateAction<boolean>>;
  setCreateNewStory: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChoiceStory = ({
  story,
  choiceStory,
  dataUserOnly,
  setChoiceStory,
  setCreatePost,
  setSeeStories,
  setCreateNewStory,
}: ChoiceStoryProps) => {
  const contextProfile = useContext<ContextProfileProps | null>(ContextProfile);

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

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleOpenInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeImgUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = async (e) => {
        const base64Img = e.target?.result as string;
        if (contextProfile && base64Img && dataUserOnly) {
          const email = dataUserOnly.email;
          const objBase64 = {
            Base64: base64Img,
          };

          const res = await fetch(`${Url}/update/perfilimg/${email}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(objBase64),
          });
          if (res.status === 200) {
            const json = await res.json();
            console.log(json.data);

            contextProfile.setDataUserOnly((prev) =>
              prev !== null ? { ...prev, imagePerfil: base64Img } : prev
            );
            contextProfile.setBase64ImgChange(base64Img);
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Styled.ContainerBackground>
      {choiceStory && (
        <Styled.ContainerMain>
          <Styled.ContainerChoice>
            <Styled.SvgIconExit onClick={handleCloseChoice}>
              <FontAwesomeIcon icon={faXmark} className="icon-exit" />
            </Styled.SvgIconExit>
            <Styled.ButtonChoice $buttonposition="1" onClick={handleCreateNewStory}>
              Criador Story
            </Styled.ButtonChoice>
            <Styled.ButtonChoice $buttonposition="2" onClick={handleOpenInput}>
              Adicionar Imagem Perfil
              <input
                type="file"
                multiple={false}
                accept="video/*, image/*"
                ref={inputRef}
                onChange={handleChangeImgUser}
                hidden
              />
            </Styled.ButtonChoice>
            {story.length > 0 && (
              <Styled.ButtonChoice $buttonposition="3" onClick={handleSeeStories}>
                Ver Story
              </Styled.ButtonChoice>
            )}
          </Styled.ContainerChoice>
        </Styled.ContainerMain>
      )}
    </Styled.ContainerBackground>
  );
};

export default ChoiceStory;
