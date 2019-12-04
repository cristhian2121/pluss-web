import React, { useState, useEffect, Fragment } from "react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Link } from "react-router-dom"



// css
import '../../../styles/commons.css';
import { da } from "date-fns/locale";




export const FormQuotation = (props) => {
  //   constructor() {}
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [units, setUnits] = useState([])
  const [products, setProducts] = useState([])
  const [quotationData, setQuotationData] = useState({})

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const showUnits = () => {
    setshowUnitForm(!showUnitForm)
  }

  const Product = ({ number }) => {
    return (
      <Fragment>
        <Grid container spacing={1} >
          <Grid item md={3}>
            <TextField
              id={'image' + number}
              name={'image' + number}
              className=""
              label="Url imagen"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'name' + number}
              name={'name' + number}
              className=""
              label="Nombre"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'size' + number}
              name={'size' + number}
              className=""
              label="Medidas"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'colors' + number}
              name={'colors' + number}
              className=""
              label="Colores disponibles"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'prints' + number}
              name={'prints' + number}
              className=""
              label="tintas"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'description' + number}
              name={'description' + number}
              multiline
              rowsMax="4"
              className=""
              label="Descripción"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id={'cost' + number}
              name={'cost' + number}
              className=""
              label="Precio en pagina"
            />
          </Grid>
        </Grid>
        <p>Valor por unidades</p>
        <Grid container spacing={1}>
          <Grid item>
            <TextField
              id={'discount' + number}
              name={'discount' + number}
              className=""
              label="Descuento %"

            />
          </Grid>
          <Grid item>
            <TextField
              id={'mark' + number}
              name={'mark' + number}
              className=""
              label="Marcación"
            />
          </Grid>
          <Grid item>
            <TextField
              id={'profitableness' + number}
              name={'profitableness' + number}
              className=""
              label="Rentabilidad %"
            />
          </Grid>
          <Grid item md={2}>
            <TextField
              id={'transport' + number}
              name={'transport' + number}
              className=""
              label="Transporte"
            />
          </Grid>
          <Grid item md={2}>
            <p>Costo: </p>
            <p>Valor de venta: </p>
          </Grid>
        </Grid>
      </Fragment>
    )

  }

  const handleAddUnits = () => {
    const $unit = document.querySelector(`#unit`)
    if ($unit) {
      const unit = $unit.value
      setUnits(units => [...units, unit]);
    }
  }

  const UnitCost = () => {
    return (
      <Grid container spacing={3} >
        <Grid item md={2}>
          <TextField
            id={'unit'}
            name={'unit'}
            className=""
            label="Unidades"
          />
        </Grid>
        <Grid item md={2}>
          <Button color="primary" onClick={handleAddUnits}>
            Agregar <AddCircleIcon />
          </Button>
        </Grid>
      </Grid>
    )
  }

  const saveQuotation = event => {
    if (event) {
      event.preventDefault();
      const data = generateData()
      console.log('FECHA', da.localize);
      props.eventCreateQuotation(data)
    }
  }

  const generatePDF = () => {
    const data = generateData()
    console.log('FECHA', da.localize);
    props.eventGeneratePDF(data)
  }

  const generateData = () => {
    let elements = document.getElementById('quotationForm').elements;
    let obj = {};
    for (let item of elements) {
      obj[item.name] = item.value;
      obj.products = products
    }
    obj.products = generateProducts({ ...obj });
    return obj
  }

  const generateProducts = (obj) => {
    const productsList = []
    for (let i of products) {
      productsList.push({
        image: obj[`image${i}`],
        size: obj[`size${i}`],
        cost: obj[`cost${i}`],
        description: obj[`description${i}`]
      })
    }
    return productsList
  }

  return (
    <div>
      <div class="title">
        Crear cotización
      </div>
      <br />
      <form id="quotationForm" onSubmit={saveQuotation}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <TextField
              id="consecutive"
              name="consecutive"
              className=""
              label="Cosecutivo"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                name="quotationDate"
                label="Fecha de cotización"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item md={3}>
            <TextField
              id="client"
              name="client"
              className=""
              label="Nombre del cliente"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="clientPhone"
              name="clientPhone"
              className=""
              label="Telefóno del cliente"
              margin="normal"
            />
          </Grid>

          {/* segunda fila  */}

          <Grid item md={3}>
            <TextField
              id="user"
              name="user"
              className=""
              label="Ejecutivo de ventas"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="city"
              name="city"
              className=""
              label="Ciudad"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="deliveryTime"
              name="deliveryTime"
              className=""
              label="Tiempo de entrega"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="payTime"
              name="payTime"
              className=""
              label="Formato de pago"
              margin="normal"
            />
          </Grid>
          {/* fila 3 */}
        </Grid>
        <br />
        <div class="sub-title">
          Agregar Unidades
        </div>

        {/* Unidades */}
        <UnitCost />

        <div>
          {units.map(unit => (
            <span style={{paddingRight: '1em'}}>{unit},</span>
          ))}
        </div>
        <br />
        <div class="sub-title">
          <Button onClick={() => setProducts([...products, products.length + 1])}>Agregar productos  <AddCircleIcon /></Button>
        </div>
        <div>{products.map(product => (
          <Product key={product} number={product} />
        ))}</div>
        <br /><br />
        <Grid item md={12} class="text-center">
          <Button variant="contained" color="primary" type="submit">
            Guardar cotización
          </Button>
          <Button variant="contained" color="secondary" onClick={generatePDF}>
            Generar PDF <PictureAsPdfIcon />
          </Button>
        </Grid>

      </form>
    </div>
  );
}
