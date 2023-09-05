import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateAccount from './CreateAccount';

describe('CreateAccount', () => {
  test('should render CreateAccount', () => {
    const { getAllByTestId } = render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );
    const img = screen.getByAltText('img-instagram');
    const p = screen.getByText('Cadastre-se para ver fotos e vídeos dos seus amigos.');
    const pLogin = screen.getByText('Tem uma conta?');
    const spans = getAllByTestId('meu-span');
    const spanConnect = screen.getByTestId('connect');

    expect(img).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/1280px-Instagram_logo.svg.png'
    );
    expect(p).toBeInTheDocument();
    expect(pLogin).toBeInTheDocument();
    expect(spans.length).toBe(2);
    expect(spanConnect).toBeInTheDocument();
  });

  test('should render inputs CreateAccount', () => {
    render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    const inputName = screen.getByPlaceholderText('Nome');
    const inputEmail = screen.getByPlaceholderText('Email: @gmail.com');
    const inputImgPerfil = screen.getByPlaceholderText('Imagem Perfil');
    const inputBirthDate = screen.getByPlaceholderText('Birth Date dd/MM/yyyy');

    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputImgPerfil).toBeInTheDocument();
    expect(inputBirthDate).toBeInTheDocument();
  });

  test('should render button and active function', () => {
    render(
      <MemoryRouter>
        <CreateAccount />
      </MemoryRouter>
    );

    const button = screen.getByRole('button', { name: 'Cadastre-se' });
    fireEvent.click(button);

    expect(button).toBeInTheDocument();
  });
});
