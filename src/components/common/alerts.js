import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';


export const Aler = (open) => {
    console.log('messagessssssssssss', open)
    // const [open, setOpen] = React.useState(true);
    let show = false;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        open = false
    }

    return (
        <div>
            {console.log('eeeeeeeeeeeeeeeeeeeee', open)}
            <Snackbar
                anchorOrigin= {{ vertical: 'bottom', horizontal: 'left' }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
            >
                <Alert onClose={handleClose} severity="success">aaaaaaaaayyyyyyyyyyyaaaaaaaaaa</Alert>
            </Snackbar>
        
        </div>
    )
}

