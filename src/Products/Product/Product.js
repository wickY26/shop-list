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
  gallery: {
    display: 'flex',
  },
  image: {
    width: 160,
    height: 200,
    backgroundSize: 'auto 100%',
  },
});

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
      }
    </Card>
  )
}
export default withStyles(styles)(Product);
