import React, { useState, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputAdornment from '@material-ui/core/InputAdornment';

// Components
import { ProductPDF } from '../../common/pdf/productPDF'
import { TotalCost } from './totalCost'
import AlertDialog from '../../common/confirm'

import config from '../../../config';

export const ProductForm = (props) => {
    const [products, setProducts] = useState(props.productsE ? props.productsE : [])
    const [newProduct, setNewProduct] = useState({})
    const [transportValue, setTransportValue] = useState([])
    const [profitablenessValue, setProfitablenessValue] = useState([])
    const [markValue, setMarkValue] = useState([])
    const [discountValue, setDiscountValue] = useState([])
    const [costValue, setCostValue] = useState(0)
    const [showAlert, setShowAlert] = useState(false)
    const [selectRegister, setSelectRegister] = useState(null)
    const [errors, setErrors] = useState({})
    const [idEditProduct, setidEditProduct] = useState(null)
    const [editProduct, setEditProduct] = useState(null);
    const [openPanelCreate, setOpenPanelCreate] = useState(props.openCreate)

    const getRandom = () => {
        let value = Math.random()
        return value + 'pro'
      }

    const handleAddProduct = () => {
        const product = buildProduct()
        console.log('product adddd: ', product)
        // if (!validateProduct(product)) return
        if (validateProduct(product)) {
            product.id = getRandom()
            setNewProduct(product => { return { ...product } })
            setProducts([...products, product])
            props.addProduct(product)
    
            clearForm()
        }
    }

    const handleUpdateProduct = () => {
        let product = buildProduct()
        if (validateProduct(product)) {
            product.id = idEditProduct
            // setNewProduct(product => { return { ...product } })
            let currentProduct = products.filter(item => item.id != idEditProduct)
            currentProduct.push(product)
            console.log('currentProduct enter: ', currentProduct)
            setProducts([...currentProduct])
            props.updateProduct(product)    
            clearForm()
        }
    }

    const clearForm = () => {
      document.getElementById("addProductForm").reset()
      props.setOpenCreate(!props.openCreate)     
      // TotalCost([],[],[],[],[])
      setMarkValue([])
      setDiscountValue([])
      setProfitablenessValue([])
      setTransportValue([])
      setCostValue([])
      setEditProduct(null)
    }

    const buildProduct = () => {
        const product = {
            image: document.querySelector(`#image`).value,
            size: document.querySelector(`#size`).value,
            colors: document.querySelector(`#colors`).value,
            name: document.querySelector(`#name`).value,
            cost: document.querySelector(`#cost`).value,
            prints: document.querySelector(`#prints`).value,
            description: document.querySelector(`#description`).value,
            material: document.querySelector(`#material`).value,
            inventory: document.querySelector(`#inventory`).value,
            observation: document.querySelector(`#observation`).value
        }
        product.costs = []
        product.prices = []
        product.units = props.units
        for (let index in props.units) {
            const constProduct = {
                discount: parseInt(document.getElementById(`discount${index}`).value),
                mark: parseInt(document.getElementById(`mark${index}`).value),
                profitableness: parseInt(document.getElementById(`profitableness${index}`).value),
                transport: parseInt(document.getElementById(`transport${index}`).value)
            }
            const preCost = (product.cost * (1 - constProduct.discount / 100)).toFixed(2)
            const costAux = (parseInt(preCost) + constProduct.mark) * (1 + (constProduct.profitableness / 100)) + constProduct.transport
            product.prices.push(parseInt(costAux.toFixed(2)))
            product.costs.push(constProduct)
        }
        return product
    }

    const validateProduct = data => {
        let error = []
        !data.image && error.push('image')
        !data.name && error.push('name')

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

    // const validateProduct = products => {
    //     const properties = Object.values(products);
    //     const keys = Object.keys(products);
    //     let i = 0;
    //     let validate = true;
    //     for (i; i < properties.length; i++) {
    //         let $input = document.querySelector(`#${keys[i]}`)
    //         const $parent = document.querySelector(`.input-validation-${$input.name}`)
    //         const $elementMessagge = document.querySelector(`.messagge-${keys[i]}`)
    //         if (!properties[i]) {
    //             validate = false;
    //             if (!$elementMessagge) {
    //                 const element = document.createElement('P')
    //                 const text = document.createTextNode(`El campo es obligatorio`)
    //                 element.className = `messagge-${keys[i]} messagge-validator`
    //                 element.appendChild(text)
    //                 $parent.insertBefore(element, $input.nextSibling)
    //             }
    //         } else {
    //             if ($elementMessagge) {
    //                 $parent.removeChild($elementMessagge)
    //             }
    //         }
    //     }
    //     return validate
    // }

    const handleChange = (event, index) => {
        const value = parseInt(event.target.value)
        switch (event.target.name) {
            case 'discount':
                let discountAux = [...discountValue]
                discountAux[index] = value
                setDiscountValue(discountAux)
                break;
            case 'mark':
                let markValueAux = [...markValue]
                markValueAux[index] = value
                setMarkValue(markValueAux)
                break;
            case 'profitableness':
                let profitablenessValueAux = [...profitablenessValue]
                profitablenessValueAux[index] = value
                setProfitablenessValue(profitablenessValueAux)
                break;
            case 'transport':
                let transportValueAux = [...transportValue]
                transportValueAux[index] = value
                setTransportValue(transportValueAux)
                break
            case 'cost':
                setCostValue(value)
                break
            default: break;
        }
    }

    const handleRemoveProduct = (product) => {
        let productss = products.filter(item => item != selectRegister)
        setProducts(productss)
        props.removeProduct(selectRegister)
    }

    const handleEditProduct = (_product) => {
        const mark = _product.costs ? _product.costs.map(_ => _.mark): [];
        const discount = _product.costs ? _product.costs.map(_ => _.discount) : [];
        const profitableness = _product.costs ? _product.costs.map(_ => _.profitableness) : [];
        const transport = _product.costs ? _product.costs.map(_ => _.transport) : [];


        setidEditProduct(_product.id)
        setEditProduct(_product)
        setCostValue(_product.cost)
        props.setOpenCreate(true)
        setMarkValue(mark)   
        setDiscountValue(discount)
        setProfitablenessValue(profitableness)
        setTransportValue(transport)
    }

    const showConfirmation = (product) => {
        setSelectRegister(product)
        setShowAlert({open:true, option:'delete'})
    }

    const closeConfirmation = () => {
        setSelectRegister(null)
        setShowAlert(!showAlert)
    }

    const handleEditChange = e => {
        const value = e.target.value
        console.log('value: ', value);
        switch (e.target.name) {
            case 'image':
                setEditProduct({image: value})
                break
            case 'name':
                setEditProduct({name: value})
                break
            case 'size':
                setEditProduct({size: value})
                break
            case 'material':
                setEditProduct({material: value})
                break
            case 'inventory':
                setEditProduct({inventory: value})
                break
            case 'colors':
                setEditProduct({inventory: value})
                break
            case 'prints':
                setEditProduct({prints: value})
                break
            case 'description':
                setEditProduct({description: value})
                break
            default: break;
        }
    }

    const handleOverProcut = (_product) => {
        if(document.getElementById(_product.id)){
            document.getElementById(_product.id).style.display = 'block'
        }
    }

    const handleOutOverProduct = (_product) => {
        if(document.getElementById(_product.id)){
            document.getElementById(_product.id).style.display = _product.prices ? 'none' :'block'
        }
    }

    return (
        <Fragment>
          <AlertDialog open={showAlert.open} option={showAlert.option} close={closeConfirmation} confirm={selectRegister ? handleRemoveProduct : clearForm} />
          {props.openCreate &&
            <form noValidate autoComplete="off" id="addProductForm" className="">
              <TextField
                id='image'
                name='image'
                label="Url imagen"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.image:null}
                onChange={editProduct && handleEditChange}
                error={errors.image}
                helperText={errors.image && 'Este campo es requerido.'}
                    // `${config.api_products}${editProduct.more_info.codigoProd}.${config.EXTENSION_IMAGE}`:
                    // ''}
                />
              <TextField
                id='name'
                name='name'
                label="Nombre"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.name:null}
                onChange={editProduct && handleEditChange}
                error={errors.name}
                helperText={errors.name && 'Este campo es requerido.'}
                />
              <TextField
                id='size'
                name='size'
                label="Medidas"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.size:null}
                onChange={editProduct && handleEditChange}
                />
              <TextField
                id='material'
                name='material'
                label="Material"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.material:null}
                onChange={editProduct && handleEditChange}
                />
              <TextField
                id='inventory'
                name='inventory'
                label="Inventario"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.inventory:null}
                onChange={editProduct && handleEditChange}
                />
              <TextField
                id='colors'
                name='colors'
                label="Colores disponibles"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.colors:null}
                onChange={editProduct && handleEditChange}
                />
              <TextField
                id='prints'
                name='prints'
                label="Tintas"
                className="col-md-3 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.prints:null}
                onChange={editProduct && handleEditChange}
                />
              <TextField
                id='cost'
                name='cost'
                label="Precio en página"
                onChange={handleChange}
                className="col-md-3 col-sm-12"
                margin="normal"
                value={costValue ? costValue:null}
                InputProps = {{
                    startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                }}
                />
              <TextField
                id='description'
                name='description'
                multiline
                rowsMax="4"
                label="Descripción"
                className="col-md-6 col-sm-12"
                margin="normal"
                value={editProduct ? editProduct.description:''}
                onChange={handleEditChange}
                />
              <TextField
                id='observation'
                name='observation'
                multiline
                rowsMax="4"
                label="Observaciones"
                className="col-md-6 col-sm-12"
                margin="normal"
                />

              <div className="sub-title-2">
                <span className="text-2">Valor por unidades</span> 
              </div>

              {props.units && props.units.map((unit, index) => (
                  <div key={index} className="row margin-component">
                      <div className="col-md-2 col-sm-12 text-center"><b>{unit} Unidades</b></div>
                      <TextField
                          id={`discount${index}`}
                          name={`discount`}
                          label="Descuento"
                          value={discountValue[index] ? discountValue[index] : ''}
                          onChange={event => handleChange(event, index)}
                          className="col-md-1 col-sm-12"
                          InputProps = {{
                              startAdornment: (<InputAdornment position="start">%</InputAdornment>)
                          }}
                      />
                      <TextField
                          id={`mark${index}`}
                          name={`mark`}
                          value={markValue[index] ? markValue[index] : ''}
                          label="Precio de marcación (Unidad)"
                          onChange={event => handleChange(event, index)}
                          className="col-md-3 col-sm-12"
                          InputProps = {{
                              startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                          }}
                      />
                      <TextField
                          id={`profitableness${index}`}
                          name={`profitableness`}
                          label="Rentabilidad"
                          value={profitablenessValue[index] ? profitablenessValue[index] : ''}
                          onChange={event => handleChange(event, index)}
                          className="col-md-1 col-sm-12"
                          InputProps = {{
                              startAdornment: (<InputAdornment position="start">%</InputAdornment>)
                          }}
                      />
                      <TextField
                          id={`transport${index}`}
                          name={`transport`}
                          label="Transporte unitario"
                          value={transportValue[index] ? transportValue[index] : ''}
                          onChange={event => handleChange(event, index)}
                          className="col-md-2 col-sm-12"
                          InputProps = {{
                              startAdornment: (<InputAdornment position="start">$</InputAdornment>)
                          }}
                      />
                      <TotalCost
                          className="col-md-4 col-sm-12"
                          transport={transportValue[index]}
                          profitableness={profitablenessValue[index]}
                          mark={markValue[index]}
                          discount={discountValue[index]}
                          cost={costValue}
                      />
                  </div>
              ))}
              <br/><br/>
              <Button color="secondary" onClick={() => setShowAlert({open:true, option:'clean'})}>
                  Limpiar
              </Button>
              <Button color="primary" href="#new-product" onClick={editProduct ? handleUpdateProduct : handleAddProduct}>
                  {editProduct ? 'Guardar producto' : 'Agregar producto'} <AddCircleIcon className="icon-size" />
              </Button>
            </form>         
          }
            {/* Ver productos */}
            <div>{products.map((product, index) => (
                <div
                  id="new-product"
                  className="add-product"
                  onMouseOver={() => handleOverProcut(product)}
                  onMouseOut={() => handleOutOverProduct(product)}
                  key={index}
                >
                    {<ProductPDF product={product} removeProduct={showConfirmation} editProduct={handleEditProduct}/>}
                </div>
                // <Product key={product} number={product} />
            ))}</div>

        </Fragment>
    )
}