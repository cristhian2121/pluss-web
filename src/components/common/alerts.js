import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export const Aler = (open) => {
    console.log('messagessssssssssss', open)
    // const [opens, setOpen] = React.useState(false);
    let show = false;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        open = false
    }

    return (
        <div>
            {console.log('eeeeeeeeeeeeeeeeeeeee', open.open)}
            <Snackbar
                anchorOrigin= {{ vertical: 'bottom', horizontal: 'left' }}
                open={open.open}
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

