import React, { useState, useEffect, useCallback } from 'react';
import { Grid, Typography, withStyles } from '@material-ui/core';
import * as Papa from 'papaparse';
import Products from './Products/Products';
import ProductsFilter from './ProductsFilter/ProductsFilter';

const styles = () => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
  },
  flexGrid: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  message: {
    margin: 'auto',
  },
})

/**
 * Transform data array to data object
 * where object properties come from properties array
 */
export const transformData = (properties, data = []) => {
  if (!properties || !properties.length) {
    return [];
  }
  return data
    .map(values => properties
      .reduce((object, property, propertyIndex) => {
        object[property] = values[propertyIndex];
        return object;
      }, {})
    );
}

/**
 * Filter given products with given filter options
 */
export const filterProducts = (products = [], filter) => {
  if (!filter) {
    return products;
  }
  const filteredProducts = products.filter(
    product => {
      if (
        (filter.onSale && product.sale_price >= product.price) ||
        (filter.gender && product.gender !== filter.gender) ||
        (filter.searchKey && !product.title.toUpperCase().includes(filter.searchKey.toUpperCase()))
      ) {
        return false;
      } else {
        return true;
      }
    }
  );
  return filteredProducts;
}

const App = ({ classes }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [height, setHeight] = useState(0);
  const [loading, setLoading] = useState(true);

  /**
   * In this callback we will calculate grid container's height
   * and let Products component use it in virtual-repeat
   */
  const measuredRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  /**
   * In this hook we fetch products.csv and transform into list of product objects
   * This effect will run only one time
   */
  useEffect(() => {
    Papa.parse('/products.csv', {
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = transformData(results.data[0], results.data.slice(1));
        setProducts(data);
      }
    });
  }, []);

  /**
   * In this hook if we have products in list that means we fetched and transformed all products data 
   * Now we need to apply filters on them and process over filtered products
   * by letting ProductsFilter component set filter and trigger onFilterChange handler
   */
  useEffect(() => {
    filteredProducts.length && setLoading(false);
  }, [filteredProducts]);

  return (
    <Grid className={classes.root} container alignItems="center" direction="column">
      <Grid className={classes.flexGrid} container item md={9} lg={7} wrap="nowrap">
        {
          !products.length ?

            <Typography className={classes.message} component="p" variant="h5" align="center">
              Fetching Data...
              </Typography>
            :
            <>
              <ProductsFilter onFilterChange={filter => setFilteredProducts(filterProducts(products, filter))} />
              <Typography variant="caption" align="center" gutterBottom>
                {filteredProducts.length} products are filtered out of {products.length}.
                </Typography>
              {
                filteredProducts.length && !loading ?
                  <div className={classes.flexGrid} ref={measuredRef}>
                    <Products
                      products={filteredProducts}
                      height={height}
                    />
                  </div>
                  :
                  <Typography variant="h5" align="center">
                    {loading ? 'Loading...' : 'No products found'}
                  </Typography>
              }
            </>
        }
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(App);
