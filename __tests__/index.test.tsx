import {render, screen} from '@testing-library/react';
import React from 'react';
import Home from '../index';

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /Hey, I’m Oscar te Giffel\.js!/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
