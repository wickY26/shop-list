import React from 'react';
import ReactDOM from 'react-dom';
import ProductsFilter from './ProductsFilter';

const classes = {};
const onFilterChange = jest.fn();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ProductsFilter onFilterChange={onFilterChange} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
