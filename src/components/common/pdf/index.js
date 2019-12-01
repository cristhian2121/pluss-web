import React, { useState, useReducer } from "react";
import Logo from '../../../static/logo_pop_litle.png'
import '../../../styles/pdf.css'

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
                    <div className="product-section-pdf row">
                        <div className="column product-pdf">
                            <img src="https://http2.mlstatic.com/logitech-wireless-mouse-m170-a-gris-D_NQ_NP_823839-MCO31539178210_072019-O.webp" className="product-image-pdf" />
                        </div>
                        <div className="column">
                            <div className="sub-title-pdf">Mause Inalambrico</div>
                            <p><span>Descripción: </span>Mouse plástico inalámbrico. Conexión automática mediante
                             transmisor USB incluido. 2 Pilas AAA (no incluidas).</p>
                            <p><span>Medidas: </span>11 cm x 5.8 cm x 2 cm</p>
                        </div>
                    </div>
                    <div className="product-section-pdf row">
                        <div className="column product-pdf">
                            <img src="http://www.prototipo.co/images/Noticias-2017/souvenirs-empresariales-y-su-importancia-4.jpg" className="product-image-pdf" />
                        </div>
                        <div className="column">
                            <div className="sub-title-pdf">Mause Inalambrico</div>
                            <p><span>Descripción: </span>Vaso plástico con tapa y protector en silicona.
                            Encaja en la mayoría de porta vasos de los autos. En PP Libre de BPA,
                             ftalatos u otras sustancias nocivas. No retiene ni transmite sabores u olores.
                          Capacidad 356 ml / 12 Oz</p>
                            <p><span>Medidas: </span>11 cm x 5.8 cm x 2 cm</p>
                            <div className="quote-delivery">
                                <p style={{ marginBottom: "0px" }}>Por:</p>
                                {unitsCost.map((unit, index) => (
                                    <p key={index}><span>{unit.number}</span> <b>Unidades</b> ${unit.price}</p>
                                ))}
                            </div>

                        </div>
                    </div>
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

