import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';4
import * as effector from 'effector-react';

import Filter from '..';
import { searchProducts } from '../../../model/Products';

jest.mock('../../../model/Products', () => {
  const original = jest.requireActual("../../../model/Products");
  return {
    ...original,
    searchProducts: jest.fn()
  };
});

const renderComponent = () => render(<Filter />);

describe('Filter', () => {
  const useUnitMock: jest.SpyInstance = jest.spyOn(effector, 'useUnit');

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render search bar, search button, and checkboxes', () => {
    useUnitMock
      .mockReturnValue('')
      .mockReturnValueOnce(["Apple", "Microsoft"])
      .mockReturnValueOnce(["Apple", "Microsoft"]);

    const { queryByText, queryByTestId } = renderComponent();

    expect(queryByTestId("searchbar")).toBeVisible();
    expect(queryByText("Search")).toBeVisible();
    expect(queryByTestId("checkbox-Apple")).toBeVisible();
    expect(queryByTestId("checkbox-Microsoft")).toBeVisible();
  });

  it('should call searchProducts when "Search" button is clicked', () => {
    useUnitMock
      .mockReturnValue('')
      .mockReturnValueOnce(["Apple", "Microsoft"])
      .mockReturnValueOnce(["Apple", "Microsoft"]);

    const { getByText } = renderComponent();

    const searchButton = getByText("Search");
    fireEvent.click(searchButton);
    expect(searchProducts).toHaveBeenCalled();
  });
});