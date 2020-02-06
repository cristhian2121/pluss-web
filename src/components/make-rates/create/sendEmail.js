import React from 'react';

// Material
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export const SendEmail = (props) => {

    return (
        <div className="send-email">
            <div className="send-email-form">
                <form className="">
                    <div className="title">
                        Enviar cotización
                    </div>
                    <TextField
                        id="subject"
                        name="subject"
                        label="Asunto"
                        margin="normal"
                        className="col-md-6 col-xs-12"
                        />
                    <TextField
                        id="send-copy"
                        name="send-copy"
                        label="Enviar copia"
                        margin="normal"
                        className="col-md-6 col-xs-12"
                        />
                    <TextField
                        id='observation'
                        name='observation'
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
                        <Button variant="contained" color="secondary" onClick={() => props.sendEmail("Finalizado")} >
                            Enviar cotización
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}