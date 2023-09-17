import * as Styled from './styled';
import { useEffect, useLayoutEffect, useState, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Url from '../../../Utils/Url';
import { ListReels, ReelsContext, ReelsContextProps } from '../../../templates/Reels/Reels';

interface ShareReelsProps {
  userId: number | null;
  reels: ListReels;
  setShowShareReels: React.Dispatch<React.SetStateAction<boolean>>;
  showShareReels: boolean;
  videoRef: HTMLVideoElement | null;
}

interface UsersSuggestion {
  id: number;
  name: string;
  email: string;
  imagePerfil: string;
}

interface ObjImg {
  url: string;
  publicId: string;
  isStory: boolean;
}

interface Message {
  id: number;
  reelId: number;
  content: string;
  senderId: number;
  recipientId: number;
  timestamp: string;
  urlFrameReel: string;
  publicIdFrameReel: string;
}

const ShareReels = ({
  userId,
  reels,
  setShowShareReels,
  showShareReels,
  videoRef,
}: ShareReelsProps) => {
  // const [showShareReels, setShowShareReels] = useState(false);
  const [usersSuggestion, setUsersSuggestion] = useState<UsersSuggestion[] | null>(null);
  const userContextReels = useContext<ReelsContextProps | null>(ReelsContext);

  useEffect(() => {
    const fetchSuggestionUsers = async () => {
      if (userId === null) return;
      const res = await fetch(`${Url}/user/following-followers/suggestion/story/${userId}`);
      if (res.status === 200) {
        const json = await res.json();
        // setUsersSuggestion(json.data);
        const data: UsersSuggestion[] = json.data;
        setUsersSuggestion(data);
      }
    };
    fetchSuggestionUsers();
  }, []);

  const [videoReels, setVideoReels] = useState<ListReels | null>(null);

  // const handleOpenShare = () => {
  //   setVideoReels(reels);
  //   setShowShareReels((prev) => !prev);
  // };

  const closeModal = () => {
    setShowShareReels(false);
  };

  const [amountOfchecked, setAmountOfchecked] = useState(0);

  const [idClicked, setIdClicked] = useState(0);
  const [listOfUserMarked, setListOfUserMarked] = useState<{ [key: string]: boolean }>({});
  const [listNameUserChecked, setListNameUserChecked] = useState<UsersSuggestion[] | []>([]);
  const [userMarkedDelete, setUserMarkedDelete] = useState('');
  const inputWriteMessageRef = useRef<HTMLInputElement | null>(null);

  const handleClickLabel = (value: UsersSuggestion) => {
    if (listOfUserMarked[value.name]) {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: false,
      }));
      setListNameUserChecked((prev) => prev.filter((u) => u.name !== value.name));
      setAmountOfchecked((prev) => (prev == 0 ? prev : prev - 1));
    } else {
      setListOfUserMarked((prev) => ({
        ...prev,
        [value.name]: true,
      }));
      setListNameUserChecked((prev) => [...prev, value]);
      setAmountOfchecked((prev) => prev + 1);
    }

    setIdClicked(value.id);
  };

  useLayoutEffect(() => {
    if (usersSuggestion === null) return;
    setAmountOfchecked(0);
    setListNameUserChecked([]);
    setUserMarkedDelete('');
    usersSuggestion.forEach((user) => {
      setListOfUserMarked((prev) => ({
        ...prev,
        [user.name]: false,
      }));
    });
  }, [usersSuggestion]);

  const handleClickNameSuggestion = (name: string) => {
    if (userMarkedDelete == name) {
      setListOfUserMarked((prev) => ({
        ...prev,
        [name]: false,
      }));

      setListNameUserChecked((prev) => prev.filter((nameuser) => nameuser.name !== name));
      setUserMarkedDelete('');
    } else {
      setUserMarkedDelete(name);
    }
  };

  const handleClickDeleteUserSendReels = (name: string) => {
    setListOfUserMarked((prev) => ({
      ...prev,
      [name]: false,
    }));

    setListNameUserChecked((prev) => prev.filter((nameuser) => nameuser.name !== name));
  };

  const imgBase64VideoFrameRef = useRef<string | null>(null);

  const handleSendReelsForFriends = async () => {
    const imgBase64 = imgBase64VideoFrameRef.current;
    if (imgBase64 === null) return;

    const objImg = {
      Url: imgBase64,
    };

    const res = await fetch(`${Url}/process/img/framevideo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(objImg),
    });

    if (res.status === 200) {
      const json = await res.json();
      const objImg: ObjImg = json.data;

      const imgBase64 = imgBase64VideoFrameRef.current;
      if (
        userContextReels === null ||
        userContextReels.connection === null ||
        userContextReels.myEmail === null ||
        inputWriteMessageRef.current === null ||
        userId === null ||
        imgBase64 === null
      )
        return;

      const reelsId = reels.id;
      const senderEmail = userContextReels.myEmail;
      const valueContext = inputWriteMessageRef.current.value;
      const nameUserRecipient = listNameUserChecked[0];

      const objShareReels = {
        senderId: userId,
        recipientId: nameUserRecipient.id,
        senderEmail: senderEmail,
        recipientEmail: nameUserRecipient.email,
        reelId: reelsId,
        content: valueContext,
        UrlFrameReel: objImg.url,
        PublicIdFrameReel: objImg.publicId,
      };

      const createMessageRef = await fetch(`${Url}/message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objShareReels),
      });

      if (createMessageRef.status === 200) {
        const json = await createMessageRef.json();
        const message: Message = json.data;

        const senObj = {
          SenderId: userId,
          RecipientId: nameUserRecipient.id,
          SenderEmail: senderEmail,
          RecipientEmail: nameUserRecipient.email,
          ReelId: reelsId,
          UrlFrameReel: objImg.url,
          PublicIdFrameReel: objImg.publicId,
          Content: valueContext,
          Timestamp: message.timestamp,
        };

        userContextReels.connection.invoke('SendMessageReels', senObj);
      }
    }
  };

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const context = canvas.getContext('2d');

    if (showShareReels) {
      setTimeout(() => {
        if (context === null || videoRef === null) return;
        context.drawImage(videoRef, 0, 0, 1080, 1080);

        const data = canvas.toDataURL('image/jpeg', 1);
        imgBase64VideoFrameRef.current = data;
      }, 100);
    }
  }, [showShareReels, videoRef]);

  return (
    <>
      {showShareReels && (
        <Styled.ContainerShareReels>
          <Styled.ContainerMainShareAndSearch>
            <Styled.ContainerTop>
              <Styled.ContainerX>
                <FontAwesomeIcon icon={faXmark} onClick={closeModal} />
              </Styled.ContainerX>
              <Styled.ContainerP>
                <Styled.P $paragraph="upside">Compartilhamento</Styled.P>
              </Styled.ContainerP>
            </Styled.ContainerTop>
            <Styled.ContainerFilter $amountofchecked={amountOfchecked}>
              <Styled.P $paragraph="upside">Para: </Styled.P>
              <Styled.ContainerSearch $amountofchecked={amountOfchecked}>
                {amountOfchecked > 0 && (
                  <>
                    {listNameUserChecked.map((user, index) => (
                      <Styled.ContainerUserMarked
                        key={index}
                        $name={user.name}
                        $usermarkeddelete={userMarkedDelete}
                      >
                        <Styled.ParagraphUserMarked
                          onClick={() => handleClickNameSuggestion(user.name)}
                          $name={user.name}
                          $usermarkeddelete={userMarkedDelete}
                        >
                          {user.name}
                        </Styled.ParagraphUserMarked>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => handleClickDeleteUserSendReels(user.name)}
                        />
                      </Styled.ContainerUserMarked>
                    ))}
                  </>
                )}

                <Styled.Input placeholder="Pesquisar..."></Styled.Input>
              </Styled.ContainerSearch>
            </Styled.ContainerFilter>
          </Styled.ContainerMainShareAndSearch>
          <Styled.Article>
            <Styled.ContainerSuggestion>
              <Styled.P $paragraph="upside">Sugestões</Styled.P>
            </Styled.ContainerSuggestion>
            <Styled.ContainerMainAllUsersSuggestion>
              {usersSuggestion &&
                usersSuggestion.map((us) => (
                  <Styled.ContainerUserSuggestion key={us.id} onClick={() => handleClickLabel(us)}>
                    <Styled.ContainerMainInfoUser>
                      <Styled.WrapperImg $wrapper="suggestion">
                        <Styled.Img
                          $img="suggestion"
                          src={us.imagePerfil}
                          alt="img-user-suggestion"
                        />
                      </Styled.WrapperImg>
                      <Styled.ContainerInfoUserSuggestion>
                        <Styled.P $paragraph="suggestion">{us.name}</Styled.P>
                      </Styled.ContainerInfoUserSuggestion>
                    </Styled.ContainerMainInfoUser>
                    <Styled.ContainerMainLabel>
                      <Styled.WrapperInputCheckbox>
                        <Styled.Label
                          $listofusermarked={listOfUserMarked}
                          $nameuserlabel={us.name}
                          $idclicked={idClicked}
                        ></Styled.Label>
                      </Styled.WrapperInputCheckbox>
                    </Styled.ContainerMainLabel>
                  </Styled.ContainerUserSuggestion>
                ))}
            </Styled.ContainerMainAllUsersSuggestion>
          </Styled.Article>
          <Styled.ContainerMainSend
            $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
          >
            {amountOfchecked >= 1 && (
              <Styled.ContainerSendMessage>
                <Styled.Input
                  placeholder="Escreva uma mensagem..."
                  ref={inputWriteMessageRef}
                ></Styled.Input>
              </Styled.ContainerSendMessage>
            )}

            {amountOfchecked == 0 && (
              <Styled.WrapperButton>
                <Styled.Button $amountofchecked={String(amountOfchecked)}>Enviar</Styled.Button>
              </Styled.WrapperButton>
            )}

            {amountOfchecked == 1 && (
              <Styled.WrapperButton onClick={handleSendReelsForFriends}>
                <Styled.Button
                  $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
                >
                  Enviar
                </Styled.Button>
              </Styled.WrapperButton>
            )}

            {amountOfchecked > 1 && (
              <Styled.WrapperButton>
                <Styled.Button
                  $amountofchecked={amountOfchecked >= 1 ? String(true) : String(false)}
                >
                  Enviar separadamente
                </Styled.Button>
              </Styled.WrapperButton>
            )}
          </Styled.ContainerMainSend>
        </Styled.ContainerShareReels>
      )}
    </>
  );
};

export default ShareReels;
