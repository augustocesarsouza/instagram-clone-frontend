import Url from '../../../Utils/Url';
import { FollowersUserProps, FollowingListsProps } from '../../../templates/Profile/Profile';
import * as Styled from './styled';

interface ModalUserDeleteFollowerProps {
  showConfirmDelete: boolean;
  setShowConfirmDelete: React.Dispatch<React.SetStateAction<boolean>>;
  dataUserDeleteFollower: FollowingListsProps | null;
  userId: number;
  setFollowersUser: React.Dispatch<React.SetStateAction<FollowersUserProps[] | null>>;
}

const ModalUserDeleteFollower = ({
  showConfirmDelete,
  setShowConfirmDelete,
  dataUserDeleteFollower,
  userId,
  setFollowersUser,
}: ModalUserDeleteFollowerProps) => {
  const handleCloseModalRemoveFollowing = () => {
    setShowConfirmDelete(false);
  };

  const handleRemoveFollowing = async () => {
    const jsonRemoveFollowing = {
      FollowerId: dataUserDeleteFollower?.id,
      FollowingId: userId,
    };

    const res = await fetch(`${Url}/follow`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonRemoveFollowing),
    });
    if (res.status === 200) {
      const json = await res.json();
      console.log(json.data);
      var follower = json.data;
      setFollowersUser((prev) =>
        prev !== null ? [...prev.filter((fo) => fo.id != follower.followerId)] : prev
      );
      setShowConfirmDelete(false);
    }
  };

  return (
    <>
      {showConfirmDelete && (
        <Styled.ContainerModalConfirmDelete>
          <Styled.ModalContentConfirmDelete>
            <Styled.ContainerInfoUserDelete>
              <Styled.WrapperImg>
                {dataUserDeleteFollower && <Styled.Img src={dataUserDeleteFollower.imagePerfil} />}
              </Styled.WrapperImg>
              <Styled.WrapperMessage>
                <Styled.P>Remover seguidor?</Styled.P>
              </Styled.WrapperMessage>
              <Styled.WrapperWarning>
                {dataUserDeleteFollower && (
                  <Styled.P>
                    O Instagram não avisará {dataUserDeleteFollower.name} de que ele(a) foi
                    removido(a) dos seus seguidores.
                  </Styled.P>
                )}
              </Styled.WrapperWarning>
            </Styled.ContainerInfoUserDelete>
            <Styled.ContainerMainButton>
              <Styled.WrapperButtonRemove>
                <Styled.Button $button="remove" onClick={handleRemoveFollowing}>
                  Remover
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

export default ModalUserDeleteFollower;
