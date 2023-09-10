import Url from '../../../Utils/Url';
import * as Styled from './styled';
import { useEffect, useState } from 'react';

interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

interface InfoUserShareProps {
  text: string;
  isImg: boolean;
  userId: number | null;
  showShare: boolean;
  createPost: boolean;
  decreaseDiv: boolean;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const InfoUserShare = ({
  text,
  isImg,
  userId,
  showShare,
  createPost,
  decreaseDiv,
  handleChange,
}: InfoUserShareProps) => {
  const [dataUserOnly, setDataUserOnly] = useState<DataUserOnlyProps | null>(null);

  useEffect(() => {
    const fetchUserDataOnly = async () => {
      const res = await fetch(`${Url}/user/data/${userId}`);
      if (res.status === 200) {
        const json = await res.json();
        setDataUserOnly(json.data as DataUserOnlyProps);
      }
    };
    fetchUserDataOnly();
  }, [userId]);

  return (
    <>
      {showShare && createPost && (
        <Styled.ContainerPublic
          $extende={String(showShare)}
          $decrease={String(decreaseDiv)}
          $isimg={String(isImg)}
          $createpost={String(createPost)}
        >
          {dataUserOnly && (
            <Styled.WrapperDataUser>
              <Styled.WrapperImgUser>
                <Styled.ImgUser src={dataUserOnly.imagePerfil} alt="img-user" />
              </Styled.WrapperImgUser>
              <Styled.WrapperUser>
                <Styled.NameUserP>{dataUserOnly.name}</Styled.NameUserP>
              </Styled.WrapperUser>
            </Styled.WrapperDataUser>
          )}
          <Styled.WrapperTextarea>
            <Styled.Textarea
              placeholder="Escreva um legenda..."
              value={text}
              onChange={(e) => handleChange(e)}
            ></Styled.Textarea>
            <Styled.Counter>
              <Styled.PCounter>{text.length}/</Styled.PCounter>
              <Styled.PCounter>2.200</Styled.PCounter>
            </Styled.Counter>
          </Styled.WrapperTextarea>
        </Styled.ContainerPublic>
      )}
    </>
  );
};

export default InfoUserShare;
