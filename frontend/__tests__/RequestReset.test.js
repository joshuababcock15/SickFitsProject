import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import wait from 'waait';
import { MockedProvider } from '@apollo/react-testing';
import RequestReset, {
  REQUEST_RESET_MUTATION,
} from '../components/RequestReset';

const email = 'joshbabs@gmail.com';

const mocks = [
  {
    request: {
      query: REQUEST_RESET_MUTATION,
      variables: { email },
    },
    result: {
      data: { sendUserPasswordResetLink: null },
    },
  },
];

describe('<RequestReset/>', () => {
  it('renders and matches snapshot', () => {
    const { container } = render(
      <MockedProvider>
        <RequestReset />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('calls the mutation when submitted', async () => {
    const { container, debug } = render(
      <MockedProvider mocks={mocks}>
        <RequestReset />
      </MockedProvider>
    );
    // type in the the email box
    userEvent.type(screen.getByPlaceholderText(/email/i), email);
    // click submit
    userEvent.click(screen.getByText(/Request Reset/));
    const success = await screen.findByText(/Success/i);
    expect(success).toBeInTheDocument();
  });
});
