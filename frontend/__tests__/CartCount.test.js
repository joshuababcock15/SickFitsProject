import { render, screen } from '@testing-library/react';
import wait from 'waait';
import CartCount from '../components/CartCount';

describe('<CartCount />', () => {
  it('Renders', () => {
    render(<CartCount count={10} />);
  });
  it('Matches Snapshot', () => {
    const { container } = render(<CartCount count={11} />);
    expect(container).toMatchSnapshot();
  });
  it('updates via props', async () => {
    const { container, rerender } = render(<CartCount count={11} />);
    expect(container.textContent).toBe('11');
    // same as
    // expect(container).toHaveTextContent('11');
    rerender(<CartCount count="12" />);
    // can just use toHaveTextContent which is the react way
    // expect(container).toHaveTextContent('12');

    // using js to update the props
    expect(container.textContent).toBe('1211');
    // wait for 4 ms
    await wait(400);
    // another option below
    // await screen.findByText('12');
    expect(container.textContent).toBe('12');
    expect(container).toMatchSnapshot();
  });
});
