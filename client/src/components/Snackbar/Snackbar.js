import React from 'react';
import { Snackbar } from '@material-ui/core';

const SnackBar = ({message, vertical, horizontal, open, handleclose})=>{
    return (
        <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleclose}
        message={message}
      />
    );
}

export default SnackBar;