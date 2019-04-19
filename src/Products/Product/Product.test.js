import React from 'react';
import ReactDOM from 'react-dom';
import { Typography } from '@material-ui/core';
import Product, { genderContent, priceContent } from './Product';

const classes = {};
const products = [
  { gtin: '1', title: 'Test Product', gender: 'female', sale_price: 9, price: 10, image_link: 'http://example.com/test.jpg' },
  { gtin: '2', title: 'Test Product2', gender: 'male', sale_price: 10, price: 10, image_link: 'http://example.com/test.jpg' },
  { gtin: '3', title: 'Test Product3', gender: 'unisex', sale_price: 10, price: 10, image_link: 'http://example.com/test.jpg' },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Product product={products[0]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Gender Content', () => {
  it('should return different message for each gender type', () => {
    expect(genderContent('female')).toEqual(<Typography variant="overline" color="textSecondary">For Women Only</Typography>);
    expect(genderContent('male')).toEqual(<Typography variant="overline" color="textSecondary">For Men Only</Typography>);
    expect(genderContent('unisex')).toEqual(<Typography variant="overline" color="textSecondary">For Everyone</Typography>);
  });

  it('should return no message when gender is undefined or not one of the [female, male, unisex]', () => {
    expect(genderContent('')).toEqual(<Typography variant="overline" color="textSecondary"></Typography>);
    expect(genderContent()).toEqual(<Typography variant="overline" color="textSecondary"></Typography>);
  });
});

describe('Price Content', () => {
  it('should only show normal price if sale price is not smaller than normal price', () => {
    expect(priceContent(10, 10, classes)).toEqual(<Typography variant="subtitle2" color="textSecondary">{10}</Typography>);
    expect(priceContent(10, 12, classes)).toEqual(<Typography variant="subtitle2" color="textSecondary">{10}</Typography>);
  });

  it('should show both price when sale price is lover than normal price', () => {
    expect(priceContent(10, 9, classes)).toEqual(
      <>
        <Typography className={classes.discount} variant="subtitle2" color="textSecondary" inline>{10}</Typography>
        <Typography variant="subtitle2" inline>{9}</Typography>
      </>
    );
  });
});