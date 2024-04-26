import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import * as effector from 'effector-react';

import Header from '..';

const mockCategories = ["Groceries", "Smartphones"];

const renderComponent = () => render(<Header />);

describe('Header', () => {
  const useUnitMock: jest.SpyInstance = jest.spyOn(effector, 'useUnit');

  afterEach(() => {
    jest.restoreAllMocks();
  });
  
  it('should render logo and categories', () => {
    useUnitMock.mockReturnValue(mockCategories);

    const { queryByText, queryByTestId } = renderComponent();

    mockCategories.forEach(category => 
      expect(queryByText(category)).toBeVisible()
    );
    expect(queryByTestId("FNSlogo")).toBeVisible();
  });
});