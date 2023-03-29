import React from "react";
import { Alert } from "react-bootstrap";
const ErrorMsg = ({ErrMsg}) =>{
    return(
        <Alert  variant="danger">
            {ErrMsg}
        </Alert>
    )
}
export default ErrorMsg;