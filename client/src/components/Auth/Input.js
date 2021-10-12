import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const  Input = ({ name, label, half, autoFocus, type, handleChange, handleShowPassword }) => {
    // half prop used to modify size as needed.  if half, 6 equals 12.
    return (
        <Grid item xs={12} sm={half ? 6 : 12}>
            <TextField
                name={ name }
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                label={label}
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        // InputAdornment provides space for the "eye" icon
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {/* toggles icon visibility if there is type password (which is only in the password input on Auth.js) */}
                                {type === "password" ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    ),
                } : null}
            />
        </Grid>
    )
}

export default  Input
