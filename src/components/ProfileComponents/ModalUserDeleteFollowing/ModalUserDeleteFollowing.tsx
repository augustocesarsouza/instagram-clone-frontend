import { FollowingListsProps } from '../../../templates/Profile/Profile';
import * as Styled from './styled';

interface ModalUserDeleteFollowingProps {
  showConfirmDelete: boolean;
  dataUserDeleteFollowing: FollowingListsProps | null;
  setDataUserDeleteFollowing: React.Dispatch<React.SetStateAction<FollowingListsProps | null>>;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  followingList: FollowingListsProps[] | null;
  setFollowingList: React.Dispatch<React.SetStateAction<FollowingListsProps[] | null>>;
}

const ModalUserDeleteFollowing = ({
  showConfirmDelete,
  dataUserDeleteFollowing,
  setDataUserDeleteFollowing,
  setShowConfirmDelete,
  followingList,
  setFollowingList,
}: ModalUserDeleteFollowingProps) => {
  const handleRemoveFollowing = () => {
    if (followingList && dataUserDeleteFollowing) {
      const updatedFollowingList = followingList.filter(
        (item) => item.id !== dataUserDeleteFollowing.id
      );
      setFollowingList(updatedFollowingList);
      setShowConfirmDelete(false);
    }
  };

  const handleCloseModalRemoveFollowing = () => {
    setShowConfirmDelete(false);
    setDataUserDeleteFollowing(null);
  };

  return (
    <>
      {showConfirmDelete && (
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

export default ModalUserDeleteFollowing;
