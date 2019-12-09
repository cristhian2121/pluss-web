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
    const [transportValue, setTransportValue] = useState(0)
    const [profitablenessValue, setProfitablenessValue] = useState(0)
    const [markValue, setMarkValue] = useState(0)
    const [discountValue, setDiscountValue] = useState(0)
    const [costValue, setCostValue] = useState(0)

    const calculateValue = () => {

    }

    const handleAddProduct = () => {
        const product = {
            image: document.querySelector(`#image`).value,
            size: document.querySelector(`#size`).value,
            name: document.querySelector(`#name`).value,

            cost: document.querySelector(`#cost`).value,
            prints: document.querySelector(`#prints`).value,
            description: document.querySelector(`#description`).value,

            discount: document.querySelector(`#discount`).value,
            mark: document.querySelector(`#mark`).value,
            profitableness: document.querySelector(`#profitableness`).value,

            colors: document.querySelector('#colors').value,
            transport: document.querySelector('#transport').value
        }
        if (!validateProduct(product)) return
        setNewProduct(product => { return { ...product } })
        setProducts([...products, product])
        // props.handleAddProduct()
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

    const handleChange = (event) => {
        switch (event.target.name) {
            case 'discount':
                setDiscountValue(parseInt(event.target.value))
                break;
            case 'mark':
                setMarkValue(parseInt(event.target.value))
                break;
            case 'profitableness':
                setProfitablenessValue(parseInt(event.target.value))
                break;
            case 'transport':
                setTransportValue(parseInt(event.target.value))
                break
            case 'cost':
                setCostValue(parseInt(event.target.value))
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
                        onChange={handleChange}
                    />
                </Grid>
            </Grid>
            <p>Valor por unidades</p>
            <Grid container spacing={1}>
                <Grid item className="input-validation-discount">
                    <TextField
                        id='discount'
                        name='discount'
                        label="Descuento %"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item className="input-validation-mark">
                    <TextField
                        id='mark'
                        name='mark'
                        label="Marcación"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item className="input-validation-profitableness">
                    <TextField
                        id='profitableness'
                        name='profitableness'
                        label="Rentabilidad %"
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item md={2} className="input-validation-transport">
                    <TextField
                        id='transport'
                        name='transport'
                        label="Transporte"
                        onChange={handleChange}
                    />
                </Grid>
                <TotalCost
                    transport={transportValue}
                    profitableness={profitablenessValue}
                    mark={markValue}
                    discount={discountValue}
                    cost={costValue}
                />
            </Grid>
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