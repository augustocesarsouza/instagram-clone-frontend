import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import CardPost from './CardPost';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';
import { enableFetchMocks } from 'jest-fetch-mock';
import Url from '../../../Utils/Url';

enableFetchMocks();
fetchMock.enableMocks();

describe('CardPost Component', () => {
  it('renders posts correctly', async () => {
    const fetchAllImg = null;
    const connection = null;
    render(
      <MemoryRouter>
        <CardPost fetchAllImg={fetchAllImg} connection={connection} />
      </MemoryRouter>
    );

    screen.findByText('Cr7');
  });
});
