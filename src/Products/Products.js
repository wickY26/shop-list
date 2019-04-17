import React from 'react';
import { withStyles } from '@material-ui/core';
import Product from './Product/Product';

const styles = {

};

const Products = ({ classes, products }) => {
  return (
    products.map(product => (
      <Product product={product} />
    ))
  )
}

export default withStyles(styles, { withTheme: true })(Products);
