import React, { useState } from "react";
import Logo from '../../../static/logo_pop_litle.png'
import '../../../styles/pdf.css'

export const GeneratePDF = () => {
    return (
        <div>
            <div className="header-pdf">
                <img src={Logo} className="image-logo-pdf" />
            </div>

            <div className="bar-head"></div>
            <div className="quotation-title">Cotización</div>
            <div className="bar-head"></div>

            <div className="cliente-information">
                <div className="row">
                    <div className="column">
                        <p>EPM S.A.S</p>
                        <p>calle 37 a # 88 - 26</p>
                        <p>Medellin</p>
                        <p>+034 7462382</p>
                    </div>
                    <div className="column">
                        <p>No. Factura: <span>1223455</span></p>
                        <p>Fecha: <span>25-11-2019</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}



