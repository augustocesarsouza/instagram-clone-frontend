import { useState, useEffect, useLayoutEffect, createContext, useRef } from 'react';
import * as Styled from './styled';
import { useLocation } from 'react-router-dom';
import Url from '../../Utils/Url';
import InfoProfile from '../../components/ProfileComponents/InfoProfile/InfoProfile';
import ModalFollowers from '../../components/ProfileComponents/ModalFollowers/ModalFollowers';
import ModalFollowing from '../../components/ProfileComponents/ModalFollowing/ModalFollowing';
import ContainerPublications from '../../components/ContainerPublications/ContainerPublications';
import Publications from '../../components/ProfileComponents/Publications/Publications';
import { AllPost } from '../../components/HomePage/CardPost/CardPost';

interface ProfileProps {
  userId: number;
  createImgOrVideo: AllPost | null;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  ifTrueCreatePostFalseCreateStory: boolean;
  setIfTrueCreatePostFalseCreateStory: React.Dispatch<React.SetStateAction<boolean>>;
  connection: signalR.HubConnection | null;
}

export interface DataUser {
  id: number;
  name: string;
  imagePerfil: string;
  follower: Follower[];
  following: Following[];
}

interface Follower {
  id: number;
  name: string;
  imagePerfil: string;
}

interface Following {
  id: number;
  name: string;
  imagePerfil: string;
}

export interface DataUserOnlyProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

export interface FollowersUserProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

export interface FollowingUserProps {
  id: number;
  name: string;
  followingLists: FollowingListsProps[];
}

export interface FollowingListsProps {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

export interface dataUserFriendRequestProps {
  id: number;
  recipientId: number;
  senderId: number;
  status: string;
  sender: User;
}

interface User {
  id: number;
  name: string;
  imagePerfil: string;
}

export interface ContextProfileProps {
  connection: signalR.HubConnection | null;
}

export const ContextProfile = createContext<ContextProfileProps | null>(null);

const Profile = ({ userId, createImgOrVideo, setCreatePost, connection }: ProfileProps) => {
  const location = useLocation();

  const { postCreatorId } = location.state ? location.state : 0;

  const [followingList, setFollowingList] = useState<FollowingListsProps[] | null>(null);
  const [followersUser, setFollowersUser] = useState<FollowersUserProps[] | null>(null);
  const [followingUser, setFollowingUser] = useState<FollowingListsProps[] | null>(null);
  const [dataUserOnly, setDataUserOnly] = useState<DataUserOnlyProps | null>(null);
  const [fetchOnLoggedInUser, setFetchOnLoggedInUser] = useState(false);
  const [checkIfUserAlreadyFollows, setCheckIfUserAlreadyFollows] = useState({});

  useEffect(() => {
    const fetchUserDataOnly = async (value: number) => {
      const res = await fetch(`${Url}/userDataOnly/${value}`);
      if (res.status === 200) {
        const json = await res.json();
        setDataUserOnly(json.data as DataUserOnlyProps);
      }
    };

    if (postCreatorId > 0) {
      // Clicando no Perfil do Usuário Direto da Página Inicial
      fetchUserDataOnly(postCreatorId);
    } else {
      // Clicando no Meu Perfil Perfil
      fetchUserDataOnly(userId);
      setFetchOnLoggedInUser(true);
    }

    if (postCreatorId == userId) {
      setFetchOnLoggedInUser(true);
    }
  }, [postCreatorId, userId]);

  useLayoutEffect(() => {
    const fetchFollowersUser = async (value: number) => {
      const res = await fetch(`${Url}/followersfromuser/${value}`);
      if (res.status === 200) {
        const json = await res.json();
        setFollowersUser(json.data as FollowersUserProps[]);
      }
    };
    if (postCreatorId > 0) {
      fetchFollowersUser(postCreatorId);
    } else {
      fetchFollowersUser(userId);
      setFetchOnLoggedInUser(true);
    }
  }, [postCreatorId, checkIfUserAlreadyFollows, userId]);

  useLayoutEffect(() => {
    const fetchFollowersUser = async (value: number) => {
      const res = await fetch(`${Url}/followingfromuser/${value}`);
      if (res.status === 200) {
        const json = await res.json();
        setFollowingUser(json.data as FollowingListsProps[]);
        setFollowingList(json.data as FollowingListsProps[]);
      }
    };
    if (postCreatorId > 0) {
      fetchFollowersUser(postCreatorId);
    } else {
      fetchFollowersUser(userId);
      setFetchOnLoggedInUser(true);
    }
  }, [postCreatorId, userId]);

  const [showModalFollower, setShowModalFollower] = useState(false);
  const [showModalFollowing, setShowModalFollowing] = useState(false);

  const handleFollower = () => {
    setShowModalFollower(true);
  };

  const handleFollowing = () => {
    setShowModalFollowing(true);
  };

  const [countPublic, setCountPublic] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflowY = 'visible';
  }, []);

  const ContainerMainRefWidth = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {dataUserOnly ? (
        <ContextProfile.Provider value={{ connection }}>
          <Styled.ContainerMain>
            <Styled.ContainerAdjust>
              <Styled.ContainerSubMain>
                <InfoProfile
                  dataUserOnly={dataUserOnly}
                  followersUser={followersUser}
                  handleFollower={handleFollower}
                  handleFollowing={handleFollowing}
                  setCreatePost={setCreatePost}
                  followingList={followingList}
                  userId={userId}
                  fetchOnLoggedInUser={fetchOnLoggedInUser}
                  setCheckIfUserAlreadyFollows={setCheckIfUserAlreadyFollows}
                  countPublic={countPublic}
                  checkIfUserAlreadyFollows
                />
                <ModalFollowers
                  showModalFollower={showModalFollower}
                  followersUser={followersUser}
                  setShowModalFollower={setShowModalFollower}
                  userId={userId}
                  setFollowersUser={setFollowersUser}
                />
                <ModalFollowing
                  showModalFollowing={showModalFollowing}
                  setShowModalFollowing={setShowModalFollowing}
                  followingUser={followingUser}
                  setFollowingUser={setFollowingUser}
                  userId={userId}
                  setFollowingList={setFollowingList}
                  followingList={followingList}
                />
              </Styled.ContainerSubMain>
            </Styled.ContainerAdjust>
            <ContainerPublications ContainerMainRefWidth={ContainerMainRefWidth} />
            <Publications
              userId={userId}
              dataUserOnly={dataUserOnly}
              setCountPublic={setCountPublic}
              createImgOrVideo={createImgOrVideo}
              ContainerMainRefWidth={ContainerMainRefWidth}
            />
          </Styled.ContainerMain>
        </ContextProfile.Provider>
      ) : (
        <div>
          <h1>Carregando</h1>
        </div>
      )}
    </>
  );
};

export default Profile;
