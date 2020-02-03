import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

export const UnitsCost = (props) => {

    const [units, setUnits] = useState(() => props.preUnits || [])

    const handleAddUnits = () => {
        const $unit = document.querySelector(`#unit`)
        if ($unit) {
            const unit = $unit.value
            const _units = [...units, unit]
            setUnits(units => [...units, unit]);
            props.handleAddUnit(_units)
            document.querySelector(`#unit`).value = ''
        }
    }

    const handleDelete = unitToDelete => () => {
      let del = units.indexOf(unitToDelete)
      if (del !== -1) {
        units.splice(del, 1)
        props.handleAddUnit(units)
      }
    };

    return (
        <div className="row">  
            <div className="col-md-3 col-xs-11">
                <TextField
                    id={'unit'}
                    name={'unit'}
                    label="Unidades"
                />
                <Button className="button-more-units" onClick={handleAddUnits}>
                    <AddCircleIcon />
                </Button>
            </div>
            {/* Mostrar unidades */}
            <div className="col-md-8 col-xs-10 margin-component">
                {units.map(unit => (
                    <Chip
                        key={unit}
                        label={unit}
                        onDelete={handleDelete(unit)}
                        color="primary"
                        variant="outlined"
                    />
                    // <span key={unit} style={{ paddingRight: '1em' }}>{unit},</span>
                ))}
            </div>
        </div>
    )
}
