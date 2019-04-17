import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Collapse, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 0 auto',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 200,
    height: 200,
    backgroundSize: 'auto 100%',
  },
  wrapperInner: {
    display: 'flex',
    padding: 16,
  },
  galleryImage: {
    width: 120,
    height: 160,
    backgroundSize: 'auto 100%',
  },
});

const Products = ({ classes, products }) => {
  const [expandMap, setExpandMap] = useState({});

  const expandCard = (productId) => {
    setExpandMap({ ...expandMap, [productId]: !expandMap[productId] });
  }
  return (
    products.map(product => (
      <Card className={classes.card} raised={true} key={product.gtin} onClick={() => expandCard(product.gtin)}>
        <div className={classes.main}>
          <CardMedia
            className={classes.cover}
            image={product.image_link}
            title={product.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography component="h5" variant="h5">
                {product.title}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {product.gtin}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {product.sale_price}
                {product.price}
                {product.gender}
                {product.gtin}
              </Typography>
            </CardContent>
          </div>
        </div>
        <Collapse in={expandMap[product.gtin]} timeout="auto" unmountOnExit classes={{ wrapperInner: classes.wrapperInner }}>
          {
            product
              .additional_image_link
              .split(',')
              .map((link, index) => (
                <CardMedia
                  key={index}
                  className={classes.galleryImage}
                  image={link}
                />
              ))
          }
        </Collapse>
      </Card>
    ))
  )
}

export default withStyles(styles, { withTheme: true })(Products);
