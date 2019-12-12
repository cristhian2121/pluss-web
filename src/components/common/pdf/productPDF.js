import React from 'react'
import '../../../styles/pdf.css'

export const ProductPDF = ({ product }) => {
    return (
        <div className="product-section-pdf row">
            <div className="column product-pdf">
                <img src={product.image} className="product-image-pdf" />
            </div>
            <div className="column">
                <div className="sub-title-pdf">{product.name}</div>
                <p><span>Descripción: </span>{product.description}</p>
                <p><span>Medidas: </span>{product.size}</p>
            </div>
            <div className="column">
                <div className="row">
                    <div className="text-descripcion span">Unidades y Precio</div>
                </div>
                {product.units.map((unit, index) => (
                    <div className="row" key={index}>
                        <p><span>{unit}</span> $ {product.prices[index]}/U</p>
                    </div>
                ))}
                <div className="row">
                    <div className="text-descripcion span">Personalizaciòn</div>
                </div>
                <div className="row">
                    <p><span>1 Logo, 1 tinta, 1 Cara,/ Tampografia con tratamiento</span></p>
                </div>

            </div>
        </div>
    )
}


