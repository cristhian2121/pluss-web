import React, { useState, useReducer } from "react";
import Logo from '../../../static/logo_pop_litle.png'

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
    // const $html = document.querySelector('.container-pdf').innerHTML
    // const mywindow = window.open('', 'Print', 'height=800,width=800');

    // mywindow.document.write('<html><head><title>Print</title>');
    // mywindow.document.write('</head><body >');
    // mywindow.document.write($html);
    // mywindow.document.write('</body></html>')

    // mywindow.document.close();
    // mywindow.focus()
    // mywindow.print();
    // mywindow.close();
    return true
}

export const GeneratePDFHook = (props) => {
    const [unitsCost, setUnitsCost] = useState([])
    if (!unitsCost.length) {
        const units = buildUnits(props.quotation)
        if (units.length) {
            setUnitsCost(units);
        }
    }
    const $navBar = document.querySelector('#nav-var-pluss')
    $navBar.style.visibility = 'collapse'
    console.log('props: ', props);
    return (
        <div>
            <div className="container-pdf">
                <section>
                    <div className="header-pdf">
                        <img src={Logo} onClick={printPDF} className="image-logo-pdf" />
                    </div>
                    <div className="bar-head" style={{ backgroundColor: "#ff0000" }}>
                        <div className="quotation-title">Cotización</div>
                    </div>

                    <div className="cliente-information">
                        <div className="row">
                            <div className="column text-descripcion">
                                <p>{props.quotation.client}</p>
                                <p>calle 37 a # 88 - 26</p>
                                <p>{props.quotation.city}</p>
                                <p>{props.quotation.clientPhone}</p>
                            </div>
                            <div className="column text-descripcion">
                                <p>No. Factura: <span>{props.quotation.consecutive}</span></p>
                                <p>Fecha: <span>{props.quotation.quotationDate}</span></p>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    {props.quotation.products.map(product => (
                        ProductPDF(product)
                    ))}
                </section>
                <hr />
                <section className="floor-pdf">
                    <div className="row text-descripcion">
                        <div className="column">
                            <div className="sub-title-pdf">Terminos y condiciones</div>
                            <p>- Precios por unidad</p>
                            <p>- Sujeto a disponibilidad en el momento de enviar la orden de compra</p>
                            <p>- Los precios no incluyen iva</p>
                            <p>- Entrega en sus oficinas en Medellín</p>
                            <p>- Forma de pago:  30 dias</p>
                            <p>- Tiempo de entrega: 8 a 15 días hábiles</p>
                            <p>- El Logo será suministrado por el cliente en COREL o ILLUSTRATOR convertido a curvas.</p>
                        </div>
                        <div className="column">
                            <div className="sub-title-pdf">Información de contacto</div>
                            <p>Cristina Tobon</p>
                            <p>Ventas</p>
                            <p>PLUSS P.O.P S.A.S</p>
                            <p>Cel: 312 310 6719</p>
                        </div>
                    </div>
                    <p><b>Nota:</b> productos de tecnología tienen 8 días para reposición y para los demás productos 30 días.</p>


                </section>
            </div>
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

