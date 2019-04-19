import React from 'react';
import ReactDOM from 'react-dom';
import App, { filterProducts, transformData } from './App';

const products = [
  {gtin: '1', title: 'Test Product', gender: 'female', sale_price: 9, price: 10},
  {gtin: '2', title: 'Test Product2', gender: 'male', sale_price: 10, price: 10},
  {gtin: '3', title: 'Test Product3', gender: 'unisex', sale_price: 10, price: 10},
];
const data = [
  ['1', 'Test Product', 'female', 9, 10],
  ['2', 'Test Product2', 'male', 10, 10],
  ['3', 'Test Product3', 'unisex', 10, 10],
];
const properties = ['gtin', 'title', 'gender', 'sale_price', 'price'];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('filtering products', () => {
  it('should return all products when no filter is provided', () => {
    expect(filterProducts(products, null)).toEqual(products);
    expect(filterProducts(products, undefined)).toEqual(products);
    expect(filterProducts(products, {})).toEqual(products);
  });

  it('should return gender specific products when filter is provided with gender data', () => {
    expect(filterProducts(products, {gender: 'female'})).toEqual([products[0]]);
    expect(filterProducts(products, {gender: 'male'})).toEqual([products[1]]);
    expect(filterProducts(products, {gender: 'unisex'})).toEqual([products[2]]);
  });

  it('should return discounted products when filter is provided with onSale true', () => {
    expect(filterProducts(products, {onSale: true})).toEqual([products[0]]);
  });

  it('should return products which their title includes provided searchKey', () => {
    expect(filterProducts(products, {searchKey: 'Test Product'})).toEqual(products);
    expect(filterProducts(products, {searchKey: 'TEST'})).toEqual(products);
    expect(filterProducts(products, {searchKey: 'test'})).toEqual(products);
    expect(filterProducts(products, {searchKey: '2'})).toEqual([products[1]]);
    expect(filterProducts(products, {searchKey: '3'})).toEqual([products[2]]);
    expect(filterProducts(products, {searchKey: 'Invalid Term'})).toEqual([]);
  });

  it('should combine any of the filter properties and return products which passed all conditions', () => {
    expect(filterProducts(products, {searchKey: 'Test Product', gender: 'female'})).toEqual([products[0]]);
    expect(filterProducts(products, {searchKey: 'Test Product', gender: 'male'})).toEqual([products[1]]);
    expect(filterProducts(products, {searchKey: 'Test Product', gender: 'male', onSale: true})).toEqual([]);
    expect(filterProducts(products, {searchKey: '*_123', onSale: true})).toEqual([]);
  });
});

describe('transforming data', () => {
  it('should transform given data into object array where object properties are given parameter', () => {
    expect(transformData(properties, data)).toEqual(products);
    expect(transformData(properties, [data[0]])).toEqual([products[0]]);
  });

  it('should return empty array when data param is empty array or undefined', () => {
    expect(transformData(properties)).toEqual([]);
    expect(transformData(properties, [])).toEqual([]);
  });

  it('should return empty array when properties param is empty array or undefined', () => {
    expect(transformData(undefined, data)).toEqual([]);
    expect(transformData(null, data)).toEqual([]);
    expect(transformData([], data)).toEqual([]);
  });

  it('should ignore extra data if size of individual row is more than properties array', () => {
    const transformedData = transformData(['gtin'], data);
    expect(transformedData.length).toEqual(data.length);
    expect(Object.keys(transformedData[0])).toEqual(['gtin']);
  });
});
