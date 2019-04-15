import React, { useState, useEffect } from 'react';
import * as Papa from 'papaparse';
import Products from './Products/Products';

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

const App = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * In this effect function we fetch products.csv and transform into list of product objects
   * This effect will run only one time
   */
  useEffect(() => {
    Papa.parse('/products.csv', {
      download: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = transformData(results.data[0], results.data.slice(1));
        setProducts(data);
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      Is loading: {loading ? 'loading' : 'not loading'}
      <br></br>
      Product count: {products.length}
      <Products products={products.filter(product => product.sale_price !== product.price).slice(0, 20)} />
    </div>
  );
};

export default App;
