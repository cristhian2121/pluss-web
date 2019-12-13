import React from 'react'
import '../../../styles/pdf.css'

export const ProductPDF = ({ product }) => {
    return (
        <div className="product-section-pdf col-12 px-0">
            <div className="col-4 px-0 product-pdf">
                <img src={product.image} className="product-image-pdf img-fluid" />
            </div>
            <div className="col-4 px-0">
                <p className="name-product">{product.name}</p>
                <p className="text-justify-pdf">{product.description}</p>
                <div className="text-descriptionPDF">
                    <p><span>Material: </span>{product.size}</p>
                    <p><span>Medidas: </span>{product.size}</p>
                    <p><span>Colores: </span>{product.colors}</p>
                    <p className="prints-pdf">{product.prints}</p>
                </div>
            </div>
            <div className="col-4 px-1">
                <div className="col-12 px-0">
                    <p>{product.prints}</p>
                    <div className="sub-title-pdf">Unidades y Precio</div>
                </div>
                {product.units.map((unit, index) => (
                    <div className="col-12 px-0" key={index}>
                        <p><span>{unit}</span> - ${product.prices[index]} /U</p>
                    </div>
                ))}
                <div className="col-12 pl-2">
                    <div className="sub-title-pdf">Personalizaciòn</div>
                </div>
                <div className="col-12 px-0">
                    <p><span>1 Logo, 1 tinta, 1 Cara,/ Tampografia con tratamiento</span></p>
                </div>

            </div>
        </div>
    )
}


