import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import Nav from '../components/Nav';
import { CURRENT_USER_QUERY } from '../components/User';
import { fakeUser, fakeCartItem } from '../lib/testUtils';
import { CartStateProvider } from '../lib/cartState';

// Make some mocks for logged out, logged in, and loggedin with cart items
const notSignedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: { data: { authenticatedItem: null } },
  },
];

const SignedInMocks = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: { data: { authenticatedItem: fakeUser() } },
  },
];

const signedInMocksWithCartItems = [
  {
    request: {
      query: CURRENT_USER_QUERY,
    },
    result: {
      data: {
        authenticatedItem: fakeUser({
          cart: [fakeCartItem()],
        }),
      },
    },
  },
];

describe('<Nav />', () => {
  it('Renders a minimal nav when signed out', () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={notSignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    expect(container).toHaveTextContent('Sign In');
    expect(container).toMatchSnapshot();
    const link = screen.getByText('Sign In');
    expect(link).toHaveAttribute('href', '/signin');
    const productsLink = screen.getByText('Products');
    expect(productsLink).toHaveAttribute('href', '/products');
  });
  // signed in  state
  // xit means skip the test
  xit('renders a full Nav when signed in', async () => {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={SignedInMocks}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    expect(container).toMatchSnapshot();
    expect(container).toHaveTextContent('Sign Out');
    expect(container).toHaveTextContent('My Cart');
  });
  xit('renders the amount of items in the cart', async function () {
    const { container, debug } = render(
      <CartStateProvider>
        <MockedProvider mocks={signedInMocksWithCartItems}>
          <Nav />
        </MockedProvider>
      </CartStateProvider>
    );
    await screen.findByText('Account');
    debug();
    expect(screen.getByText('3').toBeInTheDocument());
  });
});
