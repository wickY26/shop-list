import React from 'react';
import ReactDOM from 'react-dom';
import { Typography } from '@material-ui/core';
import Product from './Product/Product';
import Products, { generateContent } from './Products';

const style = {};
const products = [
  { gtin: '1', title: 'Test Product', gender: 'female', sale_price: 9, price: 10, image_link: 'http://example.com/test.jpg' },
  { gtin: '2', title: 'Test Product2', gender: 'male', sale_price: 10, price: 10, image_link: 'http://example.com/test.jpg' },
  { gtin: '3', title: 'Test Product3', gender: 'unisex', sale_price: 10, price: 10, image_link: 'http://example.com/test.jpg' },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Products products={products} height={600} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Products Content', () => {
  it('should return loading message if products list length is smaller than productIndex', () => {
    const content = generateContent(products, 4, style);
    expect(content).toEqual(
      <div style={style}>
        <Typography variant="h4" align="center">Loading...</Typography>
      </div>
    );
  });

  it('should return product card if productIndex is smaller than products list length', () => {
    const content = generateContent(products, 2, style);
    expect(content).toEqual(
      <div style={style}>
        <Product product={products[2]} />
      </div>
    );
  });

  it('should return product card for product with given index', () => {
    const content = generateContent(products, 2, style);
    expect(content).toEqual(
      <div style={style}>
        <Product product={products[2]} />
      </div>
    );
    expect(content).not.toEqual(
      <div style={style}>
        <Product product={products[1]} />
      </div>
    );
  });
});