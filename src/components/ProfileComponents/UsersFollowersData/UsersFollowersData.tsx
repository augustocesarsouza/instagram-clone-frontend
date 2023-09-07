import { UsersSuggestionProps } from '../ModalFollowers/ModalFollowers';
import * as Styled from './styled';
import { memo } from 'react';

interface UsersFollowersDataProps {
  fo: UsersSuggestionProps;
}

const UsersFollowersData = ({ fo }: UsersFollowersDataProps) => {
  return (
    <Styled.WrapperOnlyImgAndName>
      <Styled.WrapperImgFollower>
        <Styled.ImgFollower src={fo.imagePerfil} />
      </Styled.WrapperImgFollower>
      <Styled.WrapperInfoFollower>
        <Styled.NamePFollower>{fo.name}</Styled.NamePFollower>
      </Styled.WrapperInfoFollower>
    </Styled.WrapperOnlyImgAndName>
  );
};

export default memo(UsersFollowersData);
