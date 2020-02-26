import React from 'react';

// Material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


export const SendEmail = (props) => {

    const sendEmail = () => {
        let data = generateData()
        data.status = "Finalizado"

        props.sendEmail(data)
    }

    const generateData = () => {
        let elements = document.getElementById('form-send-email').elements;
        let data = {};
        console.log('dataform', elements)
        for (let item of elements) {
          data[item.name] = item.value;
        }
        return data
      }

    return (
        <div className="create-update">
            <div className="create-update-form">
                <div className="title-modal">
                    Enviar cotización
                </div>
                <form id="form-send-email">
                    <TextField
                        id="subject"
                        name="subject"
                        label="Asunto"
                        margin="normal"
                        className="col-md-6 col-xs-12"
                        />
                    <TextField
                        id="send_copy"
                        name="send_copy"
                        label="Enviar copia"
                        margin="normal"
                        className="col-md-6 col-xs-12"
                        />
                    <TextField
                        id='message'
                        name='message'
                        multiline
                        rowsMax="4"
                        label="Observaciones"
                        className="col-md-12 col-xs-12"
                        margin="normal"
                    />
                    <div className="col-12 px-0 d-flex justify-content-end container-button">
                        <Button variant="contained" onClick={() => props.cancelEmail(false)}>
                            Cancelar
                        </Button>
                        <Button variant="contained" color="secondary" onClick={sendEmail} >
                            Enviar cotización
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}