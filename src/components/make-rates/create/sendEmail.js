import React from 'react';

import TextField from '@material-ui/core/TextField';

export const SendEmail = () => {

    return (
        <div className="send-email">
            <div className="send-email-form">
                <form className="">
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
                </form>
            </div>
        </div>
    )
}