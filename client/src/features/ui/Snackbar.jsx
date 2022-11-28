import { Alert, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

export function CustomSnackbar(props) {
    const [severity, setSeverity] = useState('error');

    useEffect(() => {
        setSeverity('error');
        if (typeof props.errors === 'string' && (props.errors.includes('has been'))) {
            setSeverity('success');
        }
    }, [props]);

    return (
        <Snackbar open={props.open} autoHideDuration={props.duration} onClose={props.onClose}>
            <Alert variant="outlined" severity={severity}>
                {typeof props.errors === 'string' ?
                    props.errors
                    :
                    props.errors[0].trim().split(':')[1]
                }
            </Alert>
        </Snackbar>
    );
}
