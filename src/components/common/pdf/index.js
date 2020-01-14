import React, { useState, useReducer } from "react";
import Logo from '../../../static/logo_pop_litle.png'
import conf from '../../../config'

// Components
import { ProductPDF } from './productPDF'

// redux 
import { connect } from 'react-redux'

import * as quotationActions from '../../../actions/quotationActions'

const buildUnits = (quotation) => {
    const keys = Object.keys(quotation);
    const unitsNumber = keys.filter(_ => !_.indexOf('cost'));
    const units = [];
    for (let index in unitsNumber) {
        index = parseInt(index)
        units.push({
            number: quotation[`unit${index + 1}`],
            unit: quotation[`cost${index + 1}`]
        })
    }
    return units
}

const printPDF = () => {
    window.print()
    return true
}

const getQuotationSession = () => {
    const dataString = sessionStorage.getItem('quotation');
    return JSON.parse(dataString);
}

export const GeneratePDFHook = (props) => {
    const [unitsCost, setUnitsCost] = useState([])
    const [quotation, SetQuotation] = useState()
    const data = getQuotationSession()
    !quotation && SetQuotation(data)
    if (!unitsCost.length) {
        const units = buildUnits(data)
        if (units.length) {
            setUnitsCost(units);
        }
    }
    return (
        <div>
            {quotation && <div className="container-pdf">
                <section>
                    <div className="header-pdf col-12 d-flex">
                        <div className="col-6 text-descripcion">
                            <p>Medellín, {quotation.quotationDate}</p><br />
                            <p>Señores:</p>
                            <p><span>{quotation.client.name.charAt(0).toUpperCase() + quotation.client.name.slice(1).toLowerCase()}</span></p>
                            <p>calle 37 a # 88 - 26</p>
                            <p>email. {quotation.client.phone}</p>
                            <p>tel. {quotation.client.phone}</p>
                            <p>{quotation.city}</p>

                        </div>

                        <div className="col-3 px-0 text-descripcion">
                            <br />
                            <p><span>Cotización N° {quotation.consecutive}</span></p>
                        </div>
                        <div className="col-3 px-0">
                            <img src={Logo} onClick={printPDF} className="image-logo-pdf" />
                        </div>

                    </div>

                    <div className="col-12 px-0 d-flex">
                        <div className="col-12 px-0 bar-head"></div>
                        {/* <div className="col-2 px-0 d-flex justify-content-end">
                            <div>Cotización</div>
                        </div>
                        <div className="col-3 px-0 bar-head"></div> */}

                    </div>
                    {/* <div className="bar-head" style={{ backgroundColor: "#ff0000" }}>
                        <div className="quotation-title">Cotización</div>
                    </div> */}


                </section>

                <section>
                    {quotation.products.map(product =>
                        <ProductPDF product={product} />
                    )}
                </section><br /><br />
                <hr />
                <section className="floor-pdf">
                    <div className="col-12 px-0 d-flex text-descripcion">
                        <div className="col-1 px-0"></div>
                        <div className="col-5 px-0">
                            <div className="sub-title-pdf text-center">Términos y condiciones</div><br />
                            <p>Precios por unidad</p>
                            <p>Sujeto a disponibilidad en el momento de enviar la orden de compra</p>
                            <p>Los precios no incluyen iva</p>
                            <p>Entrega en sus oficinas en Medellín</p>
                            <p>Forma de pago: 30 días</p>
                            <p>Tiempo de entrega: 8 a 15 días hábiles</p>
                            <p>El Logo será suministrado por el cliente en COREL o ILLUSTRATOR convertido a curvas.</p>
                            <p><b>Nota:</b> productos de tecnología tienen 8 días para reposición y para los demás productos 30 días.</p>
                        </div>
                        <div className="col-2 px-0"></div>
                        <div className="col-2 px-0">
                            <div className="sub-title-pdf text-center">Información de contacto</div><br />
                            <p>Cristina Tobon</p>
                            <p>Ventas</p>
                            <p>PLUSS P.O.P S.A.S</p>
                            <p>Cel: 312 310 6719</p>
                        </div>
                    </div><br />
                </section>
            </div>}
        </div>
    )
}

const mapStateToProps = (reducers) => {
    console.log('reducers.quotationReducer: ', reducers.quotationReducer);
    return reducers.quotationReducer;
};

const GeneratePDF = connect(mapStateToProps, quotationActions)(GeneratePDFHook);
export {
    GeneratePDF
}

