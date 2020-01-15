import React, { useState, useEffect, Fragment } from "react";

// Material
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

// PDF
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";


// Icons
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import { Link } from "react-router-dom"

// component
import { ProductForm } from './addProduct'

// utils
// import { generateTemplatePDF } from '../../common/pdf/templatePDF'


import { UnitsCost } from './unitsCost'

// css
import '../../../styles/commons.css';
import { da } from "date-fns/locale";

import conf from '../../../config'



export const FormQuotation = (props) => {
  //   constructor() {}
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [showproductForm, setShowproductForm] = useState(false)
  const [costUnit, SetCostUnit] = useState({})
  const [units, SetUnits] = useState([])
  const [products, setProducts] = useState([])
  const [dataClients, setDataClients] = useState([])
  const [dataUsers, setDataUsers] = useState([])
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;

  useEffect(() => { 
    getClients()
    getUsers()
  }, []);

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
    const data = generateData()
    console.log('data sabequotation: ', data);
    // if (event) {
    //   event.preventDefault();
    //   const data = generateData()
    //   console.log('FECHA', da.localize);
    //   props.eventCreateQuotation(data)
    // }
    fetch(`${conf.api_url}/quotation/`,{
      method: 'POST',
      body: JSON.stringify(data),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.log('Error: ', error))
    .then(response => {
      console.log('Success: ', response)
      // this.props.addClientToList(response)
    })
  }

  const generatePDF = async () => {
    const data = generateData()
    let itemClient = data.client

    for (let i = 0; i < dataClients.length; i++){
      if (dataClients[i].id == itemClient) {
        data.client = dataClients[i]
      }
    }

    sessionStorage.setItem('quotation', JSON.stringify(data))
    props.eventSavePDF(data)
    // const templatePdf = await generateTemplatePDF(data)
    // pdfMake.createPdf(templatePdf).open();

    // fetch(`${conf.api_url}/quotationtemp/`, {
    //   method: 'POST',
    //   body: JSON.stringify({ data: data }),
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => res.json())
    //   .then(res => {
    //     console.log('res: ', res);
    //     props.eventSavePDF(res.data)
    //   })
    //   .catch(() => {
    //     console.log('ERROR');
    //   })
  }

  const generateData = () => {
    let elements = document.getElementById('quotationForm').elements;
    let obj = {};
    for (let item of elements) {
      if (item.name) {
        obj[item.name] = item.value;
      }
    }
    obj.products = products
    obj.units = units
    // obj.products = generateProducts({ ...obj });
    return obj
  }

  const getClients = async () => {
    try {
      let response = await fetch(`${conf.api_url}/client/`)
      let data = await response.json();
      console.log('data clients: ', data);

      setDataClients(data)

    } catch (error) {
      console.log('error', error)
    }
  }

  const getUsers = async () => {
    try {
      let response = await fetch(`${conf.api_url}/user/`)
      let data = await response.json();
      console.log('data users: ', data);

      setDataUsers(data)

    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <div className="title">
        Crear cotización
      </div>
      <br />
      <form id="quotationForm" >{/* onSubmit={saveQuotation} */}
        <Grid container spacing={3}>
          {/* <Grid item md={3}>
            <TextField
              id="consecutive"
              name="consecutive"
              className=""
              label="Cosecutivo"
              margin="normal"
            /> 
          </Grid> */}
          <Grid item md={3}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled
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
            <FormControl margin="normal">
              <InputLabel id="clients">Cliente</InputLabel>
              <Select
                labelId="client"
                name="client"
                onChange={getClients}
              >
                {dataClients.map(clients => (
                  <MenuItem
                    value={clients.id}
                  >{clients.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="client"
              name="client"
              className=""
              label="Nombre cliente"
              margin="normal"
            /> */}
          </Grid>
          {/* <Grid item md={3}>
            <TextField
              id="clientPhone"
              name="clientPhone"
              className=""
              label="Teléfono cliente"
              margin="normal"
            />
          </Grid> */}

          {/* segunda fila  */}

          <Grid item md={3}>
          <FormControl margin="normal">
              <InputLabel id="users">Ejecutivo de ventas</InputLabel>
              <Select
                labelId="user"
                name="user"
                onChange={getUsers}
              >
                {dataUsers.map(users => (
                  <MenuItem
                    value={users.id}
                  >{users.first_name} {users.last_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* <TextField
              id="user"
              name="user"
              className=""
              label="Ejecutivo de ventas"
              margin="normal"
            /> */}
          </Grid>
          {/* <Grid item md={3}>
            <TextField
              id="city"
              name="city"
              className=""
              label="Ciudad"
              margin="normal"
            />
          </Grid> */}
          <Grid item md={3}>
            <TextField
              id="delivery_time"
              name="delivery_time"
              className=""
              label="Tiempo de entrega"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="pay_format"
              name="pay_format"
              className=""
              label="Forma de pago"
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
      <br />

      {/* Unidades */}
      <UnitsCost handleAddUnit={handleAddUnit} preUnits={props.preQuotation.units} />

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
