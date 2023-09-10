import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import {
  DataUserOnlyProps,
  FollowersUserProps,
  FollowingListsProps,
  dataUserFriendRequestProps,
} from '../../../templates/Profile/Profile';
import * as Styled from './styled';
import UserProfileActions from '../UserProfileActions/UserProfileActions';
import UserProfileStats from '../UserProfileStats/UserProfileStats';
import Story from '../../StoryComponent/Story/Story';
import Url from '../../../Utils/Url';
import SeeStory from '../SeeStory/SeeStory';

interface InfoProfileProps {
  dataUserOnly: DataUserOnlyProps | null;
  followersUser: FollowersUserProps[] | null;
  followingList: FollowingListsProps[] | null;
  userId: number | null;
  fetchOnLoggedInUser: boolean;
  countPublic: number | null;
  handleFollower: () => void;
  handleFollowing: () => void;
  setCreatePost: React.Dispatch<React.SetStateAction<boolean>>;
  setCheckIfUserAlreadyFollows: React.Dispatch<React.SetStateAction<{}>>;
}

export interface StoryProps {
  id: number;
  url: string;
  isImagem: number;
  propertyText: PropertyTextProps;
}

export interface PropertyTextProps {
  id: number;
  background: string;
  fontFamily: string;
  text: string;
  left: number;
  top: number;
  height: number;
  width: number;
  storyId: number;
}

export interface LastStorySeenProps {
  id: number;
  storyId: number;
  userViewedId: number;
  userCreatedPostId: number;
}

export interface jsonPropertyTextProps {
  top: number;
  left: number;
  text: string;
  width: number;
  height: number;
  background: string;
  fontFamily: string;
  storyId: number;
}

const InfoProfile = ({
  dataUserOnly,
  followersUser,
  handleFollower,
  handleFollowing,
  setCreatePost,
  followingList,
  userId,
  fetchOnLoggedInUser,
  setCheckIfUserAlreadyFollows,
  countPublic,
}: InfoProfileProps) => {
  const [story, setStory] = useState<StoryProps[]>([]);
  const [newStory, setNewStory] = useState(false);
  const [choiceStory, setChoiceStory] = useState(false);
  const [lastStorySeen, setLastStorySeen] = useState<LastStorySeenProps | undefined>(undefined);
  const [showStoryCircle, setShowStoryCircle] = useState(true);
  const [alreadyFollowUser, setAlreadyFollowUser] = useState(false);

  useEffect(() => {
    if (dataUserOnly?.id == userId) {
      setAlreadyFollowUser(false);
    }
  }, [dataUserOnly]);

  useEffect(() => {
    if (followersUser) {
      const alreadyFollow = followersUser.some((el) => el.id == userId);
      setAlreadyFollowUser(alreadyFollow);
    }
  }, [followersUser]);

  useEffect(() => {
    const fetchAllStoryUser = async () => {
      if (dataUserOnly) {
        const userCreatePostId = dataUserOnly.id;
        const res = await fetch(`${Url}/story/user/all/${userCreatePostId}`);
        if (res.status === 200) {
          const json = await res.json();

          setStory(json.data);
        }
      }
    };
    fetchAllStoryUser();
  }, [dataUserOnly]);

  useEffect(() => {
    const fetchLastStory = async () => {
      if (dataUserOnly) {
        const userCreatePostId = dataUserOnly.id;
        const res = await fetch(`${Url}/storygetuseridstory/${userId}/${userCreatePostId}`);
        if (res.status === 200) {
          const json = await res.json();
          setLastStorySeen(json.data);
        }
      }
    };
    fetchLastStory();
  }, [dataUserOnly]);

  const handleChoiceStory = () => {
    setNewStory(false);
    setChoiceStory((prev) => !prev);
  };

  useEffect(() => {
    if (story.length > 0) {
      if (lastStorySeen !== undefined) {
        var index = story.findIndex((x) => x.id == lastStorySeen.storyId);

        if (index == story.length - 1) {
          setShowStoryCircle(false);
        }
      }
    }
  }, [story, lastStorySeen]);

  useEffect(() => {
    let videoElements: HTMLVideoElement[] = [];
    let imgElements: HTMLImageElement[] = [];
    const preloadVideos = () => {
      story.forEach((img, index) => {
        if (img.isImagem === 0) {
          const video = document.createElement('video');
          video.src = img.url;
          video.preload = 'auto';
          videoElements.push(video);
        } else {
          const imgElement = document.createElement('img');
          imgElement.src = img.url;
          imgElements.push(imgElement);
        }
      });
    };

    preloadVideos();

    return () => {
      videoElements.forEach((video) => {
        video.pause();
        video.remove();
      });

      imgElements.forEach((video) => {
        video.remove();
      });
    };
  }, [story, newStory]);

  useEffect(() => {
    const preloadNextImagem = () => {
      story.forEach((story) => {
        if (story.isImagem == 1) {
        }
      });
    };
    preloadNextImagem();
  }, [story]);

  const [createNewStory, setCreateNewStory] = useState(false);

  useLayoutEffect(() => {
    if (window.innerWidth <= 575) {
      setWidthLessThan575(true);
    } else {
      setWidthLessThan575(false);
    }
    window.addEventListener('resize', handleResizeWindow);

    return () => {
      window.removeEventListener('resize', handleResizeWindow);
    };
  }, []);

  const [widthLessThan575, setWidthLessThan575] = useState(false);

  const handleResizeWindow = () => {
    if (window.innerWidth <= 575) {
      setWidthLessThan575(true);
    } else {
      setWidthLessThan575(false);
    }
  };

  return (
    <>
      <Styled.ContainerStoryMain>
        <Styled.ContainerForNewStoryAndBorderWhite>
          <Styled.ContainerTest>
            <Styled.ContainerBorder $newstory={String(newStory)} />
            {story.length > 0 && showStoryCircle && (
              <Styled.BouncingBorder $newstory={String(newStory)} />
            )}
            <Styled.WrapperImg>
              {dataUserOnly && (
                <Styled.Img src={dataUserOnly.imagePerfil} onClick={handleChoiceStory} />
              )}
            </Styled.WrapperImg>
          </Styled.ContainerTest>
        </Styled.ContainerForNewStoryAndBorderWhite>
      </Styled.ContainerStoryMain>
      <Styled.Section>
        <UserProfileActions
          dataUserOnly={dataUserOnly}
          fetchOnLoggedInUser={fetchOnLoggedInUser}
          userId={userId}
          alreadyFollowUser={alreadyFollowUser}
          setCheckIfUserAlreadyFollows={setCheckIfUserAlreadyFollows}
        />
        {!widthLessThan575 && (
          <UserProfileStats
            countPublic={countPublic}
            handleFollower={handleFollower}
            handleFollowing={handleFollowing}
            followersUser={followersUser}
            followingList={followingList}
          />
        )}
      </Styled.Section>

      {createNewStory && (
        <Story
          userId={userId}
          choiceStory={choiceStory}
          createNewStory={createNewStory}
          setStory={setStory}
          setNewStory={setNewStory}
          setCreateNewStory={setCreateNewStory}
          setShowStoryCircle={setShowStoryCircle}
        />
      )}

      <SeeStory
        story={story}
        userId={userId}
        choiceStory={choiceStory}
        dataUserOnly={dataUserOnly}
        lastStorySeen={lastStorySeen}
        setCreatePost={setCreatePost}
        setChoiceStory={setChoiceStory}
        setLastStorySeen={setLastStorySeen}
        setCreateNewStory={setCreateNewStory}
      />
    </>
  );
};

export default InfoProfile;
