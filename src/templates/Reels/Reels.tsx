import { useEffect, useState, useRef, createContext } from 'react';
import * as Styled from './styled';
import Url from '../../Utils/Url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';
import VideoComponent from '../../components/ReelsComponent/VideoComponent/VideoComponent';
import LikesReels from '../../components/ReelsComponent/LikesReels/LikesReels';
import CommentsReels from '../../components/ReelsComponent/CommentsReels/CommentsReels';
import ShareReels from '../../components/ReelsComponent/ShareReels/ShareReels';

interface ReelsProps {
  userId: number | null;
  myEmail: string | null;
  imgUserLogged: string;
  connection: signalR.HubConnection | null;
}

export interface ListReels {
  id: number;
  title: string;
  url: string;
  imgFrameVideoUrl: string;
  user: User;
  isImagem: number; //Só coloquei para passar no Like porque no CardPost esse aqui tem mais no meu aqui dos reels nao preciso
  postLikesCounts: number;
  commentsLikes: number;
  postLikes: PostLikes[];
}

interface PostLikes {
  id: number;
  postId: number;
  authorId: number;
}

interface User {
  id: number;
  imagePerfil: string;
  name: string;
}

export interface VideoObjReelProps {
  id: number;
  imgFrameVideoUrl: string;
  user: User;
}

export interface ReelsContextProps {
  connection: signalR.HubConnection | null;
  myEmail: string | null;
}

export const ReelsContext = createContext<ReelsContextProps | null>(null);

const Reels = ({ userId, myEmail, imgUserLogged, connection }: ReelsProps) => {
  const [listReels, setListReels] = useState<ListReels[] | null>(null);
  const ContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchListReelsAsync = async () => {
    const res = await fetch(`${Url}/post/videos/reels`);
    if (res.status === 200) {
      const json = await res.json();
      setListReels(json.data);
    }
  };

  useEffect(() => {
    fetchListReelsAsync();
  }, []);

  const [isMuted, setIsMuted] = useState(true);
  const [sound, setSound] = useState(false);

  const handleSoundOn = () => {
    setSound(false);
  };

  const handleSoundFalse = () => {
    setSound(true);
    setIsMuted(false);
  };

  const mouseOn = useRef<boolean>(false);

  useEffect(() => {
    document.body.style.overflowY = 'hidden';
  }, []);

  const [showShareReels, setShowShareReels] = useState(false);
  const [videoReels, setVideoReels] = useState<VideoObjReelProps | null>(null);

  const handleOpenShare = (reel: ListReels) => {
    const VideoObjReel: VideoObjReelProps = {
      id: reel.id,
      imgFrameVideoUrl: reel.imgFrameVideoUrl,
      user: {
        id: reel.user.id,
        imagePerfil: reel.user.imagePerfil,
        name: reel.user.name,
      },
    };
    setVideoReels(VideoObjReel);
    setShowShareReels((prev) => !prev);
  };

  return (
    <Styled.ContainerMain ref={ContainerRef}>
      <Styled.ContainerSecond>
        <ReelsContext.Provider value={{ connection, myEmail }}>
          {listReels &&
            listReels.map((ree, index) => (
              <Styled.ContainerMainReelsAndStatusVideo key={ree.id}>
                <Styled.ContainerReelsMain>
                  <VideoComponent
                    ree={ree}
                    index={index}
                    sound={sound}
                    isMuted={isMuted}
                    listReels={listReels}
                    ContainerRef={ContainerRef}
                    mouseOn={mouseOn}
                    userId={userId}
                    setShowShareReels={setShowShareReels}
                    showShareReels={showShareReels}
                    videoReels={videoReels}
                  />
                  <Styled.ContainerForSvg>
                    <Styled.WrapperSvg $svg="sound">
                      {sound ? (
                        <FontAwesomeIcon icon={faVolumeHigh} onClick={handleSoundOn} />
                      ) : (
                        <FontAwesomeIcon icon={faVolumeXmark} onClick={handleSoundFalse} />
                      )}
                    </Styled.WrapperSvg>
                  </Styled.ContainerForSvg>
                </Styled.ContainerReelsMain>
                <Styled.ContainerStatusVideo>
                  <LikesReels reels={ree} userId={userId} />
                  <CommentsReels
                    reels={ree}
                    imgUserLogged={imgUserLogged}
                    userId={userId}
                    mouseOn={mouseOn}
                  />
                  <Styled.ContainerShare>
                    <Styled.WrapperImg onClick={() => handleOpenShare(ree)} $wrapper="icon-share">
                      <svg
                        aria-label="Direto"
                        color="rgb(38, 38, 38)"
                        fill="rgb(38, 38, 38)"
                        height="24"
                        role="img"
                        viewBox="0 0 24 24"
                        width="24"
                      >
                        <title>Direto</title>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="22"
                          x2="9.218"
                          y1="3"
                          y2="10.083"
                        ></line>
                        <polygon
                          fill="none"
                          points="11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></polygon>
                      </svg>
                    </Styled.WrapperImg>
                  </Styled.ContainerShare>
                </Styled.ContainerStatusVideo>
                {/* <ShareReels userId={userId} reels={ree} /> */}
              </Styled.ContainerMainReelsAndStatusVideo>
            ))}
        </ReelsContext.Provider>
      </Styled.ContainerSecond>
    </Styled.ContainerMain>
  );
};

export default Reels;
