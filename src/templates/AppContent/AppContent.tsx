import { Route, Routes, useLocation } from 'react-router-dom';
import Login from '../Login/Login';
import AllPosts from '../AllPosts/AllPosts';
import NotFound from '../NotFound/NotFound';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Menu from '../../components/Menu/Menu';
import * as Styled from './styled';
import CreateAccount from '../../components/CreateAccount/CreateAccount';
import Profile from '../Profile/Profile';
import Message from '../Message/Message';
import Url from '../../Utils/Url';
import * as signalR from '@microsoft/signalr';
import 'moment-timezone';
import Create from '../Create/Create';
import { AllPost } from '../../components/HomePage/CardPost/CardPost';
import Reels from '../Reels/Reels';
import { initializeSignalRConnection } from './InitializeSignalRConnection';
import { TimeUserDisconnected } from './TimeUserDisconnected';

export interface DataUser {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
}

export interface Follower {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
}

export interface Following {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
  isOnline: boolean;
  lastDisconnectedTime: number;
  lastDisconnected: number;
  lastDisconnectedTimeMinutes: number;
  measureOfTime: string;
}

export interface UserFollowingProps {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
  isOnline: boolean;
  lastDisconnectedTime: number;
  lastDisconnectedTimeMinutes: number;
}

const AppContent = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const [emailUsers, setEmailUsers] = useState<string[] | null>(null);
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [myFollowing, setMyFollowing] = useState<Following[]>([]);
  const [showModalShare, setShowModalShare] = useState(false);
  const [emailConnection, setEmailConnection] = useState<string | null>(null);
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userId = localStorage.getItem('UserId');
    const emailConnectionLocal = localStorage.getItem('emailConnection');

    if (userId !== null) {
      setUserId(parseInt(userId));
    }

    if (emailConnectionLocal !== null) {
      setEmailConnection(emailConnectionLocal);
    }

    setShouldRenderMenu(userId !== null);

    if (location.pathname === '/') return;

    const fetchFollowers = async () => {
      if (dataUser !== null) {
        return;
      }

      const resUser = await fetch(`${Url}/user/data/${userId}`);
      if (resUser.status === 200) {
        const json = await resUser.json();
        setDataUser(json.data);
      }

      const res = await fetch(`${Url}/user/following/${userId}`);
      if (res.status === 200) {
        const json = await res.json();

        const data: Following[] = json.data;
        setMyFollowing(data);

        const emailUsersArray: string[] = [];

        data.forEach((follo) => {
          emailUsersArray.push(follo.email);
        });

        setEmailUsers(emailUsersArray);
      }
    };
    fetchFollowers();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' || emailUsers == null) return;
    setTimeout(() => {
      initializeSignalRConnection(
        connection,
        emailUsers,
        emailConnection,
        setConnection,
        setMyFollowing
      );
    }, 50);

    return () => {
      connection?.off('UserConnection');
    };
  }, [emailUsers]);

  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (showModalTimeoutRef.current) {
      clearTimeout(showModalTimeoutRef.current);
    }

    showModalTimeoutRef.current = setTimeout(() => {
      TimeUserDisconnected(setMyFollowing);
    }, 60000);
  }, [showModalTimeoutRef.current]);

  const callOpenModalCreatePublication = (value: boolean) => {
    setShowModalShare(value);
  };

  const [createImgOrVideo, setCreateImgOrVideo] = useState<AllPost | null>(null);
  const [imgUserLogged, setImgUserLogged] = useState<string>('');
  const [createPost, setCreatePost] = useState(true);

  document.body.style.overflowY = 'none';

  const [pathnameCurrent, setPathnameCurrent] = useState('');
  const [seeFollowersOrFollowing, setSeeFollowersOrFollowing] = useState(false);

  useLayoutEffect(() => {
    if (location.pathname === '/profile') {
      setPathnameCurrent('profile');
    }
  }, [location]);

  const [base64ImgChange, setBase64ImgChange] = useState('');

  return (
    <Styled.ContainerMain
      $pathnamecurrent={pathnameCurrent}
      $seefollowersorfollowing={String(seeFollowersOrFollowing)}
    >
      {shouldRenderMenu && (
        <Menu
          userId={userId}
          base64ImgChange={base64ImgChange}
          emailConnection={emailConnection}
          setCreatePost={setCreatePost}
          setImgUserLogged={setImgUserLogged}
          callOpenModalCreatePublication={callOpenModalCreatePublication}
        />
      )}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/AllPost"
          element={<AllPosts createImgOrVideo={createImgOrVideo} connection={connection} />}
        />
        <Route path="/CreateAccount" element={<CreateAccount />} />
        <Route
          path="/Profile"
          element={
            <Profile
              userId={userId}
              setUserId={setUserId}
              connection={connection}
              createImgOrVideo={createImgOrVideo}
              setCreatePost={setCreatePost}
              setBase64ImgChange={setBase64ImgChange}
              setSeeFollowersOrFollowing={setSeeFollowersOrFollowing}
            />
          }
        />

        <Route
          path="/Message"
          element={
            <Message
              myEmail={emailConnection}
              dataUser={dataUser}
              connection={connection}
              myFollowing={myFollowing}
            />
          }
        />

        <Route
          path="/Reels"
          element={
            <Reels
              userId={userId}
              myEmail={emailConnection}
              imgUserLogged={imgUserLogged}
              connection={connection}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showModalShare && (
        <Create
          userId={userId}
          createPost={createPost}
          setCreatePost={setCreatePost}
          setCreateImgOrVideo={setCreateImgOrVideo}
        />
      )}
    </Styled.ContainerMain>
  );
};

export default AppContent;
