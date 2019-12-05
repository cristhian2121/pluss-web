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
                <p><span>Descripción: </span>{product.description}</p>
                <p><span>Medidas: </span>{product.size}</p>
            </div>
            <div className="column">
                <div className="row">
                    <div className="text-descripcion span">Unidades y Precio</div>
                </div>
                <div className="row">
                    <p><span>900 por</span> $5.000/U</p>
                </div>
                <div className="row">
                    <p><span>600 por</span> $7.600/U</p>
                </div>
                <div className="row">
                    <p><span>400 por</span> $8.300/U</p>
                </div>
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


