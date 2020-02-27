import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { UnitsCost } from '../make-rates/create/unitsCost';

export default function AlertDialog(props) {
  console.log('props: ', props);
  const [optionDelete, setOptionDelete] = React.useState(props.option);
  const [content, setContent] = React.useState();

  const handleClose = () => {
    props.close(false)
  };

  const handleConfirm = () => {
    props.confirm(true)
    handleClose()
  }

  const manageContent = (option) => {
    switch (option) {
      case true:
        console.log('here');
        setContent({
          ...content,
          buttonText: 'Eliminar',
          textBody: '¿Esta seguro que desea eliminar el registro?',
          textTitle: 'Eliminar registro'
        });
        break;
      case false:
        console.log('false');
        setContent({
          ...content,
          buttonText: 'Limpiar',
          textBody: '¿Esta seguro que desea limpiar los campos?',
          textTitle: 'Limpiar campos'
        });
        break;
      case 'units':
        console.log('units');
        setContent({
          ...content,
          buttonText: 'Agregar',
          textBody: 'Antes de continuar en crear cotización, debe agregar las unidades base de los productos.',
          textTitle: 'Agregar unidades'
        });
        break;
      default:
        console.log('e');
        break;
    }
  }

  React.useEffect(() => {
    console.log('yUJU');
    if (!content && props.option) {
      manageContent(props.option)
    }
  })

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {content &&
          <>
            <DialogTitle id="alert-dialog-title">
              {content.textTitle}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {content.textBody}
                {props.optionDelete === 'units' && <UnitsCost fromDialog={true} />}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancelar
          </Button>
              <Button onClick={handleConfirm} color="secondary" variant="contained" autoFocus>
                {content.buttonText}
              </Button>
            </DialogActions>
          </>
        }
      </Dialog>
    </div>
  );
}