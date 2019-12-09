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
  // const [products, setProducts] = useState([])

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const showUnits = () => {
    setshowUnitForm(!showUnitForm)
  }

  const calculateValue = (event) => {
    const eventAux = { ...event }
    console.log(eventAux.target.value);
    SetCostUnit(costUnit => {
      return { ...costUnit, discount: eventAux.target.value }
    })
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

  const handleAddProduct = () => {
    // const product = {
    //   image: document.querySelector(`#image`).value,
    //   size: document.querySelector(`#size`).value,
    //   name: document.querySelector(`#name`).value,

    //   cost: document.querySelector(`#cost`).value,
    //   prints: document.querySelector(`#prints`).value,
    //   description: document.querySelector(`#description`).value,

    //   discount: document.querySelector(`#discount`).value,
    //   mark: document.querySelector(`#mark`).value,
    //   profitableness: document.querySelector(`#profitableness`).value,

    //   colors: document.querySelector('#colors').value,
    //   transport: document.querySelector('#transport').value
    // }
    // if (!validateProduct(product)) return
    // setProducts([...products, product])
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
    // const data = generateData()
    // console.log('FECHA', da.localize);
    // props.eventGeneratePDF(data)
  }

  // const generateData = () => {
  //   let elements = document.getElementById('quotationForm').elements;
  //   let obj = {};
  //   for (let item of elements) {
  //     obj[item.name] = item.value;
  //     obj.products = products
  //   }
  //   // obj.products = generateProducts({ ...obj });
  //   return obj
  // }

  // const generateProducts = (obj) => {
  //   let productsList;
  //   for (let i of products) {
  //     productsList = {
  //       image: obj[`image${i}`],
  //       size: obj[`size${i}`],
  //       name: obj[`name${i}`],
  //       cost: obj[`cost${i}`],
  //       prints: obj[`prints${i}`],
  //       description: obj[`description${i}`],
  //       discount: obj[`discount${i}`],
  //       mark: obj[`mark${i}`],
  //       profitableness: obj[`profitableness${i}`],
  //       transport: obj[`transport${i}`]
  //     }
  //   }
  //   return productsList
  // }

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
      <UnitsCost />

      {/* Mostrar unidades */}


      <br />
      <div className="sub-title">
        <Button onClick={() => setShowproductForm(!showproductForm)}>Agregar productos </Button>
      </div>
      {/* Anadir producto */}
      {
        showproductForm &&
        <>
          <ProductForm />
        </>
      }


      <br /><br />
      <Grid item md={12} className="text-center">
        <Button variant="contained" color="primary" type="submit" onClick={saveQuotation}>
          Guardar cotización
          </Button>
        <Button variant="contained" color="secondary" onClick={generatePDF}>
          Generar PDF <PictureAsPdfIcon />
        </Button>
      </Grid>


    </div>
  );
}
