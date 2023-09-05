import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Url from '../../../Utils/Url';
import * as Styled from './styled';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { AllPost, User } from '../CardPost/CardPost';

interface SmallModalPerfilProps {
  idUserPerfil: Number | undefined;
  userId: number;
  post: AllPost;
  handleMouseEnter: (value: User) => void;
  handleMouseLeave: () => void;
}

export interface FollowingListsProps {
  id: number;
  followerId: number;
  followingId: number;
}

export interface FollowersListsProps {
  id: number;
  followerId: number;
  followingId: number;
}

interface ThreePostProps {
  id: number;
  title: string;
  url: string;
}

const SmallModalPerfil = ({
  idUserPerfil,
  userId,
  post,
  handleMouseEnter,
  handleMouseLeave,
}: SmallModalPerfilProps) => {
  const [followingList, setFollowingList] = useState<FollowingListsProps[] | null>(null);
  const [threePost, setThreePost] = useState<ThreePostProps[] | null>(null);
  const [alreadyFollowUser, setAlreadyFollowUser] = useState(false);

  const [FollowersList, setFollowersList] = useState<FollowersListsProps[] | null>(null);
  useLayoutEffect(() => {
    const fetchFollowersUser = async () => {
      const res = await fetch(`${Url}/followallfollowersfromuser/${idUserPerfil}`);
      if (res.status === 200) {
        const json = await res.json();
        setFollowersList(json.data);
      }
    };
    fetchFollowersUser();
  }, [idUserPerfil]);

  useLayoutEffect(() => {
    const fetchFollowersUser = async () => {
      const res = await fetch(`${Url}/followallfollowingfromuser/${idUserPerfil}`);
      if (res.status === 200) {
        const json = await res.json();
        setFollowingList(json.data as FollowingListsProps[]);
      }
    };
    fetchFollowersUser();
  }, [idUserPerfil]);

  useLayoutEffect(() => {
    const fetchThreePost = async () => {
      const res = await fetch(`${Url}/threePosts/${idUserPerfil}`);
      if (res.status === 200) {
        const json = await res.json();
        setThreePost(json.data);
      }
    };
    fetchThreePost();
  }, [idUserPerfil]);

  const handleFollow = async () => {
    if (post) {
      const followCreate = {
        FollowerId: userId,
        FollowingId: post.user.id,
      };
      const res = await fetch(`${Url}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followCreate),
      });
      if (res.status === 200) {
        const json = await res.json();
        const follow = json.data;

        setFollowersList((prev) => (prev !== null ? [...prev, follow] : prev));
      }
    }
  };

  const handleUnFollow = async () => {
    if (post) {
      const followDelete = {
        FollowerId: userId,
        FollowingId: post.user.id,
      };
      const res = await fetch(`${Url}/follow`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(followDelete),
      });
      if (res.status === 200) {
        const json = await res.json();
        setFollowersList((prev) =>
          prev !== null ? prev.filter((follow) => follow.followerId !== userId) : prev
        );
      }
    }
  };

  useLayoutEffect(() => {
    if (FollowersList) {
      const alreadyFollow = FollowersList.some((el) => el.followerId == userId);
      setAlreadyFollowUser(alreadyFollow);
    }
  }, [FollowersList]);

  return (
    <Styled.ContainerPerfilUser
      onMouseEnter={() => handleMouseEnter(post.user)}
      onMouseLeave={handleMouseLeave}
    >
      <Styled.ContainerInfoPerfilUser>
        <Styled.ContainerImg>
          <Styled.Img src={post.user.imagePerfil} alt={post.user.name} />
        </Styled.ContainerImg>
        <Styled.ContainerName>
          <Styled.Paragraph>{post.user.name}</Styled.Paragraph>
        </Styled.ContainerName>
      </Styled.ContainerInfoPerfilUser>
      <Styled.ContainerCount>
        <Styled.ContainerAll container="public">
          <Styled.ParagraphCount paragraph="number">1</Styled.ParagraphCount>
          <Styled.ParagraphCount paragraph="string">publicação</Styled.ParagraphCount>
        </Styled.ContainerAll>
        <Styled.ContainerAll container="followers">
          <Styled.ParagraphCount paragraph="number" data-testid="followers-count">
            {FollowersList?.length}
          </Styled.ParagraphCount>
          <Styled.ParagraphCount paragraph="string">seguidores</Styled.ParagraphCount>
        </Styled.ContainerAll>
        <Styled.ContainerAll container="following">
          <Styled.ParagraphCount paragraph="number" data-testid="following-count">
            {followingList?.length}
          </Styled.ParagraphCount>
          <Styled.ParagraphCount paragraph="string">seguindo</Styled.ParagraphCount>
        </Styled.ContainerAll>
      </Styled.ContainerCount>
      <Styled.WrapperMainThreeImg data-testid="threeimg">
        {threePost &&
          threePost.map((img) => (
            <Styled.WrapperImgThree key={img.id}>
              {img.url.includes('image') && <Styled.ImgThree src={img.url} alt={img.title} />}
              {img.url.includes('video') && (
                <video>
                  <source src={img.url} />
                </video>
              )}
            </Styled.WrapperImgThree>
          ))}
      </Styled.WrapperMainThreeImg>
      {alreadyFollowUser ? (
        <Styled.WrapperButtonFollow button="unfollow">
          <Styled.ButtonFollow button="unfollow" onClick={handleUnFollow}>
            Seguindo
          </Styled.ButtonFollow>
        </Styled.WrapperButtonFollow>
      ) : (
        <Styled.WrapperButtonFollow button="follow">
          <FontAwesomeIcon icon={faUserPlus} flip="horizontal" />
          <Styled.ButtonFollow button="follow" onClick={handleFollow}>
            Seguir
          </Styled.ButtonFollow>
        </Styled.WrapperButtonFollow>
      )}
    </Styled.ContainerPerfilUser>
  );
};

export default SmallModalPerfil;
