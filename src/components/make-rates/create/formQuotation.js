import React, { useState, useEffect, Fragment } from "react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Link } from "react-router-dom"

// component
import { ProductForm } from './addProduct'


import { UnitsCost } from './unitsCost'

// css
import '../../../styles/commons.css';
import { da } from "date-fns/locale";




export const FormQuotation = (props) => {
  //   constructor() {}
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [showproductForm, setShowproductForm] = useState(false)
  const [costUnit, SetCostUnit] = useState({})
  const [units, SetUnits] = useState([])
  const [products, setProducts] = useState([])

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const showUnits = () => {
    setshowUnitForm(!showUnitForm)
  }

  // const calculateValue = (event) => {
  //   const eventAux = { ...event }
  //   console.log(eventAux.target.value);
  //   SetCostUnit(costUnit => {
  //     return { ...costUnit, discount: eventAux.target.value }
  //   })
  // }

  const handleAddUnit = (_units) => {
    console.log('_units: ', _units);
    SetUnits(units => [..._units])
  }

  const handleAddProduct = (_product) => {
    console.log('_product: ', _product);
    setProducts(products => [...products, _product])
  }

  const validateProduct = products => {
    const properties = Object.values(products);
    const keys = Object.keys(products);
    let i = 0;
    let validate = true;
    for (i; i < properties.length; i++) {
      let $input = document.querySelector(`#${keys[i]}`)
      const $parent = document.querySelector(`.input-validation-${$input.name}`)
      const $elementMessagge = document.querySelector(`.messagge-${keys[i]}`)
      if (!properties[i]) {
        validate = false;
        if (!$elementMessagge) {
          const element = document.createElement('P')
          const text = document.createTextNode(`El campo es obligatorio`)
          element.className = `messagge-${keys[i]} messagge-validator`
          element.appendChild(text)
          $parent.insertBefore(element, $input.nextSibling)
        }
      } else {
        if ($elementMessagge) {
          $parent.removeChild($elementMessagge)
        }
      }
    }
    return validate
  }


  // const UnitCost = () => {
  //   return (
  //     <Grid container spacing={3} >
  //       <Grid item md={2} className="unit">
  //         <TextField
  //           id={'unit'}
  //           name={'unit'}
  //           className=""
  //           label="Unidades"
  //         />
  //       </Grid>
  //       <Grid item md={2}>
  //         <Button color="primary" onClick={handleAddUnits}>
  //           Agregar <AddCircleIcon />
  //         </Button>
  //       </Grid>
  //     </Grid>
  //   )
  // }

  const saveQuotation = event => {
    // if (event) {
    //   event.preventDefault();
    //   const data = generateData()
    //   console.log('FECHA', da.localize);
    //   props.eventCreateQuotation(data)
    // }
  }

  const generatePDF = () => {
    const data = generateData()
    props.eventGeneratePDF(data)
  }

  const generateData = () => {
    let elements = document.getElementById('quotationForm').elements;
    let obj = {};
    for (let item of elements) {
      obj[item.name] = item.value;
    }
    obj.products = products
    obj.units = units
    // obj.products = generateProducts({ ...obj });
    return obj
  }

  return (
    <div>
      <div className="title">
        Crear cotización
      </div>
      <br />
      <form id="quotationForm" >{/* onSubmit={saveQuotation} */}
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
      </form>
      <br />
      <div className="sub-title">
        Agregar Unidades
        </div>

      {/* Unidades */}
      <UnitsCost handleAddUnit={handleAddUnit} />

      <br />
      <div className="sub-title">
        <Button onClick={() => setShowproductForm(!showproductForm)}>Agregar productos </Button>
      </div>
      {/* Anadir producto */}
      {
        showproductForm &&
        <>
          <ProductForm units={units} addProduct={handleAddProduct} />
        </>
      }
      <div className="col-12 px-0">
        <Grid item md={12} className="d-flex justify-content-end">
          <div className="button-action">
            <Button variant="contained" color="primary" type="submit" onClick={saveQuotation}>
              Guardar cotización
          </Button>
          </div>
          <div className="button-action">
            <Button variant="contained" color="secondary" onClick={generatePDF}>
              Generar PDF <PictureAsPdfIcon />
            </Button>
          </div>
        </Grid>
      </div>


    </div>
  );
}
