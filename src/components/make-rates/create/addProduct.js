import React, { useState, Fragment } from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Components
import { ProductPDF } from '../../common/pdf/productPDF'
import { TotalCost } from './totalCost'


export const ProductForm = (props) => {
    console.log('props aaaaaaa: ', props);

    const [products, setProducts] = useState(props.productsE ? props.productsE : [])
    const [newProduct, setNewProduct] = useState({})
    const [transportValue, setTransportValue] = useState([])
    const [profitablenessValue, setProfitablenessValue] = useState([])
    const [markValue, setMarkValue] = useState([])
    const [discountValue, setDiscountValue] = useState([])
    const [costValue, setCostValue] = useState(0)

    const calculateValue = () => {

    }

    const handleAddProduct = () => {
        const product = buildProduct()
        // if (!validateProduct(product)) return
        setNewProduct(product => { return { ...product } })
        setProducts([...products, product])
        props.addProduct(product)

        clearForm()
    }

    const clearForm = () => {
        document.getElementById("addProductForm").reset()
        // TotalCost([],[],[],[],[])
        setMarkValue([])
        setDiscountValue([])
        setProfitablenessValue([])
        setTransportValue([])
        setCostValue([])
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

    const handleChange = (event, index) => {
        console.log('event.target.name: ', event.target.name);
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
                break;
            default: break;
        }
    }

    const handleRemoveProduct = (product) => {
        let productss = products.filter(item => item != product)
        setProducts(productss)
        props.removeProduct(product)  
    }

    return (
        <Fragment>
          <form noValidate autoComplete="off" id="addProductForm" className="">
            <TextField
                id='image'
                name='image'
                label="Url imagen"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='name'
                name='name'
                label="Nombre"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='size'
                name='size'
                label="Medidas"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='material'
                name='material'
                label="Material"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='inventory'
                name='inventory'
                label="Inventario"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='colors'
                name='colors'
                label="Colores disponibles"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='prints'
                name='prints'
                label="Tintas"
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='cost'
                name='cost'
                label="Precio en página"
                onChange={event => handleChange(event, 0)}
                className="col-md-3 col-xs-12"
                margin="normal"
            />
            <TextField
                id='description'
                name='description'
                multiline
                rowsMax="4"
                label="Descripción"
                className="col-md-6 col-xs-12"
                margin="normal"
            />
            <TextField
                id='observation'
                name='observation'
                multiline
                rowsMax="4"
                label="Observaciones"
                className="col-md-6 col-xs-12"
                margin="normal"
            />

            <div className="sub-title-2">
                <span className="text-2">Valor por unidades</span> 
            </div>

            {props.units.map((unit, index) => (
                <div key={index} className="row margin-component">
                    <div className="col-md-2 col-xs-12 text-center"><b>{unit} Unidades</b></div>
                    <TextField
                        id={`discount${index}`}
                        name={`discount`}
                        label="% Descuento"
                        onChange={event => handleChange(event, index)}
                        className="col-md-1 col-xs-12"
                    />
                    <TextField
                        id={`mark${index}`}
                        name={`mark`}
                        label="Precio de marcación (Unidad)"
                        onChange={event => handleChange(event, index)}
                        className="col-md-3 col-xs-12"
                    />
                    <TextField
                        id={`profitableness${index}`}
                        name={`profitableness`}
                        label="% Rentabilidad"
                        onChange={event => handleChange(event, index)}
                        className="col-md-2 col-xs-12"
                    />
                    <TextField
                        id={`transport${index}`}
                        name={`transport`}
                        label="Transporte unitario"
                        onChange={event => handleChange(event, index)}
                        className="col-md-2 col-xs-12"
                    />
                    <TotalCost
                        className="col-md-3 col-xs-12"
                        transport={transportValue[index]}
                        profitableness={profitablenessValue[index]}
                        mark={markValue[index]}
                        discount={discountValue[index]}
                        cost={costValue}
                    />
                </div>
            ))}
            <br/><br/>
            <Button color="secondary" onClick={clearForm}>
                Limpiar
            </Button>
            <Button color="primary" href="#new-product" onClick={handleAddProduct}>
                Agregar producto <AddCircleIcon />
            </Button>
          </form>

            {/* Ver productos */}
            <div>{products.map((product, index) => (
                <div id="new-product" className="add-product" key={index}>
                    {<ProductPDF product={product} removeProduct={handleRemoveProduct}/>}
                </div>
                // <Product key={product} number={product} />
            ))}</div>

        </Fragment>
    )
}