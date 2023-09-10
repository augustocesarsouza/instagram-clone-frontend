import { useEffect, useState, useRef } from 'react';
import * as Styled from './styled';
import Url from '../../Utils/Url';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faPause,
  faPlay,
  faVolumeHigh,
  faVolumeXmark,
} from '@fortawesome/free-solid-svg-icons';
import VideoComponent from '../../components/ReelsComponent/VideoComponent/VideoComponent';
import Like from '../../components/HomePage/Like/Like';
import LikesReels from '../../components/ReelsComponent/LikesReels/LikesReels';
import CommentsReels from '../../components/ReelsComponent/CommentsReels/CommentsReels';
import ShareReels from '../../components/ReelsComponent/ShareReels/ShareReels';

interface ReelsProps {
  userId: number | null;
  imgUserLogged: string;
}

export interface ListReels {
  id: number;
  title: string;
  url: string;
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

const Reels = ({ userId, imgUserLogged }: ReelsProps) => {
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

  return (
    <Styled.ContainerMain ref={ContainerRef}>
      <Styled.ContainerSecond>
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
                <ShareReels />
              </Styled.ContainerStatusVideo>
            </Styled.ContainerMainReelsAndStatusVideo>
          ))}
      </Styled.ContainerSecond>
    </Styled.ContainerMain>
  );
};

export default Reels;
