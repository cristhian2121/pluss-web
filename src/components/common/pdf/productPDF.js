import React from 'react'
import '../../../styles/pdf.css'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


export const ProductPDF = ({ product, removeProduct }) => {

    const formatCurrency = new Intl.NumberFormat('es-Co', {//"de-DE"
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    })

    return (
        <><br/><div className="product-section-pdf col-12 px-0">
            <div className="action-add-product">
                <div className="delete-product">
                    {/* <Fab color="secondary" aria-label="edit">
                        <EditIcon />
                    </Fab> */}
                    <Fab color="primary" aria-label="edit" onClick={() => removeProduct(product)} >
                        <DeleteIcon />
                    </Fab>
                </div>
            </div>

            <div className="col-4 product-pdf">
                <img src={product.image} className="product-image-pdf img-fluid"
                    height="auto" width="300px" />
            </div>
            <div className="col-8 px-1">
                <div className="col-12 text-center px-1">
                    <Table aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                            {product.units.map((unit) => (
                            <TableCell>{unit} Und</TableCell>
                            ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key=''>
                            {product.units.map((unit, index) => (
                                <TableCell component="th" scope="row">
                                  {formatCurrency.format(product.prices[index])}
                                {/* $ {product.prices[index]} */}
                                </TableCell>
                            ))}
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* <div className="col-12 px-0">
                        <div className="sub-title-pdf">Unidades y Precio</div>
                    </div>
                    {product.units.map((unit, index) => (
                        <div className="col-12 px-0" key={index}>
                            <p><span>{unit}</span> - ${product.prices[index]} /U</p>
                        </div>
                    ))} */}
                    {/* <div className="col-12 px-0">
                        <div className="sub-title-pdf">Personalizaciòn</div>
                    </div>
                    <div className="col-12 px-0">
                        <p>{product.prints}</p>
                    </div> */}

                </div><br/>
                <div className="col-12 text-center">
                    <p className="name-product">{product.name.charAt(0).toUpperCase() + product.name.slice(1).toLowerCase()}</p>
                    <p style={{textAlign: "justify"}}>{product.description}</p>
                    <div className="text-descriptionPDF" style={{textAlign: "justify"}}>
                        <p><span>Material: </span>{product.material}</p>
                        <p><span>Medidas: </span>{product.size}</p>
                        <p><span>Colores: </span>{product.colors}</p>
                        <p><span>Perzonalización: </span>{product.prints}</p>
                        <p><span>Inventario: </span>{product.inventory}</p>
                    </div>
                </div>
            </div>
        </div></>
    )
}


