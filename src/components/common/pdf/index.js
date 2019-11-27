import React, { useState } from "react";
import Logo from '../../../static/logo_pop_litle.png'
import '../../../styles/pdf.css'

export const GeneratePDF = () => {
    return (
        <div className="container-pdf">
            <section>
                <div className="header-pdf">
                    <img src={Logo} className="image-logo-pdf" />
                </div>

                <div className="bar-head" style={{ backgroundColor: "#ff0000" }}>
                    <div className="quotation-title">Cotización</div>
                </div>

                <div className="cliente-information">
                    <div className="row">
                        <div className="column text-descripcion">
                            <p>EPM S.A.S</p>
                            <p>calle 37 a # 88 - 26</p>
                            <p>Medellin</p>
                            <p>+034 7462382</p>
                        </div>
                        <div className="column text-descripcion">
                            <p>No. Factura: <span>1223455</span></p>
                            <p>Fecha: <span>25-11-2019</span></p>
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
                        <p><spam>Descripción: </spam>Mouse plástico inalámbrico. Conexión automática mediante
                             transmisor USB incluido. 2 Pilas AAA (no incluidas).</p>
                        <p><spam>Medidas: </spam>11 cm x 5.8 cm x 2 cm</p>
                    </div>
                </div>
                <div className="product-section-pdf row">
                    <div className="column product-pdf">
                        <img src="http://www.prototipo.co/images/Noticias-2017/souvenirs-empresariales-y-su-importancia-4.jpg" className="product-image-pdf" />
                    </div>
                    <div className="column">
                        <div className="sub-title-pdf">Mause Inalambrico</div>
                        <p><spam>Descripción: </spam>Vaso plástico con tapa y protector en silicona.
                        Encaja en la mayoría de porta vasos de los autos. En PP Libre de BPA,
                         ftalatos u otras sustancias nocivas. No retiene ni transmite sabores u olores.
                          Capacidad 356 ml / 12 Oz</p>
                        <p><spam>Medidas: </spam>11 cm x 5.8 cm x 2 cm</p>
                        <div className="quote-delivery">
                            <p style={{marginBottom: "0px"}}>Por:</p>
                            <p><span>100</span> <b>Unidades</b> $500</p>
                            <p><span>300</span> <b>Unidades</b> $20.000</p>
                            <p><span>500</span> <b>Unidades</b> $1.500</p>
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
    )
}



