import React from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export const Alert = (message, open) => {
    console.log('message', message, open)

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //       return;
    //     }
    //     setOpen(false);
    // };
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={3000}
                // onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                // variant="success"
                message={message}
                // action={[
                //     <Button key="undo" color="secondary" size="small" onClick={handleClose}></Button>,
                //     <IconButton
                //         key="close"
                //         aria-label="close"
                //         color="inherit"
                //         onClick={handleClose}
                //     >
                //     <CloseIcon />
                //     </IconButton>,
                // ]}
            />
        </div>
    )
}

