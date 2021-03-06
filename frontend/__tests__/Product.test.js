import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import Product from '../components/Product';
import { fakeItem } from '../lib/testUtils';

const product = fakeItem();

describe('<Product />', () => {
  it('renders out the price tag in title', () => {
    const { container, debug } = render(
      // wrapping in the MockedProvider bc the components it wrapper in the ApolloProvider at the app level
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    const priceTag = screen.getByText('$50');
    // debug(priceTag);
    expect(priceTag).toBeInTheDocument();
    const link = container.querySelector('a');
    // debug(link);
    expect(link).toHaveAttribute('href', '/product/abc123');
    expect(link).toHaveTextContent(product.name);
  });
  it('Renders and matches the snapshot', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    expect(container).toMatchSnapshot();
  });
  it('renders out the image properly', () => {
    const { container, debug } = render(
      <MockedProvider>
        <Product product={product} />
      </MockedProvider>
    );
    // grad the image
    const img = screen.getByAltText(product.name);
    expect(img).toBeInTheDocument();
  });
});
