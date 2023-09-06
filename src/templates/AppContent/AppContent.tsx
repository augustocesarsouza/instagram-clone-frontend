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

interface User {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
  birthDate: string;
}

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
}

export interface UserFollowingProps {
  id: number;
  name: string;
  imagePerfil: string;
  email: string;
  lastDisconnectedTime: number;
  lastDisconnectedTimeMinutes: number;
}

const AppContent = () => {
  const [shouldRenderMenu, setShouldRenderMenu] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [emailConnection, setEmailConnection] = useState<string | null>(null);
  const [dataUser, setDataUser] = useState<DataUser | null>(null);
  const location = useLocation();
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [emailUsers, setEmailUsers] = useState<string[] | null>(null);
  const [myFollowing, setMyFollowing] = useState<Following[]>([]);
  const [showModalShare, setShowModalShare] = useState(false);

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

    // const fetchFollowing = async () => {
    //   if (dataUser !== null) {
    //     return;
    //   }
    //   const res = await fetch(`${Url}/userFollows/${userId}`);
    //   if (res.status === 200) {
    //     const json = await res.json();

    //     setDataUser(json.data);
    //     setMyFollowing(json.data.following);
    //     const emailUsersArray = [];

    //     json.data.following.forEach((follo) => {
    //       emailUsersArray.push(follo.email);
    //     });
    //     setEmailUsers(emailUsersArray);
    //   }
    // };
    // fetchFollowing();

    const fetchfollowers = async () => {
      if (dataUser !== null) {
        return;
      }

      const resUser = await fetch(`${Url}/userDataOnly/${userId}`);
      if (resUser.status === 200) {
        const json = await resUser.json();
        setDataUser(json.data);
      }

      const res = await fetch(`${Url}/followingfromuser/${userId}`);
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
    fetchfollowers();
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === '/' || emailUsers == null) return;
    setTimeout(() => {
      initializeSignalRConnection();
    }, 50);

    return () => {
      connection?.off('UserConnection');
    };
  }, [emailUsers]);

  const initializeSignalRConnection = async () => {
    if (connection === null && emailUsers !== null) {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl('https://localhost:7266/chat')
        .build();
      setConnection(newConnection);

      newConnection.on('UserConnection', (email) => {
        setMyFollowing((s) => {
          myFollowing.forEach((f) => {
            if (f.email == email) {
              f.isOnline = true;
            }
          });
          return [...s];
        });
      });

      newConnection.on('UserDisconnected', (email, userDisconnectedTime) => {
        setMyFollowing((s) => {
          s.forEach((f) => {
            if (f.email == email) {
              f.isOnline = false;
              const currentTime = new Date();

              const lastDisconnectedMoment = new Date(userDisconnectedTime);

              const timeDiff = Math.floor(
                (currentTime.getTime() - lastDisconnectedMoment.getTime()) / 60000
              );

              f.lastDisconnectedTimeMinutes = timeDiff;
            }
          });
          return [...s];
        });
      });

      newConnection.on('IsOnline', (email) => {
        setMyFollowing((s) => {
          s.forEach((f) => {
            email.forEach((e) => {
              if (f.email == e.email) {
                f.isOnline = e.isOnline;
              }
            });
          });
          return [...s];
        });

        setMyFollowing((s) => {
          s.forEach((f) => {
            email.forEach((e) => {
              if (f.isOnline == false && f.email == e.email) {
                const currentTime = new Date();

                const lastDisconnectedMoment = new Date(f.lastDisconnectedTime);

                const timezoneOffSet = lastDisconnectedMoment.getTimezoneOffset();

                lastDisconnectedMoment.setMinutes(
                  lastDisconnectedMoment.getMinutes() - timezoneOffSet
                );

                const timeDiff = Math.floor(
                  (currentTime.getTime() - lastDisconnectedMoment.getTime()) / 60000
                );

                f.lastDisconnectedTimeMinutes = timeDiff;
              }
            });
          });
          return [...s];
        });

        const MINUTE_IN_MS = 60000;
        const HOUR_IN_MS = 3600000;
        const DAY_IN_MS = 86400000;
        const WEEK_IN_MS = 604800000;
        const MES_IN_MS = 2678400000;

        setMyFollowing((mf) => {
          const updatedFollowing = mf.map((f) => {
            if (!f.isOnline) {
              const lastDisconnectedTimeMs = f.lastDisconnectedTimeMinutes * MINUTE_IN_MS;
              let measureOfTime = 'minuto';
              let disconnectedTime = lastDisconnectedTimeMs;

              if (disconnectedTime >= MES_IN_MS) {
                measureOfTime = 'mes';
                disconnectedTime /= MES_IN_MS;
                disconnectedTime = Math.floor(disconnectedTime);
              } else if (disconnectedTime >= WEEK_IN_MS) {
                measureOfTime = 'semana';
                disconnectedTime /= WEEK_IN_MS;
              } else if (disconnectedTime >= DAY_IN_MS) {
                measureOfTime = 'dia';
                disconnectedTime /= DAY_IN_MS;
              } else if (disconnectedTime >= HOUR_IN_MS) {
                measureOfTime = 'hora';
                disconnectedTime /= HOUR_IN_MS;
              } else {
                disconnectedTime /= MINUTE_IN_MS;
              }

              disconnectedTime = Math.min(
                Math.floor(disconnectedTime),
                measureOfTime === 'semana' ? 4 : 59
              );

              return {
                ...f,
                measureOfTime,
                lastDisconnected: disconnectedTime,
              };
            }
            return f;
          });
          return updatedFollowing;
        });
      });

      try {
        await newConnection.start();
        newConnection.invoke('OnConnectedAsync', emailConnection, emailUsers);
        newConnection.invoke('Verficar', emailUsers);
      } catch (error) {
        console.error('Error establishing SignalR connection:', error);
      }

      window.addEventListener(
        'beforeunload',
        (e) => {
          e.preventDefault();

          newConnection.invoke('OnDisconnectedAsync', emailConnection, emailUsers);
        },
        true
      );
    }
  };

  const showModalTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (showModalTimeoutRef.current) {
      clearTimeout(showModalTimeoutRef.current);
    }

    showModalTimeoutRef.current = setTimeout(() => {
      const MINUTE_IN_MS = 60000;
      const HOUR_IN_MS = 3600000;
      const DAY_IN_MS = 86400000;
      const WEEK_IN_MS = 604800000;
      const MES_IN_MS = 2678400000;

      setMyFollowing((mf) => {
        const updatedFollowing = mf.map((f) => {
          if (!f.isOnline) {
            const lastDisconnectedTimeMs = f.lastDisconnectedTimeMinutes * MINUTE_IN_MS;
            let measureOfTime = 'minuto';
            let disconnectedTime = lastDisconnectedTimeMs;

            if (disconnectedTime >= MES_IN_MS) {
              measureOfTime = 'mes';
              disconnectedTime /= MES_IN_MS;
              disconnectedTime = Math.floor(disconnectedTime);
            } else if (disconnectedTime >= WEEK_IN_MS) {
              measureOfTime = 'semana';
              disconnectedTime /= WEEK_IN_MS;
            } else if (disconnectedTime >= DAY_IN_MS) {
              measureOfTime = 'dia';
              disconnectedTime /= DAY_IN_MS;
            } else if (disconnectedTime >= HOUR_IN_MS) {
              measureOfTime = 'hora';
              disconnectedTime /= HOUR_IN_MS;
            } else {
              disconnectedTime /= MINUTE_IN_MS;
            }

            disconnectedTime = Math.min(
              Math.floor(disconnectedTime),
              measureOfTime === 'semana' ? 4 : 59
            );

            return {
              ...f,
              measureOfTime,
              lastDisconnected: disconnectedTime,
              lastDisconnectedTimeMinutes: f.lastDisconnectedTimeMinutes + 1,
            };
          }
          return f;
        });
        return updatedFollowing;
      });
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

  return (
    <Styled.ContainerMain
      $pathnamecurrent={pathnameCurrent}
      $seefollowersorfollowing={String(seeFollowersOrFollowing)}
    >
      {shouldRenderMenu && (
        <Menu
          userId={userId}
          emailConnection={emailConnection}
          setImgUserLogged={setImgUserLogged}
          callOpenModalCreatePublication={callOpenModalCreatePublication}
          setCreatePost={setCreatePost}
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
              createImgOrVideo={createImgOrVideo}
              setCreatePost={setCreatePost}
              connection={connection}
              setSeeFollowersOrFollowing={setSeeFollowersOrFollowing}
            />
          }
        />

        <Route
          path="/Message"
          element={
            <Message dataUser={dataUser} connection={connection} myFollowing={myFollowing} />
          }
        />

        <Route path="/Reels" element={<Reels userId={userId} imgUserLogged={imgUserLogged} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {showModalShare && (
        <Create
          showModalShare={showModalShare}
          setShowModalShare={setShowModalShare}
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
