import { Slide } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import styles from "./Error.module.css";

function Error() {
    const error = useRouteError();

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <div className={styles.error}>
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p>
                    {isRouteErrorResponse(error) ?
                        <i>{`${error.status} - ${error.statusText}`}</i>
                        :
                        <i>{`${error.message} - ${error.response?.statusText}`}</i>
                    }
                </p>
            </div>
        </Slide>
    );
}

export default Error;