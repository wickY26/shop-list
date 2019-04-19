import React from 'react';
import { Typography } from '@material-ui/core';
import { FixedSizeList } from 'react-window';
import Product from './Product/Product';

export const generateContent = (products = [], productIndex, style) => {
  let content;
  if (productIndex < products.length) {
    content = <Product product={products[productIndex]} />;
  } else {
    content = <Typography variant="h4" align="center">Loading...</Typography>;
  }
  return (
    <div style={style}>
      {content}
    </div>
  )
}

const Products = ({ products, height }) => {
  return (
    <FixedSizeList
      itemCount={products.length || 1}
      height={height}
      itemSize={216}
    >
      {({ index, style }) => generateContent(products, index, style)}
    </FixedSizeList>
  )
}

export default Products;
