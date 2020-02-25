import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Chip from '@material-ui/core/Chip';

export const UnitsCost = (props) => {
    console.log('props: ', props);

    const [units, setUnits] = useState(() => props.preUnits || [])
    const [oblUnit, setOblUnit] = useState(false)

    const handleAddUnits = () => {
        const $unit = document.querySelector(`#unit`)
        console.log('$unit: ', $unit.value);

        if ($unit.value) {
            const unit = $unit.value
            const _units = [...units, unit]
            setUnits(units => [...units, unit]);
            props.handleAddUnit(_units)
            document.querySelector(`#unit`).value = ''
        }else {
            setOblUnit(true)
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
        <div className="row form-units">  
            <div className="col-md-4 col-xs-12">
                <TextField
                    id={'unit'}
                    name={'unit'}
                    label="Unidades"
                    className="col-md-10 col-xs-10"
                />
                {oblUnit &&
                    <div class="lbl-error" >
                        Debe ingresar una unidad válida.
                    </div>
                }
                <Button className="col-md-2 col-xs-2 button-more-units" onClick={handleAddUnits}>
                    <AddCircleIcon />
                </Button>
            </div>
            {/* Mostrar unidades */}
            <div className="col-md-8 col-xs-12 margin-component">
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
