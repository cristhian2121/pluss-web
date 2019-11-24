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




export const FormQuotation = () => {
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

  const UnitCost = ({ number }) => {
    console.log('hola', number)
    return (
      <Grid container spacing={3} >
        <Grid item md={1}>
          <TextField
            id={'unit' + number}
            name={'unit' + number}
            className=""
            label="Unidades"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id={'cost' + number}
            name={'cost' + number}
            className=""
            label="Costo"
          />
        </Grid>
        <Grid item md={1}>
          <TextField
            id={'discount' + number}
            name={'discount' + number}
            className=""
            label="% descuento"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id={'mark' + number}
            name={'mark' + number}
            className=""
            label="Marcación"
          />
        </Grid>

        {/* Segunda fila */}

        <Grid item md={1}>
          <TextField
            id={'profitableness' + number}
            name={'profitableness' + number}
            className=""
            label="% Rentabilidad"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id={'total' + number}
            name={'total' + number}
            className=""
            label="Valor de venta"
          />
        </Grid>
        <Grid item md={2}>
          <TextField
            id={'transport' + number}
            name={'transport' + number}
            className=""
            label="Transporte"
          />
        </Grid>
      </Grid>
    )
  }

  const saveQuotation = event => {
    console.log('entrooo');
    if (event) {
      event.preventDefault();
      let elements = document.getElementById('quotationForm').elements;
      let obj = {};
      for (let item of elements) {
        obj[item.name] = item.value;
      }
      console.log('obj: ', obj);
    }
    // const consecutive = document.getElementById('consecutive').value
    // const unit1 = document.getElementById('unit1').value
    // const quotationDate = document.getElementById('date-picker-inline').value
  }

  const generatePDF = () => {

  }

  return (
    <div>
      <h3>Cotizaciones</h3>
      <form id="quotationForm" onSubmit={saveQuotation}>
        <Grid container spacing={3}>
          <Grid item md={3}>
            <TextField
              id="consecutive"
              name="consecutive"
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
                name="quotationDate"
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
              name="client"
              className=""
              label="Nombre del cliente"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="clientPhone"
              name="clientPhone"
              className=""
              label="Telefóno del cliente"
              margin="normal"
            />
          </Grid>

          {/* segunda fila  */}

          <Grid item md={3}>
            <TextField
              id="user"
              name="user"
              className=""
              label="Ejecutivo de ventas"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="city"
              name="city"
              className=""
              label="Ciudad"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="deliveryTime"
              name="deliveryTime"
              className=""
              label="Tiempo de entrega"
              margin="normal"
            />
          </Grid>
          <Grid item md={3}>
            <TextField
              id="payTime"
              name="payTime"
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
            <div>{units.map(unit => <UnitCost key={unit} number={unit} />)}</div>
          </div>
        }
        <Button variant="contained" color="primary" type="submit">
          Guardar cotización
      </Button>
      </form>


      <Button variant="contained" color="primary" onClick={generatePDF}>
        Generar PDF <PictureAsPdfIcon />
      </Button>
    </div>
  );
}
