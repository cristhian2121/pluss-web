import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';

export const UnitsCost = () => {


    const [units, setUnits] = useState([])

    const handleAddUnits = () => {
        const $unit = document.querySelector(`#unit`)
        if ($unit) {
            const unit = $unit.value
            setUnits(units => [...units, unit]);
        }
    }

    return (
        <>
            <Grid container spacing={3} >
                <Grid item md={2} className="unit">
                    <TextField
                        id={'unit'}
                        name={'unit'}
                        className=""
                        label="Unidades"
                    />
                </Grid>
                <Grid item md={2}>
                    <Button color="primary" onClick={handleAddUnits}>
                        Agregar <AddCircleIcon />
                    </Button>
                </Grid>
            </Grid>

            <div>
                {units.map(unit => (
                    <span style={{ paddingRight: '1em' }}>{unit},</span>
                ))}
            </div>
        </>
    )
}
