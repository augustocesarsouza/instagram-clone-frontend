import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import PostCard from './PostCard';
import fetchMock from 'jest-fetch-mock';
import { enableFetchMocks } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';

enableFetchMocks();
fetchMock.enableMocks();

describe('PostCard', () => {
  const mockResponse = {
    id: 21,
    title: 'Cr7',
    url: 'http://res.cloudinary.com/dyqsqg7pk/image/upload/xgb7rf5zkwkdpwxoc7ff',
    user: {
      id: 9,
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

  fetchMock.mockResponseOnce(JSON.stringify(mockResponse));
  it('should render user image and name', async () => {
    const userId = 10;
    render(
      <MemoryRouter>
        <PostCard post={mockResponse} userId={userId} />
      </MemoryRouter>
    );
    screen.debug();

    await waitFor(() => {
      const img = screen.getByAltText(/Cr7 1/i);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockResponse.user.imagePerfil);

      const p = screen.getByText(mockResponse.user.name);
      expect(p).toBeInTheDocument();
    });
  });
});
