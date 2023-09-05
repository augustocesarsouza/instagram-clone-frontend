import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import fetchMock, { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import SmallModalPerfil from './SmallModalPerfil';
import Url from '../../../Utils/Url';

enableFetchMocks();

const worker = setupServer(
  rest.get('https://localhost:7266/v1/followallfollowersfromuser/:id', async (req, res, ctx) => {
    const id = req.params.id; // Capturar o parâmetro :id da URL
    return res(
      ctx.json({
        data: [
          {
            id: 10,
            followerId: 12,
            followingId: id,
          },
          {
            id: 69,
            followerId: 8,
            followingId: id,
          },
        ],
        isSucess: true,
      })
    );
  }),
  rest.get('https://localhost:7266/v1/followallfollowingfromuser/:id', async (req, res, ctx) => {
    const id = req.params.id;
    return res(
      ctx.json({
        data: [
          {
            id: 62,
            followerId: id,
            followingId: 9,
          },
          {
            id: 72,
            followerId: id,
            followingId: 8,
          },
        ],
        isSucess: true,
      })
    );
  }),
  rest.get('https://localhost:7266/v1/threePosts/:id', async (req, res, ctx) => {
    const id = req.params.id;
    return res(
      ctx.json({
        data: [
          {
            id: 62,
            title: 'scasc',
            url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/hxggnb4pkexqmdflnajg',
          },
          {
            id: 40,
            title: 'sacascsa',
            url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/zgjjchnurjkwyg2m6sl8',
          },
          {
            id: 25,
            title: 'test',
            url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/odpeuyzjh8e46z4slszu',
          },
        ],
        isSucess: true,
      })
    );
  })
);

beforeAll(() => {
  worker.listen();
});
afterEach(() => worker.resetHandlers());
afterAll(() => worker.close());

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('SmallModalPerfil', () => {
  const mockResponse = {
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

  it('must upload number of followers', async () => {
    const idUserPerfil = 8;
    const userId = 10;
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
      <MemoryRouter>
        <SmallModalPerfil
          idUserPerfil={idUserPerfil}
          userId={userId}
          post={mockResponse}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      screen.debug();
      const followersCount = screen.getByTestId('followers-count');
      expect(followersCount.textContent).toBe('2');
    });
  });

  it('must upload number of following', async () => {
    const idUserPerfil = 8;
    const userId = 10;
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
      <MemoryRouter>
        <SmallModalPerfil
          idUserPerfil={idUserPerfil}
          userId={userId}
          post={mockResponse}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      screen.debug();
      const followersCount = screen.getByTestId('following-count');
      expect(followersCount.textContent).toBe('2');
    });
  });

  it('must upload 3 user photos', async () => {
    const idUserPerfil = 8;
    const userId = 10;
    const handleMouseEnter = jest.fn();
    const handleMouseLeave = jest.fn();

    render(
      <MemoryRouter>
        <SmallModalPerfil
          idUserPerfil={idUserPerfil}
          userId={userId}
          post={mockResponse}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
        />
      </MemoryRouter>
    );

    await waitFor(() => {
      screen.debug();
      const wrapperMainThreeImg = screen.getByTestId('threeimg');
      const imagens = wrapperMainThreeImg.querySelectorAll('img');
      expect(imagens.length).toBe(3);
    });
  });
});
