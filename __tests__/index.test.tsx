import {render, screen} from '@testing-library/react';
import React from 'react';
import Home from '../pages/index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    screen.debug(undefined, Infinity);
    const heading = screen.getByTestId('title');

    expect(heading).toHaveTextContent(/Oscar te Giffel/);
  });
});
