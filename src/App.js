import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import * as Papa from 'papaparse';
import Products from './Products/Products';
import ProductsFilter from './ProductsFilter/ProductsFilter';

/**
 * Transform data array to data object
 * where object properties come from properties array
 */
const transformData = (properties, data) => (
  data
    .map(values => properties
      .reduce((object, property, propertyIndex) => {
        object[property] = values[propertyIndex];
        return object;
      }, {})
    )
)

/**
 * Filter given products with given filter options
 */
const filterProducts = (products = [], filter = {}) => {
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

const App = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    products.length && setLoading(false);
  }, [products]);

  return (
    <Grid container justify="center" alignItems="center">
      <Grid item md={9} lg={7}>
        {
          loading ?
            (
              <Typography component="p" variant="h5" align="center">
                Fetching Data
              </Typography>
            ) :
            (
              <>
                <ProductsFilter onFilterChange={filter => setFilteredProducts(filterProducts(products, filter))} />
                <Products products={filteredProducts.slice(0, 20)} />
              </>
            )
        }
      </Grid>
    </Grid>
  );
};

export default App;
