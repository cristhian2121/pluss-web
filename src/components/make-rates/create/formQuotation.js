import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { createHashHistory } from 'history'

// Material
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  validate,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

// Icons
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// component
import { ProductForm } from './addProduct'
import { SendEmail } from './sendEmail.jsx'
import { UnitsCost } from './unitsCost'
import conf from '../../../config'

// css
import '../../../styles/commons.css';

/**
 * assemble the obj of initialization
 * @param {*} props 
 */
const setEditQuotation = (props) => {
  if (props.updateQuotation && props.updateQuotation.selectUpdate) {
    return {
      selectUpdate: props.updateQuotation.selectUpdate,
      client: props.updateQuotation.selectUpdate.client,
      user: props.updateQuotation.selectUpdate.user,
      idSelectUpdate: props.updateQuotation.selectUpdate.id,
      units: props.updateQuotation.selectUpdate.units,
      products: props.updateQuotation.selectUpdate.products
    }
  }
  else if (props.preQuotation && props.preQuotation.selectUpdate && props.preQuotation.selectUpdate.products.length) {
    return {
      selectUpdate: props.preQuotation.selectUpdate,
      client: props.preQuotation.selectUpdate.client,
      user: props.preQuotation.selectUpdate.user,
      idSelectUpdate: props.preQuotation.selectUpdate.id,
      units: props.preQuotation.selectUpdate.units,
      products: props.preQuotation.selectUpdate.products
    }
  }
  else {
    return {
      selectUpdate: null,
      client: null,
      user: null,
      idSelectUpdate: null,
      units: [],
      products: []
    }
  }
}

export const FormQuotation = (props) => {
  const objectInitialization = setEditQuotation(props)
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [showproductForm, setShowproductForm] = useState(false)
  const [units, SetUnits] = useState(objectInitialization.units || [])
  const [products, setProducts] = useState(objectInitialization.products || [])
  const [dataClients, setDataClients] = useState([])
  const [dataUsers, setDataUsers] = useState([])
  const [status, setStatus] = useState("En progreso")
  const [selectUpdate, setSelectUpdate] = useState()
  const [clientSelectUpdate, setCientSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.client : null)
  const [userSelectUpdate, setUserSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.user : null)
  const [idSelectUpdate, setIdSelectUpdate] = useState(props.updateQuotation ? props.updateQuotation.selectUpdate.id : null)
  const [redirectList, setRedirectList] = useState(false)
  const [openAlert, setOpenAlert] = useState({})
  const [openEmail, setOpenEmail] = useState(false)
  const [messageAlert, setMessageAlert] = useState('')
  const [typeAlert, setTypeAlert] = useState('')
  const [errors, setErrors] = useState({})
  const [alert, setAlert] = useState({})
  
  useEffect(() => {
    getClients()
    getUsers()
  }, []);

  const history = createHashHistory()

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const showUnits = () => {
    setshowUnitForm(!showUnitForm)
  }

  const handleAddUnit = (_units) => {
    SetUnits(units => [..._units])
  }

  const handleAddProduct = (_product) => {
    const aux = [...products]
    aux.push(_product)
    setProducts(aux)
  }

  const handleRemoveProduct = (_product) => {
    let newProduct = products.filter(item => item != _product)
    setProducts(newProduct)
  }

  const handleUpdateProduct = (_product) => {
    let newProduct = products.filter(item => item.id != _product.id)
    setProducts([...newProduct, _product])
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
    data.endQuotation = event

    validate(data) && props.eventCreateQuotation(data)
  }

  const updateQuotation = event => {
    const data = generateData()
    data.status = event
    data.id = idSelectUpdate
    validate(data) && props.updateQuotations(data)
  }

  const generatePDF = async () => {
    const data = generateData()
    let idClient = data.client
    let idUser = data.user

    for (let i = 0; i < dataClients.length; i++) {
      if (dataClients[i].id == idClient) {
        data.client = dataClients[i]
      }
    }

    for (let i = 0; i < dataUsers.length; i++) {
      if (dataUsers[i].id == idUser) {
        data.user = dataUsers[i]
      }
    }

    if (validate(data)) {
      sessionStorage.setItem('quotation', JSON.stringify(data))
      props.eventSavePDF(data)
    }
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
    return obj
  }

  const getClients = async () => {
    try {
      let response = await fetch(`${conf.api_url}/client/`)
      let data = await response.json();

      setDataClients(data.results)

    } catch (error) {
      console.log('error', error)
    }
  }

  const getUsers = async () => {
    try {
      let response = await fetch(`${conf.api_url}/profile/`)
      let data = await response.json();
      setDataUsers(data.results)
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleChange = e => {
    switch (e.target.name) {
      case "client":
        setCientSelectUpdate(e.target.value)
        break
      case "user":
        setUserSelectUpdate(e.target.value)
        break
      case "pay_format":
        setSelectUpdate({ pay_format: e.target.value })
        break
      case "delivery_time":
        setSelectUpdate({ delivery_time: e.target.value })
        break
      default: break;
    }
  }

  const cancelEmail = e => {
    setOpenEmail(e)
  }

  const preEmail = () => {
    let data = generateData()

    validateSend(data) && setOpenEmail(true)
  }

  const confEmail = (dataEmail) => {
    let data = generateData()
    data.email = dataEmail
    data.status = "Finalizado"
    data.id = idSelectUpdate

    idSelectUpdate ? props.updateQuotations(data) : props.eventCreateQuotation(data)
  }

  const validate = (data) => {
    let error = []
    !data.client && error.push('client')
    !data.user && error.push('user')

    if (error.length > 0) {
      let errors = {}
      for (let item of error) {
        errors[item] = true
      }
      setErrors(errors)

      return false
    }
    else return true
  }

  const validateSend = (data) => {
    let error = []
    !data.client && error.push('client')
    !data.user && error.push('user')

    for (let index in data.products) {
      if (!data.products[index].prices) {
        setOpenAlert({
          open:true,
          message: 'Antes de finalizar debe editar los precios por unidad de los productos pendientes.',
          type:'error'
        })
        error.push('productEdit')
      }
    }
    
    if (error.length > 0) {
      let errors = {}
      for (let item of error) {
        errors[item] = true
      }
      setErrors(errors)
      return false
    }
    else return true    
  }

  const openPanelCreate = () => {
    if(units.length > 0) {
      setShowproductForm(!showproductForm)
    }else{
      setOpenAlert({
        open:true,
        message: 'Para agregar productos es necesario agregar las unidades.',
        type:'error'
      })
    }      
  }

  return (
    <div className="container-body body--create-Quotaion">
      <div className="title m-0">      
        <div className="title-actions">
          {redirectList && <Redirect to={{ pathname: '/cotizaciones', state: openAlert }} />}
          {openEmail && <SendEmail cancelEmail={cancelEmail} sendEmail={confEmail} />}
          <div className="title-text">Crear cotización</div>
        </div>
      </div>
          
        <div className="quotation-body">
          <form id="quotationForm" className="form-quotation" >
            <MuiPickersUtilsProvider  utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled
                className="col-md-4 col-sm-12"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                name="quotationDate"
                label="Fecha de cotización"
                value={selectUpdate ? selectUpdate.date_created: selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
            <TextField required
              select
              label="Cliente"
              name="client"
              onChange={getClients}
              defaultValue={clientSelectUpdate ? clientSelectUpdate.id : ''}
              className="col-md-4 col-sm-12"
              margin="normal"
              error={errors.client}
              helperText={errors.client && 'Este campo es requerido.'}
            >
              {dataClients.map(clients => (
                <MenuItem
                key={clients.id}
                  value={clients.id}
                >{clients.nit} | {clients.name} | {clients.agent} | {clients.dependece} </MenuItem>
              ))}
            </TextField>

            {/* segunda fila  */}
            <TextField required
              select
              label="Ejecutivo de ventas"
              name="user"
              onChange={getUsers}
              defaultValue={userSelectUpdate ? userSelectUpdate.id : ''}
              className="col-md-4 col-sm-12"
              margin="normal"
              error={errors.user}
              helperText={errors.user && 'Este campo es requerido.'}
            >
              {dataUsers.map(users => (
                <MenuItem
                key={users.id}
                  value={users.id}
                >{users.user.first_name}</MenuItem>
              ))}
            </TextField>
            <TextField
              id="pay_format"
              name="pay_format"
              className="col-md-4 col-sm-12"
              label="Formato de pago"
              margin="normal"
              value={selectUpdate ? selectUpdate.pay_format : ''}
              onChange={handleChange}
            />
            <TextField
              id="delivery_time"
              name="delivery_time"
              className="col-md-4 col-sm-12"
              label="Tiempo de entrega (Días)"
              margin="normal"
              value={selectUpdate ? selectUpdate.delivery_time : ''}
              onChange={handleChange}
            />
          </form>

          {/* Unidades */}
          <div className="sub-title">
            <span className="text">Unidades</span>
          </div>
          <UnitsCost products={products} handleAddUnit={handleAddUnit} preUnits={units} />

          {/* Anadir producto */}
          <div className="sub-title">
            <span className="text">Productos</span> <Button href="#addProductForm" className="button-more" onClick={openPanelCreate}> <AddCircleIcon className="icon-size" />  </Button>
          </div>
          {/* { showproductForm && */}
          <>
              <ProductForm 
                openCreate={showproductForm}
                setOpenCreate={() => setShowproductForm(!showproductForm)}
                units={units} 
                productsE={products} 
                addProduct={handleAddProduct}
                removeProduct={handleRemoveProduct}
                updateProduct={handleUpdateProduct}                
              />
          </>
          {/* } */}

        </div>
          <div className="col-12 px-0 d-flex justify-content-end container-button">
            <Button variant="contained" color="secondary" type="submit" onClick={() => idSelectUpdate ? updateQuotation("En progreso") : saveQuotation("En progreso")}>
              Guardar cotización
            </Button>
            <Button variant="contained" onClick={generatePDF}>
              Vista previa PDF <PictureAsPdfIcon className="icon-size" />
            </Button>
            <Button variant="contained" type="submit" onClick={preEmail}>
              Finalizar
            </Button>
          </div>
          <Snackbar
            open={openAlert.open}
            autoHideDuration={4000}
            onClose={() => 
              setOpenAlert({alert: {open: false}})
            }
            anchorOrigin= {{ 
              vertical: 'bottom',
              horizontal: 'left'
            }}>
            <Alert variant="filled" severity={openAlert.type}>{openAlert.message}</Alert>
          </Snackbar>
        
        

    </div>
  );
}
