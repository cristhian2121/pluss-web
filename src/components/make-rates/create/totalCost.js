import React from 'react'
import Grid from '@material-ui/core/Grid';

export const TotalCost = (product) => {
    console.log('entre', product);
    return (
      <Grid item md={2}>
        <p>Costo: {product.discount}</p>
        <p>Valor de venta: </p>
      </Grid>
    )
  }