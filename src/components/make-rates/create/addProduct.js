import React, { useState, Fragment } from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

// Components
import { ProductPDF } from '../../common/pdf/productPDF'
import { TotalCost } from './totalCost'


export const ProductForm = (props) => {

    const [products, setProducts] = useState([])
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

    return (
        <Fragment>
            <Grid container spacing={1} >
                <Grid item md={3} className="input-validation-image">
                    <TextField
                        id='image'
                        name='image'
                        label="Url imagen"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-name">
                    <TextField
                        id='name'
                        name='name'
                        label="Nombre"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-size">
                    <TextField
                        id='size'
                        name='size'
                        label="Medidas"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-colors">
                    <TextField
                        id='colors'
                        name='colors'
                        label="Colores disponibles"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-prints">
                    <TextField
                        id='prints'
                        name='prints'
                        label="tintas"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-description">
                    <TextField
                        id='description'
                        name='description'
                        multiline
                        rowsMax="4"
                        label="Descripción"
                    />
                </Grid>
                <Grid item md={3} className="input-validation-cost">
                    <TextField
                        id='cost'
                        name='cost'
                        label="Precio en pagina"
                        onChange={event => handleChange(event, 0)}
                    />
                </Grid>
            </Grid>
            <p>Valor por unidades</p>
            {props.units.map((unit, index) => (
                <Grid container spacing={1} key={index}>
                    <span>{unit} Unidades</span>
                    <Grid item className="input-validation-discount">
                        <TextField
                            id={`discount${index}`}
                            name={`discount`}
                            label="Descuento %"
                            onChange={event => handleChange(event, index)}
                        />
                    </Grid>
                    <Grid item className="input-validation-mark">
                        <TextField
                            id={`mark${index}`}
                            name={`mark`}
                            label="Marcación"
                            onChange={event => handleChange(event, index)}
                        />
                    </Grid>
                    <Grid item className="input-validation-profitableness">
                        <TextField
                            id={`profitableness${index}`}
                            name={`profitableness`}
                            label="Rentabilidad %"
                            onChange={event => handleChange(event, index)}
                        />
                    </Grid>
                    <Grid item md={2} className="input-validation-transport">
                        <TextField
                            id={`transport${index}`}
                            name={`transport`}
                            label="Transporte"
                            onChange={event => handleChange(event, index)}
                        />
                    </Grid>
                    <TotalCost
                        transport={transportValue[index]}
                        profitableness={profitablenessValue[index]}
                        mark={markValue[index]}
                        discount={discountValue[index]}
                        cost={costValue}
                    />
                </Grid>
            ))}
            <Button color="primary" onClick={handleAddProduct}>
                Agregar <AddCircleIcon />
            </Button>

            {/* Ver productos */}
            <div>{products.map((product, index) => (
                <div key={index}>
                    {<ProductPDF product={product} />}
                </div>
                // <Product key={product} number={product} />
            ))}</div>


        </Fragment>
    )
}