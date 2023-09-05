import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Comment from './Comment';

enableFetchMocks();

describe('Comment', () => {
  const post = {
    id: 19,
    title: 'Mais uma',
    url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/lx1p8wgwmebeijhxlpzf',
    user: {
      id: 10,
      name: 'messi',
      imagePerfil: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/kesp7gjo1klxbhd6vbwi',
    },
    postLikes: [
      {
        id: 1350,
        postId: 19,
        authorId: 10,
      },
    ],
    postLikesCounts: 1,
    commentsLikes: 39,
  };

  it('should load comment', () => {
    const userId = 8;
    const setPostCommentsMock = jest.fn();
    const setAllPostMock = jest.fn();

    <MemoryRouter>
      <Comment
        postComments={post}
        userId={userId}
        setPostComments={setPostCommentsMock}
        connection={null}
        setAllPost={setAllPostMock}
      />
    </MemoryRouter>;
  });
});
