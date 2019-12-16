import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';

export const TotalCost = ({ transport, profitableness, mark, discount, cost }) => {
  console.log('entre', transport);
  const [preCost, setPreCost] = useState(0)
  const [total, setTotal] = useState(0)
  const [profitable, setProfitable] = useState(0)


  useEffect(() => {
    setPreCost((cost * (1 - discount / 100).toFixed(2)))
    setProfitable(((parseInt(preCost) + mark) * (profitableness / 100)).toFixed(2))
    setTotal(((parseInt(preCost) + mark) * (1 + (profitableness / 100)) + transport).toFixed(2))
  })

  return (
    <Grid item md={2}>
      <p>Costo: {preCost} </p>
      <p>Ganancia: {profitable}</p>
      <p>Valor de venta: {total}</p>
    </Grid>
  )
}