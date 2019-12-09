import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';

export const TotalCost = ({ transport, profitableness, mark, discount, cost }) => {
  console.log('entre', transport);
  const [preCost, setPreCost] = useState(0)
  const [total, setTotal] = useState(0)
  const [profitable, setProfitable] = useState(0)


  useEffect(() => {
    setPreCost(cost * (1 - discount / 100))
    setProfitable((preCost + mark) * (profitableness / 100))
    setTotal((preCost + mark) * (1 + (profitableness / 100)) + transport)

  })

  return (
    <Grid item md={2}>
      <p>Costo: {preCost} </p>
      <p>Ganancia: {profitable}</p>
      <p>Valor de venta: {total}</p>
    </Grid>
  )
}