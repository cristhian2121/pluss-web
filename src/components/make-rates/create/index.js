import React, { useState } from "react";

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

// Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandMore';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import AddCircleIcon from '@material-ui/icons/AddCircle';





// css
import '../../../styles/commons.css';




export const CreateMakeRate = () => {
  //   constructor() {}
  const [showUnitForm, setshowUnitForm] = useState(false);
  const [units, setunits] = useState([])

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const showUnits = () => {
    console.log('show', showUnitForm)
    setshowUnitForm(!showUnitForm)
  }

  const UnitCost = ({number}) => {
    console.log('hola', number)
    return (
      <Grid container spacing={3} >
        <Grid item md={1}>
          <TextField
            id={'unit' + number}
            className=""
            label="Unidades"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id={'cost' + number}
            className=""
            label="Costo"
          />
        </Grid>
        <Grid item md={1}>
          <TextField
            id="discount"
            className=""
            label="% descuento"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="discount"
            className=""
            label="Marcasión"
          />
        </Grid>

        {/* Segunda fila */}

        <Grid item md={1}>
          <TextField
            id="discount"
            className=""
            label="% Rentabilidad"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="discount"
            className=""
            label="Valor de venta"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id="discount"
            className=""
            label="Transporte"
          />
        </Grid>
      </Grid>
    )
  }

  const saveQuotation = () => {
    const consecutive = document.getElementById('consecutive').value
    const unit1 = document.getElementById('unit1').value
    console.log(unit1)
    console.log(consecutive)
  }

  return (
    <div>
      <h3>Cotizaciones</h3>

      <Grid container spacing={3}>
        <Grid item md={3}>
          <TextField
            id="consecutive"
            className=""
            label="Cosecutivo"
            margin="normal"
          />
        </Grid>
        <Grid item md={3}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Fecha de cotización"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item md={3}>
          <TextField
            id="client"
            className=""
            label="Nombre del cliente"
            margin="normal"
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            id="clientPhone"
            className=""
            label="Telefóno del cliente"
            margin="normal"
          />
        </Grid>

        {/* segunda fila  */}

        <Grid item md={3}>
          <TextField
            id="user"
            className=""
            label="Ejecutivo de ventas"
            margin="normal"
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            id="city"
            className=""
            label="Ciudad"
            margin="normal"
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            id="deliveryTime"
            className=""
            label="Tiempo de entrega"
            margin="normal"
          />
        </Grid>
        <Grid item md={3}>
          <TextField
            id="payTime"
            className=""
            label="Formato de pago"
            margin="normal"
          />
        </Grid>
        {/* fila 3 */}
      </Grid>

      <div className="text-expand"><span onClick={showUnits}> Unidades {showUnitForm ? <ExpandLessIcon /> : <ExpandMoreIcon />}</span>
      </div>
      {showUnitForm &&
        <div className="container-padding">
          <Button onClick={() => setunits([...units, units.length + 1])}>Agregar Unidades  <AddCircleIcon /></Button>
          <div>{units.map(unit => <UnitCost key={unit} number={unit}/>)}</div>
        </div>
      }
      <Button variant="contained" color="primary" onClick={saveQuotation}>
        Guardar cotización
      </Button>
      <Button variant="contained" color="primary" onClick="">
        Generar PDF <PictureAsPdfIcon />
      </Button>
    </div>
  );
}
