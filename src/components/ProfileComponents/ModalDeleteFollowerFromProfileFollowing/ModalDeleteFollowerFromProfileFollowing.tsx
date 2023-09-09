import { useContext } from 'react';
import Url from '../../../Utils/Url';
import {
  ContextProfile,
  ContextProfileProps,
  FollowingListsProps,
} from '../../../templates/Profile/Profile';
import { followingByUserLoggedProps } from '../FollowOrUnFollow/FollowOrUnFollow';
import * as Styled from './styled';

interface ModalDeleteFollowerFromProfileFollowingProps {
  userId: number | null;
  showConfirmDeleteFollowing: boolean;
  dataUserDeleteFollowing: FollowingListsProps | null;
  setShowConfirmDeleteFollowing: React.Dispatch<React.SetStateAction<boolean>>;
  setDataUserDeleteFollowing: React.Dispatch<React.SetStateAction<FollowingListsProps | null>>;
  setMockFollowingByUserLogged: React.Dispatch<
    React.SetStateAction<followingByUserLoggedProps[] | []>
  >;
}

const ModalDeleteFollowerFromProfileFollowing = ({
  userId,
  showConfirmDeleteFollowing,
  dataUserDeleteFollowing,
  setShowConfirmDeleteFollowing,
  setDataUserDeleteFollowing,
  setMockFollowingByUserLogged,
}: ModalDeleteFollowerFromProfileFollowingProps) => {
  const useContextModalFollowers = useContext<ContextProfileProps | null>(ContextProfile);

  const handleRemoveFollowing = async () => {
    if (dataUserDeleteFollowing === null) return;
    const userUnFollow = dataUserDeleteFollowing.id;

    setMockFollowingByUserLogged((prev) =>
      prev !== null ? [...prev.filter((f) => f.followingId !== userUnFollow)] : prev
    );

    setShowConfirmDeleteFollowing(false);
  };

  const handleCloseModalRemoveFollowing = () => {
    setShowConfirmDeleteFollowing(false);
    setDataUserDeleteFollowing(null);
  };
  return (
    <>
      {showConfirmDeleteFollowing && (
        <Styled.ContainerModalConfirmDelete>
          <Styled.ModalContentConfirmDelete>
            <Styled.ContainerInfoUserDelete>
              <Styled.WrapperImg>
                {dataUserDeleteFollowing && (
                  <Styled.Img src={dataUserDeleteFollowing.imagePerfil} />
                )}
              </Styled.WrapperImg>
              <Styled.WrapperWarning>
                {dataUserDeleteFollowing && (
                  <Styled.P>Deixar de seguir @{dataUserDeleteFollowing.name}</Styled.P>
                )}
              </Styled.WrapperWarning>
            </Styled.ContainerInfoUserDelete>
            <Styled.ContainerMainButton>
              <Styled.WrapperButtonRemove>
                <Styled.Button $button="remove" onClick={handleRemoveFollowing}>
                  Deixar de seguir
                </Styled.Button>
              </Styled.WrapperButtonRemove>
              <Styled.WrapperButtonCancel>
                <Styled.Button $button="cancel" onClick={handleCloseModalRemoveFollowing}>
                  Cancelar
                </Styled.Button>
              </Styled.WrapperButtonCancel>
            </Styled.ContainerMainButton>
          </Styled.ModalContentConfirmDelete>
        </Styled.ContainerModalConfirmDelete>
      )}
    </>
  );
};

export default ModalDeleteFollowerFromProfileFollowing;
