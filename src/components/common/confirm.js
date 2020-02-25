import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AlertDialog(props) {
    console.log('props: ', props);
  const [optionDelete, setOptionDelete] = React.useState(props.option);

  const handleClose = () => {
    props.close(false)
  };

  const handleConfirm = () => {
      props.confirm(true)
      handleClose()
  }

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            {props.option ? 'Eliminar registro' : 'Limpiar campos'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.option ? '¿Esta seguro que desea eliminar el registro?' : '¿Esta seguro que desea limpiar los campos?'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} color="secondary" variant="contained" autoFocus>
            {props.option ? 'Eliminar' : 'Limpiar'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}