import React, { useState, useEffect, Fragment } from "react";

// Material
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
  console.log('props hhhhhhhhhhhhhhhhhhh: ', props);
  //   constructor() {}
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [showproductForm, setShowproductForm] = useState(false)
  const [costUnit, SetCostUnit] = useState({})
  const [units, SetUnits] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.units : [])
  const [products, setProducts] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.products : [])
  const [dataClients, setDataClients] = useState([])
  const [dataUsers, setDataUsers] = useState([])
  const [status, setStatus] = useState("En progreso")
  const [selectUpdate, setSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate : null)
  const [clientSelectUpdate, setCientSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.client : null)
  const [userSelectUpdate, setUserSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.user : null)
  const [idSelectUpdate, setIdSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.id : null)
  // pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const [openAlert, setOpenAlert] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [typeAlert, setTypeAlert] = useState('')

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

  const handleRemoveProduct = (_product) => { 
    console.log('_product remove: ', _product);
    let productss = products.filter(item => item != _product)
    console.log('productss: ', productss);
    setProducts(productss)
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

  const saveQuotation = event => {
    const data = generateData()
    data.status = status

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
    }).then(async (response) => {
      let resp = await response.json()
      if (response.status === 200 ||  response.status == 201){
        props.history.push({
          pathname: '/cotizaciones',
          state: {
            open: true,
            message: 'La cotización se creo correctamente.',
            type:'success'
          }
        })
      }
    
    })
    .catch(error => console.log('Error: ', error))
    .then(response => {
      // this.props.addClientToList(response)
    })
  }

  const updateQuotation = event => {
    // let idQuotation = selectUpdate.id
    console.log('selectUpdate: ', selectUpdate);
    // console.log('idQuotation: ', idQuotation);
    const data = generateData()
    data.status = status

    console.log('data updatequotation: ', data);

    fetch(`${conf.api_url}/quotation/${idSelectUpdate}/`,{
      method: 'PUT',
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

      setDataClients(data.results)

    } catch (error) {
      console.log('error', error)
    }
  }

  const getUsers = async () => {
    try {
      let response = await fetch(`${conf.api_url}/user/`)
      let data = await response.json();
      console.log('data users: ', data);

      setDataUsers(data.results)

    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = e => {
    console.log('e: ', e.target.name, e.target.value);
    console.log('product', selectUpdate)
    // render()
    switch (e.target.name) {
      case "client":
        setCientSelectUpdate(e.target.value)
        break
      case "user":
        setUserSelectUpdate( e.target.value )
        break
      case "pay_format":
        setSelectUpdate({ pay_format: e.target.value })
        break
      case "delivery_time":
        setSelectUpdate({ delivery_time: e.target.value })
        break
    }
  }

  return (
    <div>
      <div className="title">
        Crear cotización
      </div>

      <form id="quotationForm" >{/* onSubmit={saveQuotation} */}
          <MuiPickersUtilsProvider  utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled
              className="col-md-3 col-xs-12"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              name="quotationDate"
              label="Fecha de cotización"
              value={idSelectUpdate ? selectUpdate.date_created: selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <FormControl className="col-md-3 col-xs-12" margin="normal">
            <InputLabel id="clients">Cliente</InputLabel>
            <Select
              labelId="client"
              name="client"
              onChange={getClients}
              defaultValue={clientSelectUpdate ? clientSelectUpdate.id : null}
            >
              {dataClients.map(clients => (
                <MenuItem
                  value={clients.id}
                >{clients.nit} | {clients.name} | {clients.agent} | {clients.dependece} </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* segunda fila  */}

          <FormControl className="col-md-3 col-xs-12" margin="normal">
            <InputLabel id="users">Ejecutivo de ventas</InputLabel>
            <Select
              labelId="user"
              name="user"
              onChange={getUsers}
              defaultValue={userSelectUpdate ? userSelectUpdate.id : null}
            >
              {dataUsers.map(users => (
                <MenuItem
                  value={users.id}
                >{users.first_name} {users.last_name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="pay_format"
            name="pay_format"
            className="col-md-3 col-xs-12"
            label="Formato de pago"
            margin="normal"
            value={idSelectUpdate ? selectUpdate.pay_format : null}
            onChange={handleChange}
          />
          <TextField
            id="delivery_time"
            name="delivery_time"
            className="col-md-2 col-xs-12"
            label="Tiempo de entrega (Días)"
            margin="normal"
            value={idSelectUpdate ? selectUpdate.delivery_time : null}
            onChange={handleChange}
          />
      </form>

      <div className="sub-title">
        <span className="text">Agregar Unidades</span> 
      </div>

      {/* Unidades */}
      <UnitsCost handleAddUnit={handleAddUnit} preUnits={idSelectUpdate ? selectUpdate.units : props.preQuotation.units}/>

      <div className="sub-title">
        <span className="text">Agregar productos</span> <Button className="button-more" onClick={() => setShowproductForm(!showproductForm)}> <AddCircleIcon/>  </Button>
      </div>

      {/* Anadir producto */}
      { showproductForm &&
          <>
              <ProductForm units={units} productsE={products} addProduct={handleAddProduct} removeProduct={handleRemoveProduct} />
          </>
      }

      <div className="col-12 px-0 d-flex justify-content-end container-button">
        <Button variant="contained" color="secondary" type="submit" onClick={idSelectUpdate ? updateQuotation : saveQuotation}>
            Guardar cotización
        </Button>
        <Button variant="contained" onClick={generatePDF}>
            Vista previa PDF <PictureAsPdfIcon />
        </Button>
      </div>
    </div>
  );
}
