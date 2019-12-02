import React from 'react'
import '../../../styles/pdf.css'

export const ProductPDF = product => {
    return (
        <div className="product-section-pdf row">
            <div className="column product-pdf">
                <img src={product.image} className="product-image-pdf" />
            </div>
            <div className="column">
                <div className="sub-title-pdf">{product.name}</div>
                <p><span>Descripción: </span>{product.descripcion}</p>
                <p><span>Medidas: </span>{product.size}</p>
                <div className="quote-delivery">
                    <p style={{ marginBottom: "0px" }}>Por:</p>
                    {product.unitsCost.map((unit, index) => (
                        <p key={index}><span>{unit.number}</span> <b>Unidades</b> ${unit.price}</p>
                    ))}
                </div>
            </div>
        </div>
    )
}


