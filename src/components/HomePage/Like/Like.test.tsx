import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import Like from './Like';

enableFetchMocks();

const server = setupServer(
  rest.post('https://localhost:7266/v1/postLike', (req, res, ctx) => {
    const likePost = {
      PostId: 21,
      AuthorId: 10,
    };

    return res(ctx.status(200), ctx.json({ data: likePost }));
  }),
  rest.delete('https://localhost:7266/v1/postLike/:userId/:postId', (req, res, ctx) => {
    return res(ctx.status(200));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Like', () => {
  const mockResponseLike = {
    id: 21,
    title: 'Cr7',
    url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/xgb7rf5zkwkdpwxoc7ff',
    user: {
      id: 8,
      name: 'cristiano',
      imagePerfil: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/ljylw7qqgl3iyll5yxay',
    },
    postLikes: [
      {
        id: 191,
        postId: 21,
        authorId: 9,
      },
    ],
    postLikesCounts: 1,
    commentsLikes: 3,
  };
  it('should call handleLike when clicking Like button', async () => {
    const userId = 10;
    const setAllPostMock = jest.fn();

    render(
      <MemoryRouter>
        <Like post={mockResponseLike} userId={userId} setAllPost={setAllPostMock} />
      </MemoryRouter>
    );

    const buttonLike = screen.getByTestId('button-like');

    fireEvent.click(buttonLike);

    await waitFor(() => {
      screen.debug();
      expect(setAllPostMock).toHaveBeenCalledTimes(2);
      expect(setAllPostMock).toHaveBeenCalledWith(expect.any(Function));
      expect(setAllPostMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  it('should call handleDislike when clicking Like button', async () => {
    const userId = 9;
    const setAllPostMock = jest.fn();

    render(
      <MemoryRouter>
        <Like post={mockResponseLike} userId={userId} setAllPost={setAllPostMock} />
      </MemoryRouter>
    );

    const buttonLike = screen.getByTestId('button-dislike');

    fireEvent.click(buttonLike);

    await waitFor(() => {
      screen.debug();
      expect(buttonLike).toBeInTheDocument();
      expect(setAllPostMock).toHaveBeenCalledTimes(2);
      expect(setAllPostMock).toHaveBeenCalledWith(expect.any(Function));
      expect(setAllPostMock).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
