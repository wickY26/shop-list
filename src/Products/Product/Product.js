import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, withStyles } from '@material-ui/core';

const styles = () => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    margin: 8,
    cursor: 'pointer',
  },
  main: {
    display: 'flex',
    flexDirection: 'row',
  },
  details: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
  },
  content: {
    flex: '1 1 auto',
  },
  cover: {
    width: 200,
    height: 200,
    backgroundSize: 'auto 100%',
  },
  gallery: {
    display: 'flex',
  },
  image: {
    width: 160,
    height: 200,
    backgroundSize: 'auto 100%',
  },
  discount: {
    textDecoration: 'line-through',
    marginRight: 16,
  },
});

const priceContent = (price, salePrice, classes) => {
  if (salePrice < price) {
    return (
      <>
        <Typography className={classes.discount} variant="subtitle2" color="textSecondary" inline>
          {price}
        </Typography>
        <Typography variant="subtitle2" inline>
          {salePrice}
        </Typography>
      </>
    );
  } else {
    return (
      <Typography variant="subtitle2" color="textSecondary">
        {price}
      </Typography>
    );
  }
}

const genderContent = (gender) => {
  let content;
  if (gender === 'unisex') {
    content = 'For Everyone'
  } else if (gender === 'male') {
    content = 'For Men Only'
  } else if (gender === 'female') {
    content = 'For Women Only'
  }
  return (
    <Typography variant="overline" color="textSecondary">
      {content}
    </Typography>
  );
}

const Product = ({ classes, product }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className={classes.card} raised onClick={() => setIsExpanded(!isExpanded)}>
      {
        isExpanded ?
          <div className={classes.gallery}>
            {
              product
                .additional_image_link
                .split(',')
                .map((link, index) => (
                  <CardMedia
                    key={index}
                    className={classes.cover}
                    image={link}
                  />
                ))
            }
          </div>
          :
          <div className={classes.main}>
            <CardMedia
              className={classes.cover}
              image={product.image_link}
              title={product.title}
            />
            <div className={classes.details}>
              <CardContent className={classes.content}>
                <Typography component="h6" variant="h6">
                  {product.title}
                </Typography>
                {priceContent(product.price, product.sale_price, classes)}
                {genderContent(product.gender, classes)}
                <Typography variant="caption" color="textSecondary">
                  Product Id: {product.gtin}
                </Typography>
              </CardContent>
            </div>
          </div>
      }
    </Card>
  )
}
export default withStyles(styles)(Product);
