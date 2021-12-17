import { Button } from "@mui/material";
import React from 'react';
function ButtonComponent(props) {
    return ( 
        <Button type={props.type} onClick={props.onClick} variant="contained">{props.text}</Button>
     );
    
}

export default ButtonComponent;