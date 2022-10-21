import { Alert, Button, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { FC, useState } from "react";

export const CustomSnackbar: FC<CustomSnackbarPropsType> = ({ message, isOpen, onClose }) => {

   const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
         return;
      }

      onClose()
   };

   return (
      <Stack spacing={2} sx={{ width: '100%' }}>
         <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose} style={{ left: '50%', transform: ' translateX(-50%)' }}>
            <Alert onClose={handleClose} severity="info" >
               {message}
            </Alert>
         </Snackbar>
      </Stack>
   );
}
type CustomSnackbarPropsType = {
   message: string
   isOpen: boolean
   onClose: () => void
}