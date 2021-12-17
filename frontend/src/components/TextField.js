import { TextField } from "@mui/material";
import React from 'react';
function TextFieldComponent(props) {
    return ( 
        <TextField onChange={props.onChange} type={props.type} sx={{m: 2}} name={props.name} label={props.label} variant="outlined"></TextField>
     );
}

export default TextFieldComponent;